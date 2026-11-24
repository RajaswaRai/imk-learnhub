import LearnHubPageLayout from "@/Components/LearnHub/LearnHubPageLayout.jsx";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({
    auth,
    semester,
    profile,
    mustVerifyEmail,
    status,
}) {
    const user = auth.user;

    const { data, setData, patch, processing, errors, reset, isDirty } =
        useForm({
            name: user.name ?? "",
            email: user.email ?? "",
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), { preserveScroll: true });
    };

    const initial = (user.name ?? "?").trim().charAt(0).toUpperCase();

    const fieldClass =
        "w-full rounded-lg border-0 bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] disabled:cursor-not-allowed disabled:text-[var(--color-muted)]";
    const labelClass =
        "mb-1.5 block text-[11px] font-semibold text-[var(--color-muted)]";

    const stats = [
        {
            label: "Materi selesai",
            value: profile?.completedLessons ?? 0,
            suffix: `/ ${profile?.totalLessons ?? 0}`,
        },
        { label: "Kuis lulus", value: profile?.passedQuizzes ?? 0 },
        {
            label: "Rata-rata nilai",
            value: profile?.averageScore ?? 0,
            suffix: "/ 100",
        },
    ];

    return (
        <>
            <Head title="Profil saya" />
            <LearnHubPageLayout
                authUser={user}
                semester={semester}
                activeRoute="profile"
            >
                <header>
                    <p className="text-xs text-[var(--color-muted)]">Akun</p>
                    <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)]">
                        Profil saya
                    </h1>
                </header>

                <div className="mt-5 flex flex-col gap-5">
                    {/* ---------- Ringkasan ---------- */}
                    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <span
                                aria-hidden="true"
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-lg font-bold text-white"
                            >
                                {initial}
                            </span>
                            <div className="min-w-0">
                                <h2 className="truncate text-xl font-bold text-[var(--color-ink)]">
                                    {user.name}
                                </h2>
                                <p className="truncate text-xs text-[var(--color-muted)]">
                                    {profile?.studyProgram ?? "-"}
                                    {profile?.campus
                                        ? ` · ${profile.campus}`
                                        : ""}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                                    {profile?.streak != null && (
                                        <span className="rounded-full bg-[var(--color-mint)] px-2.5 py-1 text-[var(--color-forest)]">
                                            Streak {profile.streak} Hari
                                        </span>
                                    )}
                                    {profile?.xp != null && (
                                        <span className="rounded-full bg-[var(--color-accent)]/30 px-2.5 py-1 text-[var(--color-forest)]">
                                            {profile.xp} XP
                                        </span>
                                    )}
                                    <span className="rounded-full bg-[var(--color-mint)] px-2.5 py-1 text-[var(--color-forest)]">
                                        Mahasiswa Aktif
                                    </span>
                                </div>
                            </div>
                        </div>

                        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-xl bg-[var(--color-surface-soft)] px-4 py-3"
                                >
                                    <dt className="text-[11px] text-[var(--color-muted)]">
                                        {s.label}
                                    </dt>
                                    <dd className="mt-1 text-2xl font-extrabold text-[var(--color-ink)]">
                                        {s.value}
                                        {s.suffix && (
                                            <span className="ml-1 text-xs font-normal text-[var(--color-muted)]">
                                                {s.suffix}
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    {/* ---------- Informasi akun ---------- */}
                    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                        <h2 className="text-base font-bold text-[var(--color-ink)]">
                            Informasi akun
                        </h2>

                        {status === "profile-updated" && (
                            <p className="mt-2 text-xs font-medium text-green-600">
                                Perubahan berhasil disimpan.
                            </p>
                        )}

                        <form onSubmit={submit} className="mt-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className={labelClass}
                                    >
                                        Nama lengkap
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        autoComplete="name"
                                        className={fieldClass}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="nrp" className={labelClass}>
                                        NRP
                                    </label>
                                    <input
                                        id="nrp"
                                        type="text"
                                        value={profile?.nrp ?? ""}
                                        disabled
                                        className={fieldClass}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className={labelClass}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        autoComplete="username"
                                        className={fieldClass}
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="program"
                                        className={labelClass}
                                    >
                                        Program studi
                                    </label>
                                    <input
                                        id="program"
                                        type="text"
                                        value={profile?.studyProgram ?? ""}
                                        disabled
                                        className={fieldClass}
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    disabled={!isDirty || processing}
                                    className="rounded-lg bg-[var(--color-surface-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-border)] disabled:opacity-50"
                                >
                                    Batalkan
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isDirty || processing}
                                    className="rounded-lg bg-[var(--color-forest)] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] disabled:opacity-60"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan perubahan"}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* ---------- Keamanan ---------- */}
                    <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                        <div>
                            <h2 className="text-base font-bold text-[var(--color-ink)]">
                                Keamanan
                            </h2>
                            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                                {profile?.passwordUpdatedDays != null
                                    ? `Kata sandi terakhir diperbarui ${profile.passwordUpdatedDays} hari lalu.`
                                    : "Perbarui kata sandi secara berkala."}
                            </p>
                        </div>
                        <Link
                            // href={route("password.edit")}
                            className="rounded-lg bg-[var(--color-surface-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-border)]"
                        >
                            Ganti kata sandi
                        </Link>
                    </section>

                    {/* ---------- Keluar ---------- */}
                    <div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="rounded-lg bg-[var(--color-surface-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-border)]"
                        >
                            Keluar dari akun
                        </Link>
                    </div>
                </div>
            </LearnHubPageLayout>
        </>
    );
}
