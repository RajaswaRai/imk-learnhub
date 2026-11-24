<?php

namespace App\Http\Controllers;

use App\LearningCurriculum;
use App\LearningProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProgressController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $progress = new LearningProgress($request->user());
        $stages = LearningCurriculum::stages();
        $lessons = LearningCurriculum::lessons();
        $stageStatuses = $progress->stageStatuses();

        $totalMaterials = count($lessons);
        $completedMaterials = count($progress->completedModuleIds());
        $completedStages = count(array_filter(
            $stageStatuses,
            static fn (string $status): bool => $status === 'completed'
        ));
        $totalStages = count($stages);
        $passedStages = $progress->passedStages();
        $completedQuizzes = count($passedStages);

        $scores = array_filter(
            array_map(fn (int $stage): ?int => $progress->bestScoreFor($stage), array_keys($stages)),
            static fn (?int $score): bool => $score !== null,
        );
        $averageScore = $scores === [] ? 0 : (int) round(array_sum($scores) / count($scores));

        $completionPercentage = $totalMaterials === 0
            ? 0
            : (int) round(($completedMaterials / $totalMaterials) * 100);

        $courseProgressPercentage = $totalStages === 0
            ? 0
            : (int) round(($completedStages / $totalStages) * 100);

        $currentStage = 1;
        foreach ($stageStatuses as $number => $status) {
            if ($status === 'active') {
                $currentStage = $number;
                break;
            }
        }

        $stageDefinition = $stages[$currentStage];
        $firstModule = $lessons[$currentStage.'.1'];

        return Inertia::render('Progress', [
            'semester' => 'Semester Ganjil 2026/2027',
            'progress' => [
                'completionPercentage' => $completionPercentage,
                'completedMaterials' => $completedMaterials,
                'totalMaterials' => $totalMaterials,
                'completedQuizzes' => $completedQuizzes,
                'pendingQuizzes' => $totalStages - $completedQuizzes,
                'averageScore' => $averageScore,
                'completedStages' => $completedStages,
                'totalStages' => $totalStages,
                'courseProgressPercentage' => $courseProgressPercentage,
                'courseName' => 'Pemrograman Dasar',
                'courseCode' => 'IF25101',
                'credits' => 4,
                'scheduleStatus' => 'Sesuai RPS',
            ],
            'nextMilestone' => [
                'courseName' => 'PEMROGRAMAN DASAR • STAGE '.$currentStage,
                'title' => $stageDefinition['title'],
                'description' => $firstModule['title'],
                'dueInDays' => 7,
                'lessonId' => $currentStage.'.1',
            ],
            'modules' => array_map(
                static fn (int $number, string $status): array => [
                    'label' => 'ST-'.str_pad((string) $number, 2, '0', STR_PAD_LEFT),
                    'status' => $status,
                ],
                array_keys($stageStatuses),
                array_values($stageStatuses),
            ),
        ]);
    }
}
