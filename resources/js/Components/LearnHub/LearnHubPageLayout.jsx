import { useState } from 'react';
import DashboardHeader from '@/Components/LearnHub/DashboardHeader';
import DashboardSidebar from '@/Components/LearnHub/DashboardSidebar';

/**
 * @param {{
 *   authUser: { name: string, email: string },
 *   semester: string,
 *   activeRoute: 'learningPath' | 'progress' | 'lesson',
 *   children: import('react').ReactNode
 * }} props
 */
export default function LearnHubPageLayout({
    authUser,
    semester,
    activeRoute,
    children,
}) {
    const [searchValue, setSearchValue] = useState('');
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
            <DashboardSidebar
                user={authUser}
                activeRoute={activeRoute}
                isOpen={isNavigationOpen}
                onClose={() => setIsNavigationOpen(false)}
            />
            <DashboardHeader
                user={authUser}
                semester={semester}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                isNavigationOpen={isNavigationOpen}
                onMenuToggle={() =>
                    setIsNavigationOpen((previousState) => !previousState)
                }
            />

            <main className="min-h-screen pt-16 md:pl-60">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
