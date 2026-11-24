import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import profile from '@/routes/profile';

const assetPath = '/images/learnhub-dashboard/';

/**
 * @param {{
 *   user: { name: string, email: string },
 *   semester: string,
 *   searchValue: string,
 *   onSearchChange: (value: string) => void,
 *   isNavigationOpen: boolean,
 *   onMenuToggle: () => void
 * }} props
 */
export default function DashboardHeader({
    user,
    semester,
    searchValue,
    onSearchChange,
    isNavigationOpen,
    onMenuToggle,
}) {
    const initials = user.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center gap-3 border-b border-[var(--color-border)]/80 bg-white/90 px-4 backdrop-blur-md md:left-60 md:gap-6 md:px-6">
            <button
                type="button"
                aria-label={
                    isNavigationOpen ? 'Tutup navigasi' : 'Buka navigasi'
                }
                aria-controls="dashboard-navigation"
                aria-expanded={isNavigationOpen}
                onClick={onMenuToggle}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] md:hidden"
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                >
                    <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.8"
                    />
                </svg>
            </button>

            <div className="relative min-w-0 max-w-md flex-1">
                <img
                    src={`${assetPath}imgIcon.svg`}
                    alt=""
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 object-contain"
                />
                <label htmlFor="dashboard-search" className="sr-only">
                    Cari materi pembelajaran
                </label>
                <TextInput
                    id="dashboard-search"
                    type="search"
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.currentTarget.value)}
                    placeholder="Cari modul RPS, tugas, atau capaian pembelajaran..."
                    autoComplete="off"
                    className="h-10 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/80 py-2 pl-9 pr-3 text-xs text-[var(--color-ink)] shadow-none placeholder:text-[var(--color-muted)]/70 focus:!border-[var(--color-forest-muted)] focus:!ring-2 focus:!ring-[var(--color-mint)]"
                />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
                <div className="hidden items-center gap-1.5 rounded-full border border-[var(--color-mint)] bg-[var(--color-mint)]/40 px-2.5 py-1 text-[10px] font-semibold text-[var(--color-forest-muted)] sm:flex">
                    <img
                        src={`${assetPath}imgContainer17.svg`}
                        alt=""
                        className="h-3 w-3 object-contain"
                    />
                    <span>{semester}</span>
                </div>

                <button
                    type="button"
                    aria-label="Notifikasi"
                    className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                >
                    <img
                        src={`${assetPath}imgContainer18.svg`}
                        alt=""
                        className="h-4 w-4 object-contain"
                    />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-600" />
                </button>

                <span className="hidden h-5 w-px bg-[var(--color-border)] sm:block" />

                <Link
                    href={profile.edit.url()}
                    aria-label={`Profil ${user.name}`}
                    className="flex items-center gap-2 rounded-lg py-1 pl-1 transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                >
                    <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-forest-muted)] text-[10px] font-bold text-white"
                    >
                        {initials}
                    </span>
                    <span className="hidden max-w-28 sm:block">
                        <span className="block truncate text-[11px] font-semibold leading-4 text-[var(--color-ink)]">
                            {user.name}
                        </span>
                        <span className="block text-[9px] leading-3 text-[var(--color-muted)]">
                            Mahasiswa Aktif
                        </span>
                    </span>
                </Link>
            </div>
        </header>
    );
}
