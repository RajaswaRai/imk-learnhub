import { useState, type ReactNode } from "react";
import { Head, Link, router } from "@inertiajs/react";
import LearnHubPageLayout from "@/Components/LearnHub/LearnHubPageLayout";
import lessons from "@/routes/lessons";
import learningPath from "@/routes/learning-path";
import quizzes from "@/routes/quizzes";

type AuthUser = { name: string; email: string };

type ContentCard = {
    title: string;
    meta?: string;
    text?: string;
    symbol?: string;
    tone?: "mint" | "accent";
};

type ContentBlock =
    | { type: "heading"; level: number; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullets"; items: string[] }
    | { type: "steps"; items: string[] }
    | { type: "callout"; variant?: "tip" | "note"; title: string; text: string }
    | { type: "cards"; columns?: number; items: ContentCard[] }
    | {
          type: "compare";
          columns: Array<{
              title: string;
              badge?: string;
              lines?: string[];
              code?: string;
          }>;
      }
    | { type: "code"; label: string; code: string; caption?: string }
    | {
          type: "table";
          columns: string[];
          rows: string[][];
          caption?: string;
      };

type LessonDetailProps = {
    auth: { user: AuthUser };
    semester: string;
    lesson: {
        id: string;
        courseName: string;
        stage: number;
        stageTitle: string;
        session: number;
        position: number;
        totalTopics: number;
        title: string;
        objective: string;
        objectives: string[];
        readMinutes: number;
        content: ContentBlock[];
        keyPoints: string[];
        mentorTip: string;
        summary: string;
        completed: boolean;
        stageStatus: "completed" | "active" | "locked";
        previousLesson: string | null;
        nextLesson: string | null;
    };
};

const ClockIcon = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
    >
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
        />
    </svg>
);

/* ---------- Blok konten ---------- */

function HeadingBlock({ level, text }: { level: number; text: string }) {
    if (level >= 3) {
        return (
            <h3 className="mt-6 text-base font-bold text-[var(--color-forest)]">
                {text}
            </h3>
        );
    }

    return (
        <h2 className="mt-8 flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-[var(--color-forest)]">
            <span
                aria-hidden="true"
                className="h-5 w-1.5 rounded-full bg-[var(--color-forest-muted)]"
            />
            {text}
        </h2>
    );
}

function CalloutBlock({
    variant = "note",
    title,
    text,
}: {
    variant?: "tip" | "note";
    title: string;
    text: string;
}) {
    const isTip = variant === "tip";

    return (
        <div
            className={`rounded-xl border p-4 ${
                isTip
                    ? "border-[var(--color-mint)] bg-[var(--color-mint)]/25"
                    : "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/15"
            }`}
        >
            <p className="flex items-center gap-2 text-xs font-bold text-[var(--color-forest)]">
                <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                        isTip
                            ? "bg-[var(--color-forest)] text-white"
                            : "bg-[var(--color-accent)] text-[var(--color-forest)]"
                    }`}
                >
                    !
                </span>
                {title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]">
                {text}
            </p>
        </div>
    );
}

function CardsBlock({
    columns = 3,
    items,
}: {
    columns?: number;
    items: ContentCard[];
}) {
    const columnClass =
        columns >= 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : columns === 3
              ? "sm:grid-cols-3"
              : "sm:grid-cols-2";

    return (
        <div className={`grid gap-3 ${columnClass}`}>
            {items.map((item, index) => (
                <article
                    key={`${item.title}-${index}`}
                    className={`rounded-xl border p-4 ${
                        item.tone === "accent"
                            ? "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/15"
                            : "border-[var(--color-mint)] bg-[var(--color-mint)]/20"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {item.symbol && (
                            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-lg bg-[var(--color-forest)] px-1.5 font-mono text-[10px] font-bold text-white">
                                {item.symbol}
                            </span>
                        )}
                        <p className="text-sm font-bold text-[var(--color-forest)]">
                            {item.title}
                        </p>
                    </div>
                    {item.meta && (
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-forest-muted)]">
                            {item.meta}
                        </p>
                    )}
                    {item.text && (
                        <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
                            {item.text}
                        </p>
                    )}
                </article>
            ))}
        </div>
    );
}

function CompareBlock({
    columns,
}: {
    columns: Array<{
        title: string;
        badge?: string;
        lines?: string[];
        code?: string;
    }>;
}) {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            {columns.map((column) => (
                <article
                    key={column.title}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4"
                >
                    <p className="text-sm font-bold text-[var(--color-forest)]">
                        {column.title}
                    </p>
                    {column.badge && (
                        <span className="mt-1 inline-block rounded-full bg-[var(--color-mint)]/60 px-2 py-0.5 text-[9px] font-semibold text-[var(--color-forest-muted)]">
                            {column.badge}
                        </span>
                    )}
                    {column.code ? (
                        <pre className="mt-3 overflow-x-auto rounded-lg bg-[var(--color-forest)] p-3 text-[10px] leading-5 text-[var(--color-mint)]">
                            <code>{column.code}</code>
                        </pre>
                    ) : (
                        <ol className="mt-3 flex flex-col gap-1.5 text-xs leading-5 text-[var(--color-muted)]">
                            {column.lines?.map((line, index) => (
                                <li key={index} className="flex gap-2">
                                    <span className="font-bold text-[var(--color-forest-muted)]">
                                        {index + 1}.
                                    </span>
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                </article>
            ))}
        </div>
    );
}

function CodeBlock({
    label,
    code,
    caption,
}: {
    label: string;
    code: string;
    caption?: string;
}) {
    return (
        <figure className="overflow-hidden rounded-xl border border-[var(--color-border)]">
            <figcaption className="flex items-center gap-2 border-b border-white/10 bg-[var(--color-forest-muted)] px-4 py-2.5 text-xs font-bold text-white">
                <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-mint)] text-[10px] font-black text-[var(--color-forest)]"
                >
                    {"</>"}
                </span>
                {label}
            </figcaption>
            <div className="overflow-x-auto bg-[var(--color-forest)] p-4 text-[11px] leading-6 text-[var(--color-mint)]">
                <pre className="min-w-max">
                    <code>{code}</code>
                </pre>
            </div>
            {caption && (
                <p className="border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2 text-[10px] text-[var(--color-muted)]">
                    {caption}
                </p>
            )}
        </figure>
    );
}

function TableBlock({
    columns,
    rows,
    caption,
}: {
    columns: string[];
    rows: string[][];
    caption?: string;
}) {
    return (
        <figure className="overflow-hidden rounded-xl border border-[var(--color-border)]">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                    <thead>
                        <tr className="bg-[var(--color-surface-soft)]">
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    scope="col"
                                    className="px-4 py-2.5 font-bold text-[var(--color-forest)]"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-t border-[var(--color-border)]"
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-4 py-2.5 text-[var(--color-ink)]"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {caption && (
                <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2 text-[10px] text-[var(--color-muted)]">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

function StepsBlock({ items }: { items: string[] }) {
    return (
        <ol className="flex flex-col gap-2">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/60 p-3 text-sm leading-6 text-[var(--color-ink)]"
                >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[11px] font-bold text-white">
                        {index + 1}
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ol>
    );
}

function BulletsBlock({ items }: { items: string[] }) {
    return (
        <ul className="flex flex-col gap-2">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm leading-6 text-[var(--color-ink)]"
                >
                    <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-forest-muted)]"
                    />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function renderBlock(block: ContentBlock, index: number): ReactNode {
    switch (block.type) {
        case "heading":
            return <HeadingBlock key={index} level={block.level} text={block.text} />;
        case "paragraph":
            return (
                <p
                    key={index}
                    className="text-sm leading-7 text-[var(--color-ink)]"
                >
                    {block.text}
                </p>
            );
        case "bullets":
            return <BulletsBlock key={index} items={block.items} />;
        case "steps":
            return <StepsBlock key={index} items={block.items} />;
        case "callout":
            return (
                <CalloutBlock
                    key={index}
                    variant={block.variant}
                    title={block.title}
                    text={block.text}
                />
            );
        case "cards":
            return (
                <CardsBlock key={index} columns={block.columns} items={block.items} />
            );
        case "compare":
            return <CompareBlock key={index} columns={block.columns} />;
        case "code":
            return (
                <CodeBlock
                    key={index}
                    label={block.label}
                    code={block.code}
                    caption={block.caption}
                />
            );
        case "table":
            return (
                <TableBlock
                    key={index}
                    columns={block.columns}
                    rows={block.rows}
                    caption={block.caption}
                />
            );
        default:
            return null;
    }
}

export default function LessonDetail({
    auth,
    semester,
    lesson,
}: LessonDetailProps) {
    const [isPending, setIsPending] = useState(false);
    const isCompleted = lesson.completed;
    const progressPercentage = isCompleted
        ? 100
        : Math.round((lesson.position / lesson.totalTopics) * 100);
    const completionHref = lesson.nextLesson
        ? lessons.show.url(lesson.nextLesson)
        : quizzes.show.url(lesson.stage);
    const completionLabel = lesson.nextLesson
        ? "Sesi berikutnya"
        : "Kerjakan Kuis Stage";

    function completeLesson() {
        setIsPending(true);
        router.post(
            lessons.complete.url(lesson.id),
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsPending(false),
            },
        );
    }

    return (
        <>
            <Head title={`Materi ${lesson.id}`} />
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
                        Sesi {lesson.session}: {lesson.title}
                    </span>
                </nav>

                <header className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-forest-muted)]">
                                STAGE {lesson.stage} · SESI {lesson.session}
                            </p>
                            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-forest)] sm:text-3xl">
                                {lesson.title}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                                {lesson.objective}
                            </p>
                        </div>
                        <div className="flex w-fit shrink-0 flex-col items-end gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-3 py-2 text-xs font-semibold text-[var(--color-muted)]">
                                <ClockIcon />
                                {lesson.readMinutes} menit baca
                            </span>
                            <span className="text-[11px] font-semibold text-[var(--color-forest-muted)]">
                                Sesi {lesson.position} dari {lesson.totalTopics}
                            </span>
                        </div>
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

                <section
                    aria-labelledby="objective-heading"
                    className="rounded-2xl border border-[var(--color-forest-muted)]/30 bg-[var(--color-mint)]/15 p-5 shadow-sm sm:p-6"
                >
                    <p
                        id="objective-heading"
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]"
                    >
                        <span aria-hidden="true">◎</span>
                        Sasaran Belajar Sesi Ini
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-1">
                        {lesson.objectives.map((objective, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2.5 text-sm leading-6 text-[var(--color-ink)]"
                            >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[10px] font-bold text-white">
                                    {index + 1}
                                </span>
                                <span>{objective}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
                    <article className="flex min-w-0 flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-7">
                        {lesson.content.map((block, index) => renderBlock(block, index))}

                        <div className="mt-8 rounded-2xl border border-[var(--color-mint)] bg-[var(--color-mint)]/20 p-5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                Rangkuman
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]">
                                {lesson.summary}
                            </p>
                        </div>
                    </article>

                    <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
                        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-forest-muted)]">
                                Poin Kunci
                            </p>
                            <ol className="mt-3 flex flex-col gap-3">
                                {lesson.keyPoints.map((point, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2.5 text-xs leading-5 text-[var(--color-ink)]"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint)] text-[10px] font-bold text-[var(--color-forest)]">
                                            {index + 1}
                                        </span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/images/learnhub-learning/lesson-detail/imgMaskotBurungHantuLearnHub.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="h-9 w-9 object-contain"
                                />
                                <div>
                                    <h2 className="text-xs font-bold text-[var(--color-forest)]">
                                        Tips Mentor Owl
                                    </h2>
                                    <span className="text-[9px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                                        RPS Sesi {lesson.session}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-3 rounded-lg bg-[var(--color-surface-soft)] px-3 py-2 text-xs leading-5 text-[var(--color-muted)]">
                                “{lesson.mentorTip}”
                            </p>
                        </section>
                    </aside>
                </div>

                <footer className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    {lesson.previousLesson ? (
                        <Link
                            href={lessons.show.url(lesson.previousLesson)}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        >
                            ← Sesi sebelumnya
                        </Link>
                    ) : (
                        <Link
                            href={learningPath.show.url()}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        >
                            ← Kembali ke Alur Belajar
                        </Link>
                    )}

                    {isCompleted ? (
                        <Link
                            href={completionHref}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-mint)] px-5 py-2.5 text-xs font-bold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-accent)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                        >
                            {completionLabel}
                            <span aria-hidden="true" className="ml-2">
                                →
                            </span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={completeLesson}
                            disabled={isPending}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-forest)] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                        >
                            {isPending ? "Menyimpan..." : "Tandai Selesai"}
                            <span aria-hidden="true" className="ml-2">
                                →
                            </span>
                        </button>
                    )}
                </footer>
            </LearnHubPageLayout>
        </>
    );
}
