import { Link } from "@inertiajs/react";
import { dashboard } from "@/routes";
import learningPath from "@/routes/learning-path";
import profile from "@/routes/profile";
import progress from "@/routes/progress";

const assetPath = "/images/learnhub-dashboard/";

const navigationItems = [
    {
        activeRoute: "dashboard",
        label: "Dashboard",
        href: dashboard.url(),
        icon: "imgContainer19.svg",
    },
    {
        activeRoute: "learningPath",
        label: "Alur Belajar",
        href: learningPath.show.url(),
        icon: "imgContainer20.svg",
    },
    {
        activeRoute: "progress",
        label: "Progress",
        href: progress.index.url(),
        icon: "imgContainer21.svg",
    },
];

/**
 * @param {{
 *   user: { name: string, email: string },
 *   isOpen: boolean,
 *   onClose: () => void,
 *   activeRoute?: 'dashboard' | 'learningPath' | 'progress' | 'lesson'
 * }} props
 */
export default function DashboardSidebar({
    user,
    isOpen,
    onClose,
    activeRoute = "dashboard",
}) {
    const initials = user.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Tutup navigasi"
                    className="fixed inset-0 z-30 bg-[var(--color-ink)]/40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                id="dashboard-navigation"
                aria-label="Navigasi utama"
                className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[var(--color-border)] bg-[var(--color-canvas)] transition-transform duration-200 md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Link
                    href={dashboard.url()}
                    aria-label="LearnHub, Dashboard"
                    onClick={onClose}
                    className="flex h-16 shrink-0 items-center gap-2 border-b border-[var(--color-border)]/70 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-forest)]"
                >
                    <img
                        src={`${assetPath}imgAsset24X7.png`}
                        alt=""
                        className="h-[30px] w-[37px] object-contain"
                    />
                    <img
                        src={`${assetPath}imgAsset44X4.png`}
                        alt=""
                        className="h-[22px] w-[140px] object-contain"
                    />
                </Link>

                <div className="px-6 pb-2 pt-7 text-[11px] font-semibold tracking-[0.08em] text-[var(--color-muted)]">
                    MENU UTAMA
                </div>

                <nav
                    aria-label="Menu utama"
                    className="flex flex-col gap-1 px-2"
                >
                    {navigationItems.map((item) => {
                        const isActive = item.activeRoute === activeRoute;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                onClick={onClose}
                                className={`flex h-10 items-center gap-2.5 rounded-xl px-4 text-[13px] font-semibold transition-colors hover:bg-[var(--color-mint)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] ${
                                    isActive
                                        ? "bg-[var(--color-mint)] text-[var(--color-forest-muted)]"
                                        : "text-[var(--color-muted)]"
                                }`}
                            >
                                <img
                                    src={`${assetPath}${item.icon}`}
                                    alt=""
                                    className="h-4 w-4 object-contain"
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <Link
                    href={profile.edit.url()}
                    onClick={onClose}
                    className="mt-auto flex min-h-14 items-center gap-2.5 border-t border-[var(--color-border)]/70 px-4 py-3 transition-colors hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-forest)]"
                >
                    <span
                        aria-hidden="true"
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint)] text-xs font-bold text-[var(--color-forest)]"
                    >
                        {initials}
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-canvas)] bg-[var(--color-forest-muted)]" />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-[var(--color-ink)]">
                            {user.name}
                        </span>
                        <span className="block truncate text-[10px] text-[var(--color-muted)]">
                            Teknik Informatika
                        </span>
                    </span>
                    <img
                        src={`${assetPath}imgContainer22.svg`}
                        alt=""
                        className="h-3 w-3 object-contain"
                    />
                </Link>
            </aside>
        </>
    );
}
