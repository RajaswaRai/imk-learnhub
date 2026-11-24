import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import LearnHubPageLayout from '@/Components/LearnHub/LearnHubPageLayout';
import ConfirmModal from '@/Components/LearnHub/ConfirmModal';
import learningPath from '@/routes/learning-path';
import lessons from '@/routes/lessons';
import quizzes from '@/routes/quizzes';

type AuthUser = { name: string; email: string };

type Attempt = {
    attempt_id: string;
    stage: number;
    score: number;
    correct_count: number;
    wrong_count: number;
    passed: boolean;
    submitted_at: string;
    stageCompleted: boolean;
    review: Array<{
        question_id: string;
        question: string;
        options: Record<string, string>;
        selected_option: string | null;
        correct_option: string;
        explanation: string;
        is_correct: boolean;
    }>;
};

export default function QuizReview({ auth, semester, attempt }: { auth: { user: AuthUser }; semester: string; attempt: Attempt }) {
    const [showRetakeModal, setShowRetakeModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    const confirmRetake = () => {
        setProcessing(true);

        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(`quiz-draft-stage-${attempt.stage}`);
        }

        router.visit(quizzes.show.url(attempt.stage), {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title={`Review Kuis Stage ${attempt.stage}`} />
            <LearnHubPageLayout authUser={auth.user} semester={semester} activeRoute="learningPath">
                <div className="flex flex-col gap-5">
                    <header className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-forest-muted)]">
                                    REVIEW KUIS
                                </p>
                                <h1 className="mt-2 text-2xl font-extrabold text-[var(--color-forest)]">Stage {attempt.stage}</h1>
                            </div>
                            <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${attempt.passed ? 'bg-[var(--color-mint)] text-[var(--color-forest)]' : 'bg-red-50 text-red-700'}`}>
                                {attempt.passed ? 'Lulus' : 'Belum Lulus'}
                            </span>
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-3">
                            <div className="rounded-xl bg-[var(--color-surface-soft)] p-3"><p className="text-[10px] text-[var(--color-muted)]">Nilai</p><p className="mt-1 text-xl font-extrabold text-[var(--color-forest)]">{attempt.score}</p></div>
                            <div className="rounded-xl bg-[var(--color-surface-soft)] p-3"><p className="text-[10px] text-[var(--color-muted)]">Benar</p><p className="mt-1 text-xl font-extrabold text-[var(--color-forest)]">{attempt.correct_count}</p></div>
                            <div className="rounded-xl bg-[var(--color-surface-soft)] p-3"><p className="text-[10px] text-[var(--color-muted)]">Salah</p><p className="mt-1 text-xl font-extrabold text-red-700">{attempt.wrong_count}</p></div>
                        </div>
                    </header>

                    {attempt.passed && (
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-mint)] bg-[var(--color-mint)]/25 p-4">
                            <p className="text-sm font-bold text-[var(--color-forest)]">
                                {attempt.stageCompleted
                                    ? `Stage ${attempt.stage} selesai. Stage ${attempt.stage + 1} kini terbuka.`
                                    : `Kuis lulus. Selesaikan kedua modul Stage ${attempt.stage} untuk menyelesaikan stage ini.`}
                            </p>
                            {attempt.stageCompleted && attempt.stage < 8 && (
                                <Link
                                    href={lessons.show.url(`${attempt.stage + 1}.1`)}
                                    className="inline-flex min-h-10 items-center rounded-xl bg-[var(--color-forest)] px-4 text-xs font-bold text-white"
                                >
                                    Mulai Stage {attempt.stage + 1}
                                </Link>
                            )}
                        </div>
                    )}

                    <section className="flex flex-col gap-3" aria-label="Pembahasan jawaban">
                        {attempt.review.map((item, index) => (
                            <article key={item.question_id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-soft)] text-xs font-bold">{index + 1}</span>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-sm font-bold leading-6 text-[var(--color-ink)]">{item.question}</h2>
                                        <div className="mt-3 grid gap-2">
                                            {Object.entries(item.options).map(([optionId, text]) => (
                                                <div key={optionId} className={`rounded-lg border px-3 py-2 text-xs ${optionId === item.correct_option ? 'border-[var(--color-forest-muted)] bg-[var(--color-mint)]/30' : optionId === item.selected_option ? 'border-red-200 bg-red-50' : 'border-[var(--color-border)]'}`}>
                                                    <span className="font-bold">{optionId}.</span> {text}
                                                </div>
                                            ))}
                                        </div>
                                        <p className={`mt-3 text-xs font-bold ${item.is_correct ? 'text-[var(--color-forest-muted)]' : 'text-red-700'}`}>
                                            {item.is_correct ? 'Jawaban kamu benar.' : `Jawaban kamu: ${item.selected_option ?? '-'} · Kunci: ${item.correct_option}`}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{item.explanation}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>

                    <div className="flex flex-wrap justify-end gap-3">
                        <Link href={learningPath.show.url()} className="inline-flex min-h-11 items-center rounded-xl border border-[var(--color-border)] px-5 text-sm font-bold text-[var(--color-forest)]">
                            Kembali ke Alur Belajar
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowRetakeModal(true)}
                            className="inline-flex min-h-11 items-center rounded-xl bg-[var(--color-forest)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                        >
                            Ulang quiz?
                        </button>
                    </div>
                </div>

                <ConfirmModal
                    show={showRetakeModal}
                    title="Ulang kuis ini?"
                    description={`Kamu akan mengerjakan ulang Kuis Stage ${attempt.stage} dari awal. Hasil percobaan ini tetap tersimpan, dan nilai terbaik yang akan dipakai. Lanjutkan?`}
                    confirmLabel="Ya, ulangi kuis"
                    cancelLabel="Batal"
                    onConfirm={confirmRetake}
                    onCancel={() => setShowRetakeModal(false)}
                    processing={processing}
                />
            </LearnHubPageLayout>
        </>
    );
}
