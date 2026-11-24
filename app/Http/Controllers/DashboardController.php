<?php

namespace App\Http\Controllers;

use App\LearningCurriculum;
use App\LearningProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $progress = new LearningProgress($request->user());
        $stages = LearningCurriculum::stages();
        $lessons = LearningCurriculum::lessons();
        $statuses = $progress->stageStatuses();

        $currentStage = 1;
        foreach ($statuses as $number => $status) {
            if ($status === 'active') {
                $currentStage = $number;
                break;
            }
        }

        $stageLessonIds = collect($lessons)
            ->keys()
            ->filter(fn (string $id): bool => str_starts_with($id, $currentStage.'.'))
            ->values();

        $completedInStage = $stageLessonIds
            ->filter(fn (string $id): bool => $progress->isModuleCompleted($id))
            ->count();

        $quizPassed = $progress->hasPassedStage($currentStage);
        $completedTopics = $completedInStage + ($quizPassed ? 1 : 0);
        $totalTopics = $stageLessonIds->count() + 1;
        $stageMinutes = $stageLessonIds->sum(fn (string $id): int => $lessons[$id]['minutes']);

        $artworkCycle = ['coding', 'logic', 'loop'];

        $courses = [];
        foreach ($stages as $number => $definition) {
            $status = match ($statuses[$number]) {
                'completed' => 'completed',
                'active' => 'in_progress',
                default => 'locked',
            };

            $completedModules = $progress->completedModulesInStage($number);
            $stageTotal = collect($lessons)
                ->keys()
                ->filter(fn (string $id): bool => str_starts_with($id, $number.'.'))
                ->count() + 1;

            $courses[] = [
                'id' => 'stage-'.$number,
                'courseLabel' => 'Pemrograman Dasar',
                'meetingNumber' => $number,
                'title' => 'Stage '.$number.': '.$definition['title'],
                'description' => $definition['description'],
                'status' => $status,
                'estimatedMinutes' => $status === 'locked' ? null : (int) ceil($stageMinutes),
                'submoduleCount' => $status === 'completed' ? $stageTotal : null,
                'progressPercentage' => $status === 'in_progress'
                    ? (int) round(($completedModules / max($stageTotal, 1)) * 100)
                    : null,
                'artwork' => $artworkCycle[($number - 1) % count($artworkCycle)],
                'isBookmarked' => false,
            ];
        }

        return Inertia::render('Dashboard', [
            'dashboard' => [
                'semester' => 'Semester Ganjil 2026/2027',
                'headerSemester' => 'Semester Ganjil 2026/2027',
                'streakDays' => $progress->streakDays(),
                'experiencePoints' => $progress->earnedXp(),
                'welcomeTitle' => 'Belajar selangkah demi selangkah',
                'welcomeDescription' => 'Lanjutkan perjalanan belajarmu di modul Pemrograman Dasar.',
                'resume' => [
                    'courseTitle' => 'Pemrograman Dasar',
                    'stageTitle' => 'Stage '.$currentStage.': '.$stages[$currentStage]['title'],
                    'estimatedMinutes' => (int) ceil($stageMinutes),
                    'completedTopics' => $completedTopics,
                    'totalTopics' => $totalTopics,
                    'progressPercentage' => (int) round(($completedTopics / max($totalTopics, 1)) * 100),
                ],
                'courses' => $courses,
            ],
        ]);
    }
}
