import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import ContinueLearningCard from "@/Components/LearnHub/ContinueLearningCard";
import CourseCard from "@/Components/LearnHub/CourseCard";
import DashboardHeader from "@/Components/LearnHub/DashboardHeader";
import DashboardSidebar from "@/Components/LearnHub/DashboardSidebar";
import SectionHeading from "@/Components/LearnHub/SectionHeading";
import WelcomeHero from "@/Components/LearnHub/WelcomeHero";

/**
 * @param {{
 *   dashboard: {
 *     semester: string,
 *     headerSemester: string,
 *     streakDays: number,
 *     experiencePoints: number,
 *     welcomeTitle: string,
 *     welcomeDescription: string,
 *     resume: {
 *       courseTitle: string,
 *       stageTitle: string,
 *       estimatedMinutes: number,
 *       completedTopics: number,
 *       totalTopics: number,
 *       progressPercentage: number
 *     },
 *     courses: Array<{
 *       id: string,
 *       courseLabel: string,
 *       meetingNumber: number,
 *       title: string,
 *       description: string,
 *       status: 'completed' | 'in_progress' | 'locked',
 *       estimatedMinutes: number | null,
 *       submoduleCount: number | null,
 *       progressPercentage: number | null,
 *       artwork: 'coding' | 'logic' | 'loop',
 *       isBookmarked: boolean
 *     }>
 *   },
 *   auth: { user: { name: string, email: string } }
 * }} props
 */
export default function Dashboard({ dashboard, auth }) {
    const [searchValue, setSearchValue] = useState("");
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const [bookmarkedCourseIds, setBookmarkedCourseIds] = useState(() =>
        dashboard.courses
            .filter((course) => course.isBookmarked)
            .map((course) => course.id),
    );
    const normalizedSearch = searchValue.trim().toLocaleLowerCase();
    const filteredCourses = useMemo(
        () =>
            dashboard.courses.filter((course) =>
                `${course.courseLabel} ${course.title} ${course.description} Pertemuan ${course.meetingNumber}`
                    .toLocaleLowerCase()
                    .includes(normalizedSearch),
            ),
        [dashboard.courses, normalizedSearch],
    );

    function toggleBookmark(courseId) {
        setBookmarkedCourseIds((currentIds) => {
            const nextIds = new Set(currentIds);

            if (nextIds.has(courseId)) {
                nextIds.delete(courseId);
            } else {
                nextIds.add(courseId);
            }

            return [...nextIds];
        });
    }

    return (
        <AuthenticatedLayout hideNavigation>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
                <DashboardSidebar
                    user={auth.user}
                    isOpen={isNavigationOpen}
                    onClose={() => setIsNavigationOpen(false)}
                />
                <DashboardHeader
                    user={auth.user}
                    semester={dashboard.headerSemester}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    isNavigationOpen={isNavigationOpen}
                    onMenuToggle={() =>
                        setIsNavigationOpen((previousState) => !previousState)
                    }
                />

                <main className="min-h-screen pt-16 md:pl-60">
                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                        <section aria-labelledby="dashboard-greeting">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h1
                                        id="dashboard-greeting"
                                        className="text-xl font-bold tracking-tight text-[var(--color-ink)] sm:text-[22px]"
                                    >
                                        Halo, {auth.user.name}
                                    </h1>
                                    <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                                        {dashboard.semester}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] px-3 py-2 text-[10px] font-semibold text-[var(--color-ink)] shadow-sm">
                                        <img
                                            src="/images/learnhub-dashboard/imgContainer.svg"
                                            alt=""
                                            className="h-3.5 w-3.5 object-contain"
                                        />
                                        Streak {dashboard.streakDays} Hari
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] px-3 py-2 text-[10px] font-semibold text-[var(--color-ink)] shadow-sm">
                                        <img
                                            src="/images/learnhub-dashboard/imgContainer1.svg"
                                            alt=""
                                            className="h-3.5 w-3.5 object-contain"
                                        />
                                        {dashboard.experiencePoints} XP
                                    </span>
                                </div>
                            </div>

                            <WelcomeHero
                                title={dashboard.welcomeTitle}
                                description={dashboard.welcomeDescription}
                            />
                        </section>

                        <ContinueLearningCard {...dashboard.resume} />

                        <section
                            id="materials"
                            aria-labelledby="materials-title"
                        >
                            <SectionHeading
                                id="materials-title"
                                title="Jelajahi Materi"
                                icon="imgContainer8.svg"
                                detail={`${dashboard.courses.length} MATA KULIAH TERDAFTAR`}
                            />

                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                    {filteredCourses.map((course) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            isBookmarked={bookmarkedCourseIds.includes(
                                                course.id,
                                            )}
                                            onBookmarkToggle={toggleBookmark}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p
                                    role="status"
                                    className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-10 text-center text-sm text-[var(--color-muted)]"
                                >
                                    Tidak ada materi yang cocok dengan pencarian
                                    tersebut.
                                </p>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
