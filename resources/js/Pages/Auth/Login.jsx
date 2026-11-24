import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const inputClass =
        "w-full rounded-lg border-0 bg-[var(--color-surface-soft)] px-4 py-3.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]";

    return (
        <>
            <Head title="Masuk" />

            <div className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                {/* ---------- Panel kiri (maskot) ---------- */}
                <aside className="relative hidden flex-col justify-between overflow-hidden bg-[var(--color-forest)] p-8 text-white lg:flex">
                    <img
                        src="/images/learnhub-dashboard/Asset64x1.png"
                        alt="LearnHub"
                        className="h-6 w-auto self-start"
                    />

                    <img
                        src="/images/learnhub-dashboard/imgAsset34X3.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none mx-10 my-6 w-full max-w-[20rem] select-none"
                    />

                    <div>
                        <span className="inline-block rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium">
                            Rencana Pembelajaran Terpadu
                        </span>
                        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">
                            Belajar selangkah demi selangkah
                        </h2>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
                            Masuk untuk melanjutkan stage, kuis, dan progres
                            semestermu.
                        </p>
                    </div>
                </aside>

                {/* ---------- Panel kanan (form) ---------- */}
                <main className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-sm">
                        <div className="space-x-3 w-fit mx-auto flex items-center justify-center mb-5">
                            <img
                                src="/images/learnhub-dashboard/imgAsset24X7.png"
                                alt="LearnHub"
                                className="mx-auto h-6 w-auto inline-block"
                            />
                            <img
                                src="/images/learnhub-dashboard/imgAsset44X4.png"
                                alt="LearnHub"
                                className="mx-auto h-6 w-auto inline-block"
                            />
                        </div>

                        <h1 className="text-3xl font-black tracking-tight text-[var(--color-ink)]">
                            Selamat datang kembali
                        </h1>
                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                            Masuk dengan akun mahasiswa kamu.
                        </p>

                        {status && (
                            <div className="mt-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-6 space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-xs font-bold text-[var(--color-ink)]"
                                >
                                    NRP atau email kampus
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    placeholder="mis. 1152800023"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-xs font-bold text-[var(--color-ink)]"
                                >
                                    Kata sandi
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        placeholder="Minimal 6 karakter"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`${inputClass} pr-24`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((v) => !v)
                                        }
                                        aria-pressed={showPassword}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-ink)] focus:outline-none focus-visible:underline"
                                    >
                                        {showPassword
                                            ? "Sembunyikan"
                                            : "Tampilkan"}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--color-ink)]">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                        className="h-3.5 w-3.5 rounded border-gray-300 text-[var(--color-forest)] focus:ring-[var(--color-forest)]"
                                    />
                                    Ingat saya
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-xs font-bold text-[var(--color-forest)] hover:underline focus:outline-none focus-visible:underline"
                                    >
                                        Lupa kata sandi?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-[var(--color-forest)] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2 disabled:opacity-60"
                            >
                                {processing ? "Memproses..." : "Masuk"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-[11px] text-[var(--color-muted)]">
                            Belum punya akun?{" "}
                            <span className="font-bold text-[var(--color-ink)] underline">
                                Hubungi admin prodi
                            </span>{" "}
                            untuk aktivasi.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
