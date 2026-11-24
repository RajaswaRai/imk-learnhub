import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import LearnHubPageLayout from '@/Components/LearnHub/LearnHubPageLayout';
import lessons from '@/routes/lessons';

type AuthUser = { name: string; email: string };
type ProgressProps = {
    auth: { user: AuthUser };
    semester: string;
    progress: {
        completionPercentage: number;
        completedMaterials: number;
        totalMaterials: number;
        completedQuizzes: number;
        pendingQuizzes: number;
        averageScore: number;
        completedStages: number;
        totalStages: number;
        courseProgressPercentage: number;
        courseName: string;
        courseCode: string;
        credits: number;
        scheduleStatus: string;
    };
    nextMilestone: {
        courseName: string;
        title: string;
        description: string;
        dueInDays: number;
    };
    modules: Array<{
        label: string;
        status: 'completed' | 'active' | 'locked';
    }>;
};

function CircularProgress({ percentage }: { percentage: number }) {
    const circumference = 301.59;

    return (
        <svg
            aria-label={`${percentage}% progres keseluruhan`}
            role="img"
            viewBox="0 0 120 120"
            className="h-24 w-24 shrink-0 -rotate-90 sm:h-28 sm:w-28"
        >
            <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="var(--color-surface-soft)"
                strokeWidth="10"
            />
            <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="var(--color-forest-muted)"
                strokeWidth="10"
                strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
                strokeLinecap="round"
            />
            <text
                x="60"
                y="60"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="var(--color-forest)"
                fontSize="22"
                fontWeight="800"
                transform="rotate(90 60 60)"
            >
                {percentage}%
            </text>
        </svg>
    );
}

export default function Progress({
    auth,
    semester,
    progress: summary,
    nextMilestone,
    modules,
}: ProgressProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <>
            <Head title="Progress Belajar" />
            <LearnHubPageLayout
                authUser={auth.user}
                semester={semester}
                activeRoute="progress"
            >
                <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                            <span>Akademik</span>
                            <span aria-hidden="true">›</span>
                            <span className="text-[var(--color-forest-muted)]">Progress Belajar</span>
                        </div>
                        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                            Progress Capaian Pembelajaran
                        </h1>
                        <p className="mt-1 text-sm text-[var(--color-muted)]">
                            Pantau capaian kurikulum RPS dan konsistensi belajarmu secara transparan.
                        </p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-semibold text-[var(--color-ink)] shadow-sm">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[var(--color-forest-muted)]">
                            <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        {semester}
                        <span aria-hidden="true" className="text-[var(--color-muted)]">⌄</span>
                    </span>
                </header>

                <section className="grid items-start gap-4 lg:grid-cols-[1.25fr_0.9fr]">
                    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                                    TOTAL AKUMULASI PEMBELAJARAN
                                </p>
                                <h2 className="mt-2 text-lg font-bold text-[var(--color-ink)]">
                                    {summary.completionPercentage}% Kurikulum Terpenuhi
                                </h2>
                                <p className="mt-1 text-sm text-[var(--color-muted)]">
                                    Menyelesaikan {summary.completedMaterials} dari {summary.totalMaterials} materi inti semester ini.
                                </p>
                            </div>
                            <CircularProgress percentage={summary.completionPercentage} />
                        </div>

                        <div className="mt-5 grid gap-2 sm:grid-cols-3">
                            <div className="rounded-xl bg-[var(--color-surface-soft)] p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted)]">
                                    Materi RPS
                                </p>
                                <p className="mt-1 text-lg font-extrabold text-[var(--color-ink)]">
                                    {summary.completedMaterials}
                                    <span className="ml-1 text-xs font-semibold text-[var(--color-muted)]">/ {summary.totalMaterials}</span>
                                </p>
                                <p className="mt-1 text-[10px] font-semibold text-[var(--color-forest-muted)]">✓ Tuntas</p>
                            </div>
                            <div className="rounded-xl bg-[var(--color-surface-soft)] p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted)]">
                                    Kuis Validasi
                                </p>
                                <p className="mt-1 text-lg font-extrabold text-[var(--color-ink)]">
                                    {summary.completedQuizzes}
                                </p>
                                <p className="mt-1 text-[10px] font-semibold text-[var(--color-forest-muted)]">
                                    ★ {summary.pendingQuizzes} Pending
                                </p>
                            </div>
                            <div className="rounded-xl bg-[var(--color-surface-soft)] p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted)]">
                                    Rata-rata
                                </p>
                                <p className="mt-1 text-lg font-extrabold text-[var(--color-ink)]">
                                    {summary.averageScore}
                                    <span className="text-xs font-semibold text-[var(--color-muted)]">/100</span>
                                </p>
                                <p className="mt-1 text-[10px] font-semibold text-[var(--color-forest-muted)]">↗ Sangat Baik</p>
                            </div>
                        </div>
                    </article>

                    <article className="flex min-h-56 flex-col justify-between rounded-2xl border border-[var(--color-mint)] bg-[var(--color-mint)]/25 p-5 shadow-sm sm:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-[10px] font-bold text-[var(--color-forest)]">
                                <span aria-hidden="true">◉</span>
                                Langkah Berikutnya
                            </span>
                            <span className="text-[10px] font-bold text-[var(--color-forest-muted)]">
                                Tenggat {nextMilestone.dueInDays} Hari Lagi
                            </span>
                        </div>
                        <div className="py-5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                                {nextMilestone.courseName}
                            </p>
                            <h2 className="mt-2 text-lg font-bold text-[var(--color-ink)]">
                                {nextMilestone.title}
                            </h2>
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                                {nextMilestone.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={lessons.show.url('2.2')}
                                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                            >
                                Lanjutkan Belajar Sekarang
                                <span aria-hidden="true">→</span>
                            </Link>
                            <button
                                type="button"
                                aria-pressed={isBookmarked}
                                aria-label={isBookmarked ? 'Hapus penanda materi' : 'Tandai materi'}
                                onClick={() => setIsBookmarked((previous) => !previous)}
                                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] ${
                                    isBookmarked
                                        ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-white'
                                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-forest)] hover:bg-[var(--color-surface-soft)]'
                                }`}
                            >
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                                    <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.5L6 21V4.75Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </article>
                </section>

                <section aria-labelledby="course-progress-heading" className="flex flex-col gap-3">
                    <div>
                        <h2 id="course-progress-heading" className="text-lg font-bold text-[var(--color-ink)]">
                            Capaian Pembelajaran Matakuliah
                        </h2>
                        <p className="text-xs text-[var(--color-muted)]">
                            Monitoring kecepatan belajar pada setiap modul semester berjalan.
                        </p>
                    </div>
                    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-mint)] px-3 py-1 text-[10px] font-bold text-[var(--color-forest-muted)]">
                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-forest-muted)]" />
                                    Aktif Berjalan
                                </span>
                                <h3 className="mt-3 text-sm font-bold text-[var(--color-ink)]">
                                    {summary.courseName}
                                </h3>
                                <p className="text-xs text-[var(--color-muted)]">
                                    {summary.courseCode} · {summary.credits} SKS
                                </p>
                            </div>
                            <p className="text-lg font-extrabold text-[var(--color-forest)]">
                                {summary.courseProgressPercentage}%
                            </p>
                        </div>
                        <div
                            role="progressbar"
                            aria-label={`Progres ${summary.courseName}`}
                            aria-valuenow={summary.courseProgressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-surface-soft)]"
                        >
                            <div
                                className="h-full rounded-full bg-[var(--color-forest)]"
                                style={{ width: `${summary.courseProgressPercentage}%` }}
                            />
                        </div>
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                            <span className="text-[var(--color-muted)]">
                                {summary.completedStages} dari {summary.totalStages} Stage Tuntas
                            </span>
                            <span className="font-bold text-[var(--color-forest-muted)]">
                                {summary.scheduleStatus}
                            </span>
                        </div>
                    </article>
                </section>

                <section aria-labelledby="module-matrix-heading" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h2 id="module-matrix-heading" className="text-lg font-bold text-[var(--color-ink)]">
                                Matriks Jalur Pembelajaran RPS
                            </h2>
                            <p className="text-xs text-[var(--color-muted)]">
                                Pemetaan tahapan per modul pertemuan untuk memantau prasyarat materi.
                            </p>
                        </div>
                        <div aria-label="Legenda status modul" className="flex flex-wrap gap-3 text-[10px] font-semibold text-[var(--color-muted)]">
                            <span className="inline-flex items-center gap-1.5">
                                <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-mint)] text-[var(--color-forest-muted)]">✓</span>
                                Selesai
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-forest)] text-white">6</span>
                                Tersedia / Aktif
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-forest)]">!</span>
                                Kuis Tertunda
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-surface-soft)] text-[var(--color-muted)]">⌑</span>
                                Terkunci
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-[var(--color-surface-soft)] p-3 sm:p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-bold text-[var(--color-ink)]">
                                1. {summary.courseName}
                                <span className="ml-2 text-[10px] font-medium text-[var(--color-muted)]">· 8 Pertemuan</span>
                            </p>
                            <p className="text-[10px] font-bold text-[var(--color-forest-muted)]">
                                Stage 6 Siap Dipelajari
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
                            {modules.map((module, index) => {
                                const isActive = module.status === 'active';
                                const style =
                                    module.status === 'completed'
                                        ? 'border-[var(--color-mint)] bg-[var(--color-mint)]/35 text-[var(--color-forest-muted)]'
                                        : isActive
                                          ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-white ring-1 ring-[var(--color-forest)]'
                                          : 'border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-muted)]';

                                return isActive ? (
                                    <Link
                                        key={module.label}
                                        href={lessons.show.url('2.2')}
                                        aria-label={`Buka ${module.label}, modul aktif`}
                                        className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border text-[10px] font-bold transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] ${style}`}
                                    >
                                        <span aria-hidden="true">⊙</span>
                                        {module.label}
                                    </Link>
                                ) : (
                                    <div
                                        key={module.label}
                                        aria-label={`${module.label}, ${module.status === 'completed' ? 'selesai' : 'terkunci'}`}
                                        className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border text-[10px] font-bold ${style}`}
                                    >
                                        <span aria-hidden="true">
                                            {module.status === 'completed' ? '✓' : '⌑'}
                                        </span>
                                        {module.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </LearnHubPageLayout>
        </>
    );
}
