const assetPath = '/images/learnhub-dashboard/';

const artworkByType = {
    coding: 'imgSvgCodingVectorArtGraphic.svg',
    logic: 'imgSvgLogicGateBooleanArt.svg',
    loop: 'imgSvgDimmedLoopGraphic.svg',
};

const statusLabels = {
    completed: 'Selesai Dibaca',
    in_progress: 'Sedang Dipelajari',
    locked: 'Terkunci Prasyarat',
};

/**
 * @param {{
 *   course: {
 *     id: string,
 *     courseLabel: string,
 *     meetingNumber: number,
 *     title: string,
 *     description: string,
 *     status: 'completed' | 'in_progress' | 'locked',
 *     estimatedMinutes: number | null,
 *     submoduleCount: number | null,
 *     progressPercentage: number | null,
 *     artwork: 'coding' | 'logic' | 'loop'
 *   },
 *   isBookmarked: boolean,
 *   onBookmarkToggle: (courseId: string) => void
 * }} props
 */
export default function CourseCard({
    course,
    isBookmarked,
    onBookmarkToggle,
}) {
    const isLocked = course.status === 'locked';

    return (
        <article
            aria-disabled={isLocked}
            className={`flex h-full flex-col rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] p-3.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-mint)] sm:p-4 ${
                isLocked ? 'bg-[var(--color-surface-soft)] opacity-80' : ''
            }`}
        >
            <div className="mb-2.5 flex items-center justify-between gap-2">
                <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-full bg-[var(--color-surface-soft)] px-2.5 py-1 text-[9px] font-medium text-[var(--color-muted)]">
                    <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-forest)]"
                    />
                    <span className="truncate">
                        {course.courseLabel} &bull; Pertemuan {course.meetingNumber}
                    </span>
                </span>

                <button
                    type="button"
                    aria-label={
                        isBookmarked
                            ? `Hapus ${course.courseLabel} pertemuan ${course.meetingNumber} dari bookmark`
                            : `Simpan ${course.courseLabel} pertemuan ${course.meetingNumber} ke bookmark`
                    }
                    aria-pressed={isBookmarked}
                    onClick={() => onBookmarkToggle(course.id)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-mint)]/50 transition-colors hover:bg-[var(--color-mint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                >
                    <img
                        src={`${assetPath}imgContainer9.svg`}
                        alt=""
                        className="h-4 w-3 object-contain"
                    />
                </button>
            </div>

            <div
                className={`relative flex h-[150px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-border)] to-[var(--color-surface-soft)] ${
                    isLocked ? 'grayscale' : ''
                }`}
            >
                <img
                    src={`${assetPath}${artworkByType[course.artwork]}`}
                    alt=""
                    className="h-20 w-20 object-contain"
                />
                <span
                    className={`absolute left-2.5 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        course.status === 'completed'
                            ? 'bg-[var(--color-mint)] text-[var(--color-forest-muted)]'
                            : course.status === 'in_progress'
                              ? 'bg-[var(--color-forest-muted)] text-white'
                              : 'bg-[var(--color-border)] text-[var(--color-muted)]'
                    }`}
                >
                    <img
                        src={`${assetPath}${
                            course.status === 'locked'
                                ? 'imgContainer14.svg'
                                : course.status === 'completed'
                                  ? 'imgContainer12.svg'
                                  : 'imgContainer11.svg'
                        }`}
                        alt=""
                        className="h-3 w-3 object-contain"
                    />
                    {statusLabels[course.status]}
                </span>
                {course.estimatedMinutes !== null && (
                    <span className="absolute bottom-2 right-2 rounded-md bg-white/90 px-2 py-1 text-[9px] font-medium text-[var(--color-muted)]">
                        Est. {course.estimatedMinutes} Menit
                    </span>
                )}
            </div>

            <div className="flex-1 pt-3">
                <h3 className="text-sm font-bold text-[var(--color-forest)]">
                    {course.title}
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-[var(--color-muted)]">
                    {course.description}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex min-h-8 items-center gap-1.5 text-[10px] font-medium text-[var(--color-muted)]">
                    {course.status === 'completed' && (
                        <>
                            <img
                                src={`${assetPath}imgContainer10.svg`}
                                alt=""
                                className="h-3.5 w-3.5 object-contain"
                            />
                            {course.submoduleCount} Sub-modul
                        </>
                    )}
                    {course.status === 'in_progress' && (
                        <>
                            <img
                                src={`${assetPath}imgContainer13.svg`}
                                alt=""
                                className="h-3.5 w-3.5 object-contain"
                            />
                            Progress: {course.progressPercentage}%
                        </>
                    )}
                    {course.status === 'locked' && (
                        <>
                            <img
                                src={`${assetPath}imgContainer14.svg`}
                                alt=""
                                className="h-3.5 w-3.5 object-contain"
                            />
                            Materi Berikutnya
                        </>
                    )}
                </span>

                {isLocked ? (
                    <button
                        type="button"
                        disabled
                        className="inline-flex min-h-9 cursor-not-allowed items-center gap-1.5 rounded-xl bg-[var(--color-border)] px-3.5 py-2 text-[10px] font-semibold text-[var(--color-muted)] opacity-80"
                    >
                        <img
                            src={`${assetPath}imgContainer14.svg`}
                            alt=""
                            className="h-3 w-3 object-contain"
                        />
                        Terkunci
                    </button>
                ) : (
                    <a
                        href="#continue-learning"
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-[var(--color-forest)] px-3.5 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2 active:translate-y-px"
                    >
                        Buka Materi
                        <img
                            src={`${assetPath}imgContainer6.svg`}
                            alt=""
                            className="h-3 w-3 object-contain"
                        />
                    </a>
                )}
            </div>
        </article>
    );
}
