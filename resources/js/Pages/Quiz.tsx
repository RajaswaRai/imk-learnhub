import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import LearnHubPageLayout from "@/Components/LearnHub/LearnHubPageLayout";
import learningPath from "@/routes/learning-path";
import quizzes from "@/routes/quizzes";

type AuthUser = { name: string; email: string };

type QuizQuestion = {
    question_id: string;
    question: string;
    topic: string | null;
    options: Array<{ option_id: string; text: string }>;
    points: number;
    order_index: number;
};

type QuizProps = {
    auth: { user: AuthUser };
    semester: string;
    quiz: {
        stage: number;
        title: string;
        description: string;
        tip: string;
        topics: string[];
        timeLimitMinutes: number;
        questionCount: number;
        passingScore: number;
        pointsPerQuestion: number;
        passingCorrectCount: number;
        questions: QuizQuestion[];
    };
};

type Draft = {
    answers: Record<string, string>;
    flagged: string[];
    currentIndex: number;
};

function formatTime(totalSeconds: number): string {
    const clamped = Math.max(0, totalSeconds);
    const minutes = Math.floor(clamped / 60);
    const seconds = clamped % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Quiz({ auth, semester, quiz }: QuizProps) {
    const storageKey = `quiz-draft-stage-${quiz.stage}`;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [flagged, setFlagged] = useState<Set<string>>(new Set());
    const [secondsLeft, setSecondsLeft] = useState(
        quiz.timeLimitMinutes * 60,
    );
    const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
    const [processing, setProcessing] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const submittedRef = useRef(false);

    /* ---------- Pulihkan draf dari penyimpanan browser ---------- */
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) return;

            const draft = JSON.parse(raw) as Draft;
            setAnswers(draft.answers ?? {});
            setFlagged(new Set(draft.flagged ?? []));
            setCurrentIndex(
                Math.min(
                    Math.max(draft.currentIndex ?? 0, 0),
                    quiz.questionCount - 1,
                ),
            );
            setSaveState("saved");
        } catch {
            /* abaikan draf yang rusak */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    /* ---------- Simpan draf otomatis ---------- */
    useEffect(() => {
        if (typeof window === "undefined") return;

        const draft: Draft = {
            answers,
            flagged: Array.from(flagged),
            currentIndex,
        };

        window.localStorage.setItem(storageKey, JSON.stringify(draft));
        setSaveState("saved");
    }, [answers, flagged, currentIndex, storageKey]);

    const answeredCount = Object.keys(answers).length;
    const progressPercentage = Math.round(
        (answeredCount / quiz.questionCount) * 100,
    );
    const currentQuestion = quiz.questions[currentIndex];

    const submitQuiz = useCallback(
        (finalAnswers: Record<string, string>) => {
            if (submittedRef.current) return;
            submittedRef.current = true;
            setProcessing(true);

            router.post(
                quizzes.submit.url(quiz.stage),
                { answers: finalAnswers },
                {
                    onSuccess: () => {
                        if (typeof window !== "undefined") {
                            window.localStorage.removeItem(storageKey);
                        }
                    },
                    onError: () => {
                        submittedRef.current = false;
                        setProcessing(false);
                        setSubmitError(true);
                    },
                },
            );
        },
        [quiz.stage, storageKey],
    );

    /* ---------- Timer pengerjaan ---------- */
    useEffect(() => {
        if (secondsLeft <= 0) {
            if (!submittedRef.current && answeredCount > 0) {
                submitQuiz(answers);
            }
            return;
        }

        const timer = window.setInterval(() => {
            setSecondsLeft((previous) => previous - 1);
        }, 1000);

        return () => window.clearInterval(timer);
    }, [secondsLeft, answeredCount, answers, submitQuiz]);

    const selectOption = (questionId: string, optionId: string) => {
        setAnswers((previous) => ({ ...previous, [questionId]: optionId }));
    };

    const clearAnswer = (questionId: string) => {
        setAnswers((previous) => {
            const next = { ...previous };
            delete next[questionId];
            return next;
        });
    };

    const toggleFlag = (questionId: string) => {
        setFlagged((previous) => {
            const next = new Set(previous);
            if (next.has(questionId)) {
                next.delete(questionId);
            } else {
                next.add(questionId);
            }
            return next;
        });
    };

    const goTo = (index: number) => {
        setCurrentIndex(Math.min(Math.max(index, 0), quiz.questionCount - 1));
    };

    const handleSubmit = () => {
        setSubmitError(false);

        if (answeredCount < quiz.questionCount) {
            const firstUnanswered = quiz.questions.findIndex(
                (question) => !answers[question.question_id],
            );
            setSubmitError(true);
            if (firstUnanswered >= 0) {
                goTo(firstUnanswered);
            }
            return;
        }

        submitQuiz(answers);
    };

    const questionStatus = useMemo(() => {
        return quiz.questions.map((question, index) => {
            const isAnswered = Boolean(answers[question.question_id]);
            const isCurrent = index === currentIndex;
            const isFlagged = flagged.has(question.question_id);

            let label = "Belum dijawab";
            let dotClass = "bg-[var(--color-surface-soft)]";

            if (isCurrent) {
                label = "Sedang dibuka";
                dotClass = "bg-[var(--color-forest)]";
            } else if (isFlagged) {
                label = "Ragu-ragu";
                dotClass = "bg-[var(--color-accent)]";
            } else if (isAnswered) {
                label = "Terjawab";
                dotClass = "bg-[var(--color-mint)]";
            }

            return { index, isAnswered, isCurrent, isFlagged, label, dotClass };
        });
    }, [answers, currentIndex, flagged, quiz.questions]);

    const isFirst = currentIndex === 0;
    const isLast = currentIndex === quiz.questionCount - 1;

    return (
        <>
            <Head title={quiz.title} />
            <LearnHubPageLayout
                authUser={auth.user}
                semester={semester}
                activeRoute="learningPath"
            >
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]"
                >
                    <Link
                        href={learningPath.show.url()}
                        className="font-semibold text-[var(--color-forest-muted)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                    >
                        Alur Belajar
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span>Pemrograman Dasar</span>
                    <span aria-hidden="true">/</span>
                    <span className="font-semibold text-[var(--color-ink)]">
                        Kuis Evaluasi Stage {quiz.stage}
                    </span>
                </nav>

                <header className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <span className="inline-flex items-center rounded-full bg-[var(--color-accent)]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-forest)]">
                                Stage {quiz.stage} Evaluation
                            </span>
                            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--color-forest)] sm:text-3xl">
                                {quiz.title}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                                {quiz.description}
                            </p>
                        </div>
                        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[var(--color-mint)] bg-[var(--color-mint)]/30 px-3 py-2 text-xs font-bold text-[var(--color-forest)]">
                            <span aria-hidden="true">🎯</span>
                            Ambang kelulusan: {quiz.passingScore}%
                            <span className="font-semibold text-[var(--color-forest-muted)]">
                                ({quiz.passingCorrectCount}/{quiz.questionCount}{" "}
                                benar)
                            </span>
                        </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--color-border)] pt-4 text-[11px] font-semibold text-[var(--color-muted)]">
                        <span>Progres: Soal {currentIndex + 1} dari {quiz.questionCount}</span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[var(--color-mint)]" />
                            {progressPercentage}% selesai
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                            {quiz.questionCount} soal total
                        </span>
                    </div>
                </header>

                <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_248px]">
                    <section className="flex min-w-0 flex-col gap-4">
                        <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-lg bg-[var(--color-forest)] px-2.5 py-1 text-[10px] font-bold text-white">
                                    Soal {currentIndex + 1} dari {quiz.questionCount}
                                </span>
                                <span className="rounded-lg bg-[var(--color-surface-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-forest-muted)]">
                                    {currentQuestion.points} Poin
                                </span>
                                {currentQuestion.topic && (
                                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-forest-muted)]">
                                        Topik: {currentQuestion.topic}
                                    </span>
                                )}
                            </div>

                            <h2 className="mt-4 text-lg font-bold leading-7 text-[var(--color-ink)]">
                                {currentQuestion.question}
                            </h2>

                            <fieldset className="mt-4">
                                <legend className="sr-only">
                                    Pilih satu jawaban
                                </legend>
                                <div className="grid gap-2.5">
                                    {currentQuestion.options.map((option) => {
                                        const selected =
                                            answers[
                                                currentQuestion.question_id
                                            ] === option.option_id;

                                        return (
                                            <label
                                                key={option.option_id}
                                                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors focus-within:ring-2 focus-within:ring-[var(--color-forest)] ${
                                                    selected
                                                        ? "border-[var(--color-forest)] bg-[var(--color-mint)]/30"
                                                        : "border-[var(--color-border)] hover:bg-[var(--color-surface-soft)]"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={
                                                        currentQuestion.question_id
                                                    }
                                                    value={option.option_id}
                                                    checked={selected}
                                                    onChange={() =>
                                                        selectOption(
                                                            currentQuestion.question_id,
                                                            option.option_id,
                                                        )
                                                    }
                                                    className="mt-0.5 h-4 w-4 accent-[var(--color-forest)]"
                                                />
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-soft)] text-xs font-bold text-[var(--color-forest)]">
                                                    {option.option_id}
                                                </span>
                                                <span className="pt-0.5 text-sm font-medium leading-6 text-[var(--color-ink)]">
                                                    {option.text}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        clearAnswer(currentQuestion.question_id)
                                    }
                                    disabled={
                                        !answers[currentQuestion.question_id]
                                    }
                                    className="text-xs font-semibold text-[var(--color-muted)] underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Hapus pilihan
                                </button>
                                <p
                                    role="status"
                                    className="text-[11px] font-semibold text-[var(--color-forest-muted)]"
                                >
                                    {saveState === "saved" &&
                                        "Jawaban tersimpan otomatis"}
                                </p>
                            </div>
                        </article>

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={() => goTo(currentIndex - 1)}
                                disabled={isFirst}
                                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                ← Soal sebelumnya
                            </button>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleFlag(currentQuestion.question_id)
                                    }
                                    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
                                        flagged.has(
                                            currentQuestion.question_id,
                                        )
                                            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/30 text-[var(--color-forest)]"
                                            : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-surface-soft)]"
                                    }`}
                                >
                                    <span aria-hidden="true">⚑</span>
                                    {flagged.has(currentQuestion.question_id)
                                        ? "Ditandai ragu"
                                        : "Tandai ragu"}
                                </button>

                                {!isLast && (
                                    <button
                                        type="button"
                                        onClick={() => goTo(currentIndex + 1)}
                                        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-forest)] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)]"
                                    >
                                        Simpan &amp; lanjut →
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-mint)] px-4 py-2 text-xs font-bold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-accent)]/50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? "Mengumpulkan..."
                                        : "Selesaikan & kumpulkan"}
                                </button>
                            </div>
                        </div>
                    </section>

                    <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
                        <section className="rounded-2xl border border-[var(--color-forest-muted)]/30 bg-[var(--color-forest)] p-4 text-white shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
                                Sisa Waktu
                            </p>
                            <p className="mt-1 font-mono text-2xl font-extrabold tabular-nums">
                                {formatTime(secondsLeft)}
                            </p>
                            <p className="mt-1 text-[10px] text-white/70">
                                Timer berjalan otomatis sejak halaman dibuka.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                Navigasi Butir Soal
                            </p>
                            <div className="mt-3 grid grid-cols-5 gap-2">
                                {questionStatus.map((status) => (
                                    <button
                                        key={status.index}
                                        type="button"
                                        aria-label={`Soal ${status.index + 1}: ${status.label}`}
                                        aria-current={
                                            status.isCurrent
                                                ? "true"
                                                : undefined
                                        }
                                        onClick={() => goTo(status.index)}
                                        className={`flex h-9 items-center justify-center rounded-lg border text-xs font-bold transition-colors ${
                                            status.isCurrent
                                                ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                                                : status.isFlagged
                                                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/30 text-[var(--color-forest)]"
                                                  : status.isAnswered
                                                    ? "border-[var(--color-mint)] bg-[var(--color-mint)]/40 text-[var(--color-forest)]"
                                                    : "border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-muted)]"
                                        }`}
                                    >
                                        {status.index + 1}
                                    </button>
                                ))}
                            </div>
                            <ul className="mt-3 grid grid-cols-2 gap-1.5 text-[10px] text-[var(--color-muted)]">
                                <li className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[var(--color-mint)]" />
                                    Terjawab
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                                    Ragu-ragu
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[var(--color-forest)]" />
                                    Sedang dibuka
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[var(--color-surface-soft)]" />
                                    Belum dijawab
                                </li>
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                Ketentuan Evaluasi
                            </p>
                            <ul className="mt-3 flex flex-col gap-2.5 text-[11px] leading-5 text-[var(--color-muted)]">
                                <li>
                                    Durasi maksimal {quiz.timeLimitMinutes}{" "}
                                    menit sejak halaman dibuka.
                                </li>
                                <li>
                                    Jawaban tersimpan otomatis tanpa perlu
                                    reload halaman.
                                </li>
                                <li>
                                    Nilai {quiz.passingScore} (
                                    {quiz.passingCorrectCount} dari{" "}
                                    {quiz.questionCount} benar) untuk
                                    dinyatakan lulus Stage {quiz.stage}.
                                </li>
                                <li>
                                    Kelulusan membuka Stage {quiz.stage + 1}{" "}
                                    dan klaim XP.
                                </li>
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                Tips Mentor Owl
                            </p>
                            <p className="mt-2 text-[11px] leading-5 text-[var(--color-muted)]">
                                “{quiz.tip}”
                            </p>
                        </section>
                    </aside>
                </div>

                {submitError && (
                    <p
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        Jawab seluruh soal sebelum mengumpulkan kuis.
                    </p>
                )}
            </LearnHubPageLayout>
        </>
    );
}
