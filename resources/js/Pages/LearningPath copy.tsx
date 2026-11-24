import { Fragment, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import lessons from "@/routes/lessons/index.js";
import LearnHubPageLayout from "@/Components/LearnHub/LearnHubPageLayout.jsx";

type AuthUser = { name: string; email: string };
type StageStatus = "completed" | "active" | "locked";

type StageTopic = {
    code: string;
    title: string;
    note?: string;
    progress: number;
    status: StageStatus;
};

type LearningStage = {
    number: number;
    title: string;
    description: string;
    status: StageStatus;
    week: string;
    xp: number;
    outcome?: string;
    sessionMinutes?: number;
    completedTopics: number;
    totalTopics: number;
    topics: StageTopic[];
};

type LearningPathProps = {
    auth: { user: AuthUser };
    semester: string;
    course: {
        name: string;
        code: string;
        credits: number;
        semesterLabel: string;
        currentStage: number;
        totalStages: number;
        completedStages: number;
        earnedXp: number;
        totalXp: number;
        remainingHours: number;
    };
    stages: LearningStage[];
};

/* ---------- Ikon ---------- */
const svgProps = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
} as const;

const CheckIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
const LockIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);
const FlagIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
);

/* ---------- Baris sub-materi ---------- */
function TopicRow({ topic }: { topic: StageTopic }) {
    const base =
        "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm";

    if (topic.status === "active") {
        return (
            <Link
                href={lessons.show.url(topic.code)}
                className={`${base} border-[var(--color-forest-muted)] bg-white shadow-sm transition-colors hover:bg-[var(--color-mint)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]`}
            >
                <span className="flex min-w-0 items-center gap-2.5">
                    <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[8px] text-white"
                    >
                        ▶
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate font-semibold text-[var(--color-ink)]">
                            {topic.code} {topic.title}
                        </span>
                        {topic.note && (
                            <span className="block truncate text-[11px] text-[var(--color-muted)]">
                                {topic.note}
                            </span>
                        )}
                    </span>
                </span>
                <span className="shrink-0 rounded-full bg-[var(--color-mint)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-forest)]">
                    {topic.progress > 0 ? "Lanjut" : "Mulai"}
                </span>
            </Link>
        );
    }

    if (topic.status === "completed") {
        return (
            <div className={`${base} border-transparent bg-white`}>
                <span className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint)] text-[var(--color-forest-muted)]">
                        <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="truncate font-medium text-[var(--color-ink)]">
                        {topic.code} {topic.title}
                    </span>
                </span>
                <span className="shrink-0 text-xs text-[var(--color-muted)]">
                    {topic.progress}% Selesai
                </span>
            </div>
        );
    }

    return (
        <div className={`${base} border-transparent bg-white/60 opacity-70`}>
            <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-soft)] text-[var(--color-muted)]">
                    <LockIcon className="h-3 w-3" />
                </span>
                <span className="truncate text-[var(--color-muted)]">
                    {topic.code} {topic.title}
                </span>
            </span>
            <span className="shrink-0 text-xs text-[var(--color-muted)]">
                Terkunci
            </span>
        </div>
    );
}

/* ---------- Kartu stage dengan max-w kompak untuk sisi kiri/kanan ---------- */
function CompletedStageCard({ stage }: { stage: LearningStage }) {
    return (
        <article className="w-full max-w-md rounded-2xl border border-[var(--color-mint)] bg-[var(--color-mint)]/30 p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-mint)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-forest)]">
                    <CheckIcon className="h-3 w-3" />
                    Selesai
                </span>
                <p className="text-[10px] font-semibold text-[var(--color-muted)]">
                    {stage.week} · {stage.xp} XP
                </p>
            </div>
            <h2 className="mt-3 text-base font-bold text-[var(--color-ink)]">
                Stage {stage.number}: {stage.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                {stage.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-mint)] pt-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-[var(--color-forest-muted)]">
                    <CheckIcon className="h-3.5 w-3.5" />
                    {stage.completedTopics}/{stage.totalTopics} sub-materi
                    selesai
                </span>
                <Link
                    href={lessons.show.url(`${stage.number}.1`)}
                    className="inline-flex min-h-8 items-center rounded-lg border border-[var(--color-border)] bg-white px-3 font-semibold text-[var(--color-forest-muted)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                >
                    Tinjau Ulang
                </Link>
            </div>
        </article>
    );
}

function ActiveStageCard({ stage }: { stage: LearningStage }) {
    const nextTopic = stage.topics.find((topic) => topic.status === "active");

    return (
        <article className="w-full max-w-2xl rounded-2xl border-2 border-[var(--color-forest)] bg-white p-4 shadow-lg sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-forest)] text-sm font-extrabold text-white"
                    >
                        {String(stage.number).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                            {stage.week}
                        </p>
                        {stage.outcome && (
                            <p className="truncate text-xs font-bold text-[var(--color-forest)]">
                                Capaian: {stage.outcome}
                            </p>
                        )}
                    </div>
                </div>
                <span className="shrink-0 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/30 px-2.5 py-1 text-[10px] font-bold text-[var(--color-forest)]">
                    +{stage.xp} XP Belajar
                </span>
            </div>

            <h2 className="mt-4 text-xl font-extrabold text-[var(--color-forest)] sm:text-2xl">
                Stage {stage.number}: {stage.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                {stage.description}
            </p>

            <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3">
                <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Daftar Sub-Materi &amp; Praktikum
                </p>
                <ul className="flex flex-col gap-2">
                    {stage.topics.map((topic) => (
                        <li key={topic.code}>
                            <TopicRow topic={topic} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {stage.sessionMinutes ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                        <ClockIcon className="h-3.5 w-3.5" />
                        Estimasi progres sesi: {stage.sessionMinutes} menit
                    </span>
                ) : (
                    <span />
                )}
                {nextTopic && (
                    <Link
                        href={lessons.show.url(nextTopic.code)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                    >
                        Lanjutkan Belajar Sekarang
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                )}
            </div>
        </article>
    );
}

function LockedStageCard({ stage }: { stage: LearningStage }) {
    return (
        <article
            aria-disabled="true"
            className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 opacity-60 shadow-sm sm:p-5"
        >
            <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-surface-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-muted)]">
                    <LockIcon className="h-3 w-3" />
                    Terkunci
                </span>
                <p className="text-[10px] font-semibold text-[var(--color-muted)]">
                    {stage.week} · {stage.xp} XP
                </p>
            </div>
            <h2 className="mt-3 text-base font-bold text-[var(--color-ink)]">
                Stage {stage.number}: {stage.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                {stage.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-muted)]">
                <span>Selesaikan Stage {stage.number - 1} untuk membuka</span>
                <span className="rounded-lg bg-[var(--color-surface-soft)] px-3 py-1.5 font-semibold">
                    Kunci
                </span>
            </div>
        </article>
    );
}

function StageCard({ stage }: { stage: LearningStage }) {
    if (stage.status === "active") return <ActiveStageCard stage={stage} />;
    if (stage.status === "locked") return <LockedStageCard stage={stage} />;
    return <CompletedStageCard stage={stage} />;
}

/* ---------- Node di garis tengah ---------- */
function StageNode({ stage }: { stage: LearningStage }) {
    const tone =
        stage.status === "completed"
            ? "bg-[var(--color-forest-muted)] text-white"
            : stage.status === "active"
              ? "bg-[var(--color-accent)] text-[var(--color-forest)]"
              : "bg-[var(--color-surface-soft)] text-[var(--color-muted)]";

    return (
        <span
            aria-hidden="true"
            className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-[var(--color-canvas)] text-xs font-extrabold shadow-sm ${tone}`}
        >
            {stage.status === "completed" ? (
                <CheckIcon className="h-3.5 w-3.5" />
            ) : stage.status === "locked" ? (
                <LockIcon className="h-3.5 w-3.5" />
            ) : (
                stage.number
            )}
        </span>
    );
}

/* ---------- Grid Layout 3 Kolom ---------- */
/* ---------- Grid Layout 3 Kolom dengan Center Alignment Vertikal ---------- */
const rowGrid =
    "relative grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-4";

function NodeCell({ stage }: { stage: LearningStage }) {
    return (
        <div className="relative col-start-1 self-center md:col-start-2 md:row-start-1 flex flex-col items-center justify-center h-full">
            <img
                src="/images/learnhub-learning/learning-path/imgContinuousBackgroundPathwayLine.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 md:w-[3px] md:inset-x-0 md:inset-y-auto md:top-1/2 md:-translate-y-1/2 md:h-2 md:w-full"
            />
            <div className="relative z-10 flex justify-center py-2">
                <StageNode stage={stage} />
            </div>
        </div>
    );
}

export default function LearningPath({
    auth,
    semester,
    course,
    stages,
}: LearningPathProps) {
    const [viewMode, setViewMode] = useState<"path" | "topics">("path");
    const [showTip, setShowTip] = useState(true);

    const completionPercentage = Math.round(
        (course.currentStage / course.totalStages) * 100,
    );
    const upcomingCount = Math.max(course.totalStages - stages.length, 0);
    const upcomingLabel =
        upcomingCount === 1
            ? `Stage ${course.totalStages}`
            : `Stage ${stages.length + 1}–${course.totalStages}`;

    const toggleClass = (active: boolean) =>
        `rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] ${
            active
                ? "bg-[var(--color-forest)] text-white"
                : "text-[var(--color-muted)] hover:bg-[var(--color-surface-soft)]"
        }`;

    return (
        <>
            <Head title="Alur Belajar" />
            <LearnHubPageLayout
                authUser={auth.user}
                semester={semester}
                activeRoute="learningPath"
            >
                <header className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]"
                        >
                            <span>Materi</span>
                            <span aria-hidden="true">/</span>
                            <span className="text-[var(--color-ink)]">
                                {course.name}
                            </span>
                        </nav>
                        <div className="flex rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-sm">
                            <button
                                type="button"
                                aria-pressed={viewMode === "path"}
                                onClick={() => setViewMode("path")}
                                className={toggleClass(viewMode === "path")}
                            >
                                Peta Belajar (Path)
                            </button>
                            <button
                                type="button"
                                aria-pressed={viewMode === "topics"}
                                onClick={() => setViewMode("topics")}
                                className={toggleClass(viewMode === "topics")}
                            >
                                Daftar Topik
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-muted)]">
                                <span className="rounded-full bg-[var(--color-mint)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-forest)]">
                                    {course.semesterLabel}
                                </span>
                                <span className="text-[var(--color-muted)]">
                                    • {course.credits} SKS • Kode: {course.code}
                                </span>
                            </div>
                            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-forest)] sm:text-3xl">
                                {course.name}
                            </h1>
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                                Ikuti setiap stage untuk menyelesaikan{" "}
                                {course.name}.
                            </p>
                        </div>

                        <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:w-72">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[var(--color-ink)]">
                                    Stage {course.currentStage} dari{" "}
                                    {course.totalStages}
                                </span>
                                <span className="font-bold text-[var(--color-forest-muted)]">
                                    {completionPercentage}% Selesai
                                </span>
                            </div>
                            <div
                                role="progressbar"
                                aria-label="Progres pembelajaran"
                                aria-valuenow={completionPercentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-surface-soft)]"
                            >
                                <div
                                    className="h-full rounded-full bg-[var(--color-forest-muted)] transition-[width]"
                                    style={{
                                        width: `${completionPercentage}%`,
                                    }}
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
                                <span className="inline-flex items-center gap-1.5">
                                    <span
                                        aria-hidden="true"
                                        className="h-2 w-2 rounded-full bg-[var(--color-accent)]"
                                    />
                                    {course.earnedXp} / {course.totalXp} XP
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <ClockIcon className="h-3 w-3" />
                                    {course.remainingHours} Jam Lagi
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {viewMode === "path" ? (
                    <section
                        aria-label="Peta tahap belajar"
                        className="relative py-2"
                    >
                        <div className="flex flex-col gap-6">
                            {stages.map((stage, index) => {
                                const isActive = stage.status === "active";
                                const showMentor =
                                    showTip &&
                                    stage.status === "completed" &&
                                    stages[index + 1]?.status === "active";

                                return (
                                    <Fragment key={stage.number}>
                                        <div className={rowGrid}>
                                            {/* Node & Garis di Kolom Tengah */}
                                            <NodeCell stage={stage} />

                                            {/* 
                              ATURAN POSISI BERDASARKAN NOMOR STAGE:
                              - Jika AKTIF: Di tengah (md:col-span-3, md:justify-self-center)
                              - Jika STAGE GANJIL (1, 3, 5...): Di KIRI (md:col-start-1, md:justify-self-end)
                              - Jika STAGE GENAP (selain aktif/ganjil): Di KANAN (md:col-start-3, md:justify-self-start)
                            */}
                                            <div
                                                className={`relative z-10 col-start-2 md:row-start-1 ${
                                                    isActive
                                                        ? "md:col-span-3 md:col-start-1 md:justify-self-center flex justify-center"
                                                        : stage.number % 2 === 0
                                                          ? "md:col-start-1 md:justify-self-end flex justify-end"
                                                          : "md:col-start-3 md:justify-self-start flex justify-start"
                                                } w-full`}
                                            >
                                                <StageCard stage={stage} />
                                            </div>
                                        </div>

                                        {/* Tips Mentor Owl di tengah */}
                                        {showMentor && (
                                            <div className="relative flex justify-center my-3">
                                                <div className="relative z-10 w-full max-w-md flex items-center gap-4 rounded-xl border border-[var(--color-mint)] bg-[var(--color-surface)] px-4 py-3 shadow-sm">
                                                    <img
                                                        src="/images/learnhub-learning/lesson-detail/imgMaskotBurungHantuLearnHub.png"
                                                        alt=""
                                                        aria-hidden="true"
                                                        className="h-12 w-12 object-contain shrink-0"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-xs leading-5 text-[var(--color-muted)]">
                                                            <span className="font-semibold text-[var(--color-forest)]">
                                                                Tips mentor:
                                                            </span>{" "}
                                                            Satu langkah kecil
                                                            hari ini membawa
                                                            kamu lebih dekat
                                                            pada target belajar.
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowTip(
                                                                    false,
                                                                )
                                                            }
                                                            className="mt-1 text-[10px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-forest)] focus-visible:outline-none"
                                                        >
                                                            tutup pesan
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </div>

                        {upcomingCount > 0 && (
                            <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--color-canvas)] bg-[var(--color-surface-soft)] text-[var(--color-muted)] shadow-sm">
                                    <FlagIcon className="h-4 w-4" />
                                </span>
                                <span className="text-[10px] font-semibold text-[var(--color-muted)]">
                                    {upcomingCount} tahapan lanjutan ·{" "}
                                    {upcomingLabel}
                                </span>
                            </div>
                        )}
                    </section>
                ) : (
                    <section
                        aria-labelledby="topics-heading"
                        className="flex flex-col gap-3"
                    >
                        <div className="flex flex-wrap items-end justify-between gap-2">
                            <div>
                                <h2
                                    id="topics-heading"
                                    className="text-lg font-bold text-[var(--color-forest)]"
                                >
                                    Semua topik
                                </h2>
                                <p className="text-sm text-[var(--color-muted)]">
                                    Topik terkunci akan terbuka setelah
                                    prasyarat selesai.
                                </p>
                            </div>
                            <span className="text-xs font-semibold text-[var(--color-muted)]">
                                {stages.length} dari {course.totalStages} stage
                                ditampilkan
                            </span>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-2">
                            {stages.map((stage) => (
                                <StageCard key={stage.number} stage={stage} />
                            ))}
                        </div>
                    </section>
                )}
            </LearnHubPageLayout>
        </>
    );
}
