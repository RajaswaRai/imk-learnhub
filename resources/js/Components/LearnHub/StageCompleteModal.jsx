import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Link } from "@inertiajs/react";

/**
 * @param {{
 *   show: boolean,
 *   result: {
 *     stage: number,
 *     score: number,
 *     correct_count: number,
 *     total_questions: number,
 *     passed: boolean,
 *     stage_completed: boolean,
 *     next_stage: number | null,
 *     xp_earned: number,
 *     review_url: string,
 *   } | null,
 *   finishHref: string,
 * }} props
 */
export default function StageCompleteModal({ show, result, finishHref }) {
    if (!result) return null;

    const isPerfect = result.correct_count === result.total_questions;

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6"
                onClose={() => {}}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-[var(--color-forest)]/60 backdrop-blur-sm" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:scale-95"
                >
                    <DialogPanel className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-2xl">
                        <div
                            className={`px-6 pb-5 pt-7 text-center ${
                                result.passed
                                    ? "bg-[var(--color-forest)] text-white"
                                    : "bg-[var(--color-accent)]/25 text-[var(--color-forest)]"
                            }`}
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-4xl">
                                {result.passed ? "🎉" : "📘"}
                            </div>
                            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
                                {result.stage_completed
                                    ? "Stage Selesai"
                                    : result.passed
                                      ? "Kuis Lulus"
                                      : "Kuis Dikumpulkan"}
                            </p>
                            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                                {result.stage_completed
                                    ? `Stage ${result.stage} Tuntas!`
                                    : result.passed
                                      ? "Kerja bagus!"
                                      : "Tetap semangat!"}
                            </h2>
                            <p className="mt-1 text-xs opacity-85">
                                {result.passed
                                    ? "Kamu memenuhi ambang kelulusan kuis ini."
                                    : "Skor belum mencapai ambang kelulusan. Pelajari kembali dan coba lagi."}
                            </p>
                        </div>

                        <div className="px-6 py-5">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="rounded-xl bg-[var(--color-surface-soft)] p-3 text-center">
                                    <p className="text-[10px] text-[var(--color-muted)]">
                                        Nilai
                                    </p>
                                    <p className="mt-1 text-xl font-extrabold text-[var(--color-forest)]">
                                        {result.score}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-[var(--color-surface-soft)] p-3 text-center">
                                    <p className="text-[10px] text-[var(--color-muted)]">
                                        Benar
                                    </p>
                                    <p className="mt-1 text-xl font-extrabold text-[var(--color-forest)]">
                                        {result.correct_count}
                                        <span className="text-xs font-normal text-[var(--color-muted)]">
                                            /{result.total_questions}
                                        </span>
                                    </p>
                                </div>
                                <div className="rounded-xl bg-[var(--color-surface-soft)] p-3 text-center">
                                    <p className="text-[10px] text-[var(--color-muted)]">
                                        XP
                                    </p>
                                    <p className="mt-1 text-xl font-extrabold text-[var(--color-forest)]">
                                        {result.xp_earned > 0
                                            ? `+${result.xp_earned}`
                                            : "0"}
                                    </p>
                                </div>
                            </div>

                            {isPerfect && (
                                <p className="mt-3 rounded-lg bg-[var(--color-mint)]/40 px-3 py-2 text-center text-[11px] font-semibold text-[var(--color-forest)]">
                                    Sempurna! Semua jawaban benar.
                                </p>
                            )}

                            {result.stage_completed && result.next_stage && (
                                <p className="mt-3 rounded-lg border border-[var(--color-mint)] bg-[var(--color-mint)]/20 px-3 py-2 text-center text-[11px] font-semibold text-[var(--color-forest)]">
                                    Stage {result.next_stage} kini terbuka.
                                </p>
                            )}

                            <Link
                                href={finishHref}
                                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--color-forest)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                            >
                                Selesai &amp; lihat pembahasan
                            </Link>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
