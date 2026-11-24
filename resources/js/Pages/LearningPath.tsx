import { Fragment, useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import lessons from "@/routes/lessons/index.js";
import quizzes from "@/routes/quizzes";
import LearnHubPageLayout from "@/Components/LearnHub/LearnHubPageLayout.jsx";

type AuthUser = { name: string; email: string };
type StageStatus = "completed" | "active" | "locked";

type StageTopic = {
    code: string;
    title: string;
    note?: string;
    progress: number;
    status: StageStatus;
    duration?: string; // contoh: "15 Menit", "Skor 95 + Lulus"
    kind?: "materi" | "latihan";
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
    completedAt?: string; // contoh: "12 Feb 2025"
    targetLabel?: string; // contoh: "Minggu ini"
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
        lecturer?: {
            name: string;
            nip: string;
            initials: string;
            role: string;
        };
        outcomes?: { label: string; value: number }[];
        tip?: string;
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
const BookmarkIcon = ({
    className,
    filled,
}: {
    className?: string;
    filled?: boolean;
}) => (
    <svg
        {...svgProps}
        className={className}
        fill={filled ? "currentColor" : "none"}
    >
        <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);
const BookIcon = ({ className }: { className?: string }) => (
    <svg {...svgProps} className={className}>
        <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
        <path d="M4 21V5" />
    </svg>
);

/* ---------- Baris sub-materi ---------- */
function TopicRow({ topic }: { topic: StageTopic }) {
    const base =
        "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm";

    if (topic.status === "active") {
        const href = topic.kind === "latihan"
            ? quizzes.show.url(topic.code.replace("QUIZ-ST-", ""))
            : lessons.show.url(topic.code);
        return (
            <Link
                href={href}
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

/* Kartu besar: dipakai untuk stage yang sedang dipilih (status apa pun) */
function ExpandedStageCard({ stage }: { stage: LearningStage }) {
    const isLocked = stage.status === "locked";
    const isCompleted = stage.status === "completed";
    const nextTopic = stage.topics.find((topic) => topic.status === "active");

    return (
        <article
            className={`w-full rounded-2xl border-2 bg-white p-4 shadow-lg sm:p-6 ${
                isLocked
                    ? "border-[var(--color-border)]"
                    : "border-[var(--color-forest)]"
            }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span
                        aria-hidden="true"
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${
                            isLocked
                                ? "bg-[var(--color-surface-soft)] text-[var(--color-muted)]"
                                : "bg-[var(--color-forest)] text-white"
                        }`}
                    >
                        {isLocked ? (
                            <LockIcon className="h-4 w-4" />
                        ) : isCompleted ? (
                            <CheckIcon className="h-4 w-4" />
                        ) : (
                            String(stage.number).padStart(2, "0")
                        )}
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
                {stage.status === "active" && stage.sessionMinutes ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                        <ClockIcon className="h-3.5 w-3.5" />
                        Estimasi progres sesi: {stage.sessionMinutes} menit
                    </span>
                ) : isLocked ? (
                    <span className="text-xs text-[var(--color-muted)]">
                        Selesaikan Stage {stage.number - 1} untuk membuka
                    </span>
                ) : (
                    <span />
                )}

                {stage.status === "active" && nextTopic && (
                    <Link
                        href={nextTopic.kind === "latihan"
                            ? quizzes.show.url(nextTopic.code.replace("QUIZ-ST-", ""))
                            : lessons.show.url(nextTopic.code)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                    >
                        Lanjutkan Belajar Sekarang
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                )}
                {isCompleted && (
                    <Link
                        href={lessons.show.url(`${stage.number}.1`)}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white px-5 text-sm font-bold text-[var(--color-forest-muted)] transition-colors hover:bg-[var(--color-surface-soft)]"
                    >
                        Tinjau Ulang
                    </Link>
                )}
            </div>
        </article>
    );
}

/* Kartu ringkas untuk stage aktif yang sedang tidak dipilih */
function CompactActiveStageCard({ stage }: { stage: LearningStage }) {
    return (
        <article className="w-full rounded-2xl border-2 border-[var(--color-forest)] bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)] px-2.5 py-1 text-[10px] font-bold text-white">
                    Sedang berjalan
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
            <div className="mt-4 border-t border-[var(--color-border)] pt-3 text-xs font-medium text-[var(--color-forest-muted)]">
                {stage.completedTopics}/{stage.totalTopics} sub-materi selesai
            </div>
        </article>
    );
}

function StageCard({
    stage,
    expanded = false,
}: {
    stage: LearningStage;
    expanded?: boolean;
}) {
    if (expanded) return <ExpandedStageCard stage={stage} />;
    if (stage.status === "active")
        return <CompactActiveStageCard stage={stage} />;
    if (stage.status === "locked") return <LockedStageCard stage={stage} />;
    return <CompletedStageCard stage={stage} />;
}

/* ---------- Mode Daftar Topik ---------- */
type TopicFilter = "all" | StageStatus;
type CourseInfo = LearningPathProps["course"];

function ListTopicRow({ topic }: { topic: StageTopic }) {
    const base =
        "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-xs";

    if (topic.status === "locked") {
        return (
            <div
                className={`${base} bg-[var(--color-surface-soft)]/60 text-[var(--color-muted)]`}
            >
                <span className="flex min-w-0 items-center gap-2.5">
                    <LockIcon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                        {topic.code} {topic.title}
                    </span>
                </span>
            </div>
        );
    }

    if (topic.status === "active") {
        const href = topic.kind === "latihan"
            ? quizzes.show.url(topic.code.replace("QUIZ-ST-", ""))
            : lessons.show.url(topic.code);
        return (
            <Link
                href={href}
                className={`${base} border border-[var(--color-mint)] bg-[var(--color-mint)]/40 font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-mint)]/70`}
            >
                <span className="flex min-w-0 items-center gap-2.5">
                    <ClockIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-forest)]" />
                    <span className="truncate">
                        {topic.code} {topic.title}
                    </span>
                </span>
                <span className="shrink-0 font-bold text-[var(--color-forest)]">
                    Progres {topic.progress}%
                </span>
            </Link>
        );
    }

    return (
        <div
            className={`${base} bg-[var(--color-surface-soft)] text-[var(--color-ink)]`}
        >
            <span className="flex min-w-0 items-center gap-2.5">
                {topic.kind === "latihan" ? (
                    <BookIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-muted)]" />
                ) : (
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-forest-muted)]" />
                )}
                <span className="truncate">
                    {topic.code} {topic.title}
                </span>
            </span>
            {topic.duration && (
                <span className="shrink-0 text-[11px] font-semibold text-[var(--color-muted)]">
                    {topic.duration}
                </span>
            )}
        </div>
    );
}

function TopicListCard({ stage }: { stage: LearningStage }) {
    const isLocked = stage.status === "locked";
    const isActive = stage.status === "active";
    const nextTopic = stage.topics.find((t) => t.status === "active");

    const badge = isLocked
        ? {
              label: "Terkunci",
              cls: "bg-[var(--color-surface-soft)] text-[var(--color-muted)]",
              icon: <LockIcon className="h-3 w-3" />,
          }
        : isActive
          ? {
                label: "Sedang Berjalan",
                cls: "bg-[var(--color-mint)] text-[var(--color-forest)]",
                icon: (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                ),
            }
          : {
                label: "Selesai",
                cls: "bg-[var(--color-mint)] text-[var(--color-forest)]",
                icon: <CheckIcon className="h-3 w-3" />,
            };

    return (
        <article
            className={`rounded-2xl bg-white p-5 shadow-sm ${
                isActive
                    ? "border-2 border-[var(--color-forest)]"
                    : "border border-[var(--color-border)]"
            } ${isLocked ? "opacity-60" : ""}`}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px]">
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.cls}`}
                    >
                        {badge.icon}
                        {badge.label}
                    </span>
                    <span className="font-semibold text-[var(--color-muted)]">
                        {stage.week}
                    </span>
                </div>
                {isLocked ? (
                    <LockIcon className="h-4 w-4 text-[var(--color-muted)]" />
                ) : (
                    <BookmarkIcon
                        filled={isActive}
                        className={`h-4 w-4 ${
                            isActive
                                ? "text-[var(--color-forest)]"
                                : "text-[var(--color-muted)]"
                        }`}
                    />
                )}
            </div>

            <h3
                className={`mt-3 text-base font-bold ${
                    isLocked
                        ? "text-[var(--color-muted)]"
                        : "text-[var(--color-ink)]"
                }`}
            >
                Topik {stage.number}: {stage.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                {stage.description}
                {isLocked && stage.number > 1 && (
                    <>
                        {" "}
                        Prasyarat: Selesaikan Topik {stage.number - 1} terlebih
                        dahulu.
                    </>
                )}
            </p>

            {!isLocked && stage.topics.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2 rounded-xl border border-[var(--color-border)] p-2">
                    {stage.topics.map((topic) => (
                        <li key={topic.code}>
                            <ListTopicRow topic={topic} />
                        </li>
                    ))}
                </ul>
            )}

            {!isLocked && (
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3 text-[11px]">
                    <span className="font-medium text-[var(--color-muted)]">
                        {isActive
                            ? stage.targetLabel
                                ? `Target selesai: ${stage.targetLabel}`
                                : ""
                            : stage.completedAt
                              ? `Diselesaikan pada ${stage.completedAt}`
                              : ""}
                    </span>
                    {isActive ? (
                        nextTopic && (
                            <Link
                                href={nextTopic.kind === "latihan"
                                    ? quizzes.show.url(nextTopic.code.replace("QUIZ-ST-", ""))
                                    : lessons.show.url(nextTopic.code)}
                                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[var(--color-forest)] px-4 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)]"
                            >
                                Lanjut Belajar
                                <ArrowRightIcon className="h-3.5 w-3.5" />
                            </Link>
                        )
                    ) : (
                        <Link
                            href={lessons.show.url(`${stage.number}.1`)}
                            className="inline-flex min-h-9 items-center rounded-lg border border-[var(--color-border)] bg-white px-4 text-xs font-bold text-[var(--color-forest-muted)] transition-colors hover:bg-[var(--color-surface-soft)]"
                        >
                            Tinjau Materi
                        </Link>
                    )}
                </div>
            )}
        </article>
    );
}

function TopicListView({
    stages,
    course,
}: {
    stages: LearningStage[];
    course: CourseInfo;
}) {
    const { lecturer, outcomes, tip } = course;
    const [filter, setFilter] = useState<TopicFilter>("all");
    const [query, setQuery] = useState("");

    const count = (s: StageStatus) =>
        stages.filter((x) => x.status === s).length;
    const tabs: { key: TopicFilter; label: string; total: number }[] = [
        { key: "all", label: "Semua Topik", total: stages.length },
        { key: "completed", label: "Selesai", total: count("completed") },
        { key: "active", label: "Sedang Berjalan", total: count("active") },
        { key: "locked", label: "Terkunci", total: count("locked") },
    ];

    const q = query.trim().toLowerCase();
    const visible = stages.filter((stage) => {
        if (filter !== "all" && stage.status !== filter) return false;
        if (!q) return true;
        return (
            stage.title.toLowerCase().includes(q) ||
            stage.description.toLowerCase().includes(q) ||
            stage.topics.some((t) => t.title.toLowerCase().includes(q))
        );
    });

    return (
        <section
            aria-label="Daftar topik"
            className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_280px]"
        >
            <div className="flex min-w-0 flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div
                        role="tablist"
                        aria-label="Filter topik"
                        className="flex flex-wrap gap-2"
                    >
                        {tabs.map((tab) => {
                            const active = filter === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setFilter(tab.key)}
                                    className={`rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] ${
                                        active
                                            ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                                            : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:bg-[var(--color-surface-soft)]"
                                    }`}
                                >
                                    {tab.label} ({tab.total})
                                </button>
                            );
                        })}
                    </div>

                    <label className="relative w-full sm:w-56">
                        <span className="sr-only">Cari materi</span>
                        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-muted)]" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari materi pembelajaran..."
                            className="w-full rounded-full border border-[var(--color-border)] bg-white py-2 pl-9 pr-3 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        />
                    </label>
                </div>

                {visible.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white p-8 text-center text-sm text-[var(--color-muted)]">
                        Tidak ada topik yang cocok.
                    </p>
                ) : (
                    visible.map((stage) => (
                        <TopicListCard key={stage.number} stage={stage} />
                    ))
                )}
            </div>

            <aside className="flex flex-col gap-4">
                {lecturer && (
                    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                            Dosen Pengampu
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-forest)] text-xs font-extrabold text-white">
                                {lecturer.initials}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-[var(--color-ink)]">
                                    {lecturer.name}
                                </p>
                                <p className="truncate text-[11px] text-[var(--color-muted)]">
                                    NIDN: {lecturer.nip}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {outcomes && outcomes.length > 0 && (
                    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
                        <p className="flex items-center gap-2 text-xs font-bold text-[var(--color-ink)]">
                            <CheckIcon className="h-3.5 w-3.5 text-[var(--color-forest-muted)]" />
                            Target Capaian (CPL)
                        </p>
                        <ul className="mt-3 flex flex-col gap-3">
                            {outcomes.map((item) => (
                                <li key={item.label}>
                                    <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-ink)]">
                                        <span>{item.label}</span>
                                        <span>{item.value}%</span>
                                    </div>
                                    <div
                                        role="progressbar"
                                        aria-label={item.label}
                                        aria-valuenow={item.value}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-soft)]"
                                    >
                                        <div
                                            className="h-full rounded-full bg-[var(--color-forest-muted)]"
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {tip && (
                    <p className="rounded-2xl border border-[var(--color-border)] bg-white p-4 text-[11px] leading-5 text-[var(--color-muted)] shadow-sm">
                        {tip}
                    </p>
                )}
            </aside>
        </section>
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

    const sectionRef = useRef<HTMLElement | null>(null);
    const [selectedStage, setSelectedStage] = useState<number>(
        stages.find((s) => s.status === "active")?.number ?? stages[0]?.number,
    );

    useEffect(() => {
        if (viewMode !== "path") return;
        const section = sectionRef.current;
        if (!section) return;

        // Hanya dipakai untuk ukuran viewport & snap, BUKAN untuk listener
        const findScroller = (el: HTMLElement): HTMLElement | null => {
            let node = el.parentElement;
            while (node) {
                const { overflowY } = getComputedStyle(node);
                if (
                    (overflowY === "auto" || overflowY === "scroll") &&
                    node.scrollHeight > node.clientHeight
                ) {
                    return node;
                }
                node = node.parentElement;
            }
            return null;
        };

        const scroller = findScroller(section); // null = window yang scroll
        const snapTarget = scroller ?? document.documentElement;
        const previousSnap = snapTarget.style.scrollSnapType;
        snapTarget.style.scrollSnapType = "y proximity";

        const items = Array.from(
            section.querySelectorAll<HTMLElement>("[data-stage]"),
        );

        const update = () => {
            if (items.length === 0) return;

            const viewTop = scroller ? scroller.getBoundingClientRect().top : 0;
            const viewHeight = scroller
                ? scroller.clientHeight
                : window.innerHeight;
            const scrollTop = scroller ? scroller.scrollTop : window.scrollY;
            const maxScroll = scroller
                ? scroller.scrollHeight - scroller.clientHeight
                : document.documentElement.scrollHeight - window.innerHeight;

            let target: HTMLElement = items[0];

            if (maxScroll > 0 && scrollTop >= maxScroll - 4) {
                target = items[items.length - 1]; // mentok bawah -> stage terakhir
            } else if (scrollTop <= 4 && maxScroll > 0) {
                // mentok atas: biarkan perhitungan jarak yang menentukan
            }

            const center = viewTop + viewHeight / 2;
            if (!(maxScroll > 0 && scrollTop >= maxScroll - 4)) {
                let best = Infinity;
                items.forEach((el) => {
                    const r = el.getBoundingClientRect();
                    const distance = Math.abs(r.top + r.height / 2 - center);
                    if (distance < best) {
                        best = distance;
                        target = el;
                    }
                });
            }

            setSelectedStage(Number(target.dataset.stage));
        };

        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        // capture: true -> menangkap scroll dari window MAUPUN elemen mana pun
        window.addEventListener("scroll", onScroll, {
            capture: true,
            passive: true,
        });
        window.addEventListener("resize", onScroll);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll, { capture: true });
            window.removeEventListener("resize", onScroll);
            snapTarget.style.scrollSnapType = previousSnap;
        };
    }, [viewMode, stages]);

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
                        ref={sectionRef}
                        aria-label="Peta tahap belajar"
                        className="relative py-6"
                    >
                        {/* Container utama dengan garis vertikal solid yang pasti muncul */}
                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-1 -translate-x-1/2 rounded-full"
                                style={{ backgroundColor: "#9DB8A8" }}
                            />

                            <div className="flex flex-col gap-10 relative z-10">
                                {stages.map((stage, index) => {
                                    const isSelected =
                                        selectedStage === stage.number;
                                    const isLocked = stage.status === "locked";
                                    const isLeft = index % 2 === 0;

                                    // Posisi & ukuran hanya lewat transform (smooth, di-GPU)
                                    const transformClass = isSelected
                                        ? "translate-x-0 scale-100 opacity-100"
                                        : `scale-[0.97] opacity-70 md:scale-[0.6] ${
                                              isLeft
                                                  ? "md:-translate-x-1/4"
                                                  : "md:translate-x-1/4"
                                          }`;

                                    return (
                                        <div
                                            key={stage.number}
                                            data-stage={stage.number}
                                            className="relative w-full snap-center scroll-my-8 px-4"
                                        >
                                            {/* Penanda di garis tengah: hilang saat card terpilih menutupi garis */}
                                            <span
                                                aria-hidden="true"
                                                className={`absolute left-1/2 top-1/2 z-20 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[var(--color-canvas)] shadow-sm transition-opacity duration-500 md:flex ${
                                                    isSelected
                                                        ? "opacity-0"
                                                        : "opacity-100"
                                                } ${
                                                    isLocked
                                                        ? "bg-[var(--color-surface-soft)] text-[var(--color-muted)]"
                                                        : "bg-[var(--color-mint)] text-[var(--color-forest-muted)]"
                                                }`}
                                            >
                                                {isLocked ? (
                                                    <LockIcon className="h-4 w-4" />
                                                ) : (
                                                    <CheckIcon className="h-4 w-4" />
                                                )}
                                            </span>

                                            {/* Mover: selalu selebar baris, translateX % mengacu ke lebar baris */}
                                            <div
                                                className={`will-change-transform transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${transformClass}`}
                                            >
                                                {/* Ukuran card selalu sama; hanya di-scale oleh mover */}
                                                <div className="mx-auto w-full max-w-2xl">
                                                    <StageCard
                                                        stage={stage}
                                                        expanded={isSelected}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {upcomingCount > 0 && (
                            <div className="relative z-10 mt-12 flex flex-col items-center gap-2">
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
