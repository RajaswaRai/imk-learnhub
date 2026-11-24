<?php

namespace App\Http\Controllers;

use App\LearningCurriculum;
use App\LearningProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearningPathController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $progress = new LearningProgress($request->user());
        $stageDefinitions = LearningCurriculum::stages();
        $stageStatuses = $progress->stageStatuses();
        $lessons = LearningCurriculum::lessons();

        $stages = [];
        $completedStages = 0;
        $earnedXp = 0;
        $totalXp = 0;
        $currentStage = 1;

        foreach ($stageDefinitions as $number => $definition) {
            $status = $stageStatuses[$number];
            $totalXp += $definition['xp'];

            if ($status === 'completed') {
                $completedStages++;
                $earnedXp += $definition['xp'];
            } elseif ($status === 'active') {
                $currentStage = $number;
            }

            $topics = [];
            for ($position = 1; $position <= 2; $position++) {
                $lesson = $lessons[$number.'.'.$position];
                $isCompleted = $progress->isModuleCompleted($number.'.'.$position);

                $topics[] = [
                    'code' => $number.'.'.$position,
                    'title' => $lesson['title'],
                    'note' => 'Sesi RPS '.$lesson['session'],
                    'progress' => $isCompleted ? 100 : 0,
                    'status' => $isCompleted ? 'completed' : $status,
                    'duration' => $lesson['minutes'].' menit',
                    'kind' => 'materi',
                ];
            }

            $bestScore = $progress->bestScoreFor($number);
            $quizPassed = $progress->hasPassedStage($number);
            $hasAttempt = $progress->hasAttemptedStage($number);
            $topics[] = [
                'code' => 'QUIZ-ST-'.$number,
                'title' => 'Kuis Stage '.$number,
                'note' => '5 soal pilihan ganda',
                'progress' => $bestScore ?? 0,
                'status' => match (true) {
                    $quizPassed => 'completed',
                    $status === 'locked' => 'locked',
                    default => 'active',
                },
                'duration' => match (true) {
                    $bestScore === null => 'Nilai lulus 80',
                    $quizPassed => 'Skor '.$bestScore.' · Lulus',
                    default => 'Skor '.$bestScore,
                },
                'kind' => 'latihan',
                'hasAttempt' => $hasAttempt,
            ];

            $completedTopics = $progress->completedModulesInStage($number)
                + ($quizPassed ? 1 : 0);

            $stages[] = [
                'number' => $number,
                'title' => $definition['title'],
                'description' => $definition['description'],
                'status' => $status,
                'week' => $definition['sessions'],
                'xp' => $definition['xp'],
                'outcome' => $number === 4 || $number === 8 ? 'Review evaluasi RPS' : 'Materi dan kuis penguatan',
                'sessionMinutes' => $lessons[$number.'.1']['minutes'] + $lessons[$number.'.2']['minutes'],
                'completedTopics' => $completedTopics,
                'totalTopics' => 3,
                'topics' => $topics,
            ];
        }

        return Inertia::render('LearningPath', [
            'semester' => 'Semester Ganjil 2026/2027',
            'course' => [
                'name' => 'Pemrograman Dasar',
                'code' => 'IF25101',
                'credits' => 4,
                'semesterLabel' => 'RPS Semester 1',
                'currentStage' => $currentStage,
                'totalStages' => count($stageDefinitions),
                'completedStages' => $completedStages,
                'earnedXp' => $earnedXp,
                'totalXp' => $totalXp,
                'remainingHours' => (int) ceil(
                    collect($lessons)
                        ->reject(fn (array $lesson, string $id): bool => $progress->isModuleCompleted($id))
                        ->sum('minutes') / 60
                ),
            ],
            'stages' => $stages,
        ]);
    }
}
