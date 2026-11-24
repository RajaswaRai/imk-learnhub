const assetPath = '/images/learnhub-dashboard/';

/**
 * @param {{
 *   courseTitle: string,
 *   stageTitle: string,
 *   estimatedMinutes: number,
 *   completedTopics: number,
 *   totalTopics: number,
 *   progressPercentage: number
 * }} props
 */
export default function ContinueLearningCard({
    courseTitle,
    stageTitle,
    estimatedMinutes,
    completedTopics,
    totalTopics,
    progressPercentage,
}) {
    return (
        <section id="continue-learning" aria-labelledby="continue-title">
            <h2
                id="continue-title"
                className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--color-ink)]"
            >
                <img
                    src={`${assetPath}imgContainer4.svg`}
                    alt=""
                    className="h-4 w-4 object-contain"
                />
                Lanjutkan Belajar
            </h2>

            <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)]/70 bg-[var(--color-surface)] p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                <span
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-border)]"
                >
                    <span className="text-[22px] font-bold leading-none text-[var(--color-forest)]">
                        &lt; &gt;
                    </span>
                </span>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-[var(--color-ink)]">
                            {courseTitle}
                        </h3>
                        <span className="rounded-full bg-[var(--color-mint)] px-2.5 py-1 text-[9px] font-semibold text-[var(--color-forest-muted)]">
                            {stageTitle}
                        </span>
                    </div>

                    <div className="mt-2 grid gap-1.5 sm:max-w-md">
                        <div
                            role="progressbar"
                            aria-label="Progres topik"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={progressPercentage}
                            className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]"
                        >
                            <div
                                className="h-full rounded-full bg-[var(--color-forest)] transition-[width]"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] text-[var(--color-muted)]">
                            <span className="inline-flex items-center gap-1">
                                <img
                                    src={`${assetPath}imgContainer5.svg`}
                                    alt=""
                                    className="h-3 w-3 object-contain"
                                />
                                Est. {estimatedMinutes} Menit
                            </span>
                            <span className="font-medium text-[var(--color-ink)]">
                                {completedTopics} dari {totalTopics} Topik
                                Selesai ({progressPercentage}%)
                            </span>
                        </div>
                    </div>
                </div>

                <a
                    href="#materials"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2 active:translate-y-px sm:min-w-40"
                >
                    Lanjutkan Belajar
                    <img
                        src={`${assetPath}imgContainer6.svg`}
                        alt=""
                        className="h-3.5 w-3.5 object-contain"
                    />
                </a>
            </div>
        </section>
    );
}
