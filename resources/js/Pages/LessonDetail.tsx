import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import LearnHubPageLayout from "@/Components/LearnHub/LearnHubPageLayout";
import lessons from "@/routes/lessons";
import learningPath from "@/routes/learning-path";

type AuthUser = { name: string; email: string };
type LessonDetailProps = {
    auth: { user: AuthUser };
    semester: string;
    lesson: {
        id: string;
        courseName: string;
        stage: number;
        topicNumber: string;
        position: number;
        totalTopics: number;
        title: string;
        objective: string;
        readMinutes: number;
        conceptTitle: string;
        concepts: Array<{
            type: string;
            value: string;
            label: string;
            tone: "mint" | "amber";
        }>;
        mentorTip: string;
        codeTitle: string;
        runtime: string;
        code: string;
        output: string;
        summary: string;
        question: string;
        choices: Array<{ id: string; label: string; prefix: string }>;
        correctChoice: string;
        previousLesson: string | null;
        nextLesson: string | null;
    };
};

export default function LessonDetail({
    auth,
    semester,
    lesson,
}: LessonDetailProps) {
    const [isCompleted, setIsCompleted] = useState(false);
    const progressPercentage = Math.round(
        (lesson.position / lesson.totalTopics) * 100,
    );

    function completeLesson() {
        setIsCompleted(true);
    }

    return (
        <>
            <Head title={`Materi ${lesson.topicNumber}`} />
            <LearnHubPageLayout
                authUser={auth.user}
                semester={semester}
                activeRoute="lesson"
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
                    <span>{lesson.courseName}</span>
                    <span aria-hidden="true">/</span>
                    <span>Stage {lesson.stage}</span>
                    <span aria-hidden="true">/</span>
                    <span
                        aria-current="page"
                        className="font-semibold text-[var(--color-ink)]"
                    >
                        Materi {lesson.topicNumber}
                    </span>
                </nav>

                <header className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-forest-muted)]">
                                STAGE {lesson.stage} · MATERI {lesson.position}{" "}
                                DARI {lesson.totalTopics}
                            </p>
                            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-forest)] sm:text-3xl">
                                {lesson.title}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                                {lesson.objective}
                            </p>
                        </div>
                        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-3 py-2 text-xs font-semibold text-[var(--color-muted)]">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-4 w-4"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="8.5"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                />
                                <path
                                    d="M12 7v5l3 2"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {lesson.readMinutes} menit
                        </span>
                    </div>
                    <div className="mt-5">
                        <div className="mb-2 flex justify-between text-[10px] font-semibold text-[var(--color-muted)]">
                            <span>Progres materi</span>
                            <span>{progressPercentage}%</span>
                        </div>
                        <div
                            role="progressbar"
                            aria-label="Progres materi"
                            aria-valuenow={progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-soft)]"
                        >
                            <div
                                className="h-full rounded-full bg-[var(--color-forest-muted)] transition-[width]"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </header>

                <div className="grid items-start gap-4">
                    <div className="flex min-w-0 flex-col gap-4">
                        <section
                            aria-labelledby="concept-heading"
                            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                KONSEP INTI
                            </p>
                            <h2
                                id="concept-heading"
                                className="mt-1 text-lg font-bold text-[var(--color-forest)]"
                            >
                                {lesson.conceptTitle}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                                Variabel menyimpan nilai dengan tipe data
                                tertentu. Pilih tipe yang sesuai dengan
                                informasi yang ingin kamu simpan.
                            </p>
                            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                {lesson.concepts.map((concept) => (
                                    <article
                                        key={concept.label}
                                        className={`rounded-xl border p-4 ${
                                            concept.tone === "mint"
                                                ? "border-[var(--color-mint)] bg-[var(--color-mint)]/25"
                                                : "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/15"
                                        }`}
                                    >
                                        <p className="text-[10px] font-semibold text-[var(--color-muted)]">
                                            {concept.type}
                                        </p>
                                        <p className="mt-3 font-mono text-lg font-bold text-[var(--color-forest)]">
                                            {concept.value}
                                        </p>
                                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                                            nama variabel:{" "}
                                            <code className="font-bold text-[var(--color-forest-muted)]">
                                                {concept.label}
                                            </code>
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="grid items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-5">
                            <img
                                src="/images/learnhub-learning/lesson-detail/imgMaskotBurungHantuLearnHub.png"
                                alt=""
                                aria-hidden="true"
                                className="h-12 w-12 object-contain"
                            />
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-sm font-bold text-[var(--color-forest)]">
                                        Tips Mentor Owl
                                    </h2>
                                    <span className="rounded-full bg-[var(--color-mint)]/60 px-2 py-1 text-[9px] font-semibold text-[var(--color-forest-muted)]">
                                        RPS Modul {lesson.topicNumber}
                                    </span>
                                </div>
                                <p className="mt-2 rounded-lg bg-[var(--color-surface-soft)] px-3 py-2 text-sm leading-6 text-[var(--color-muted)]">
                                    “{lesson.mentorTip}”
                                </p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-[var(--color-mint)] bg-[var(--color-mint)]/20 p-5 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                Rangkuman
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]">
                                {lesson.summary}
                            </p>
                        </section>

                        <section
                            aria-labelledby="code-heading"
                            className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[var(--color-forest-muted)] px-4 py-3 text-white sm:px-5">
                                <div className="flex items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-mint)] text-xs font-black text-[var(--color-forest)]"
                                    >
                                        {"</>"}
                                    </span>
                                    <div>
                                        <h2
                                            id="code-heading"
                                            className="text-sm font-bold"
                                        >
                                            {lesson.codeTitle}
                                        </h2>
                                        <p className="text-[10px] text-white/70">
                                            {lesson.runtime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto bg-[var(--color-forest)] p-4 text-[11px] leading-6 text-[var(--color-mint)] sm:p-5 sm:text-xs">
                                <pre className="min-w-max">
                                    <code>{lesson.code}</code>
                                </pre>
                            </div>
                        </section>
                    </div>
                </div>

                <footer className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    {lesson.previousLesson ? (
                        <Link
                            href={lessons.show.url(lesson.previousLesson)}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        >
                            ← Materi sebelumnya
                        </Link>
                    ) : (
                        <Link
                            href={learningPath.show.url()}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        >
                            ← Alur belajar
                        </Link>
                    )}
                    {isCompleted ? (
                        <p
                            role="status"
                            className="text-center text-xs font-semibold text-[var(--color-forest-muted)]"
                        >
                            Kuis siap dikerjakan. Pilih jawaban untuk
                            menyelesaikan materi.
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={completeLesson}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-forest)] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                        >
                            Selesaikan materi &amp; lanjut ke kuis
                            <span aria-hidden="true" className="ml-2">
                                →
                            </span>
                        </button>
                    )}
                    {lesson.nextLesson && isCompleted && (
                        <Link
                            href={lessons.show.url(lesson.nextLesson)}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-mint)] px-5 py-2.5 text-xs font-bold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-accent)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        >
                            Materi berikutnya
                            <span aria-hidden="true" className="ml-2">
                                →
                            </span>
                        </Link>
                    )}
                </footer>
            </LearnHubPageLayout>
        </>
    );
}
