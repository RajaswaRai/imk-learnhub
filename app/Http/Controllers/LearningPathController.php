<?php

namespace App\Http\Controllers;

use App\LearningCurriculum;
use Inertia\Inertia;
use Inertia\Response;

class LearningPathController extends Controller
{
    public function __invoke(): Response
    {
        $stageDefinitions = LearningCurriculum::stages();
        $stages = [];
        foreach ($stageDefinitions as $number => $definition) {
            $status = $number === 1 ? 'active' : 'locked';
            $topics = [];
            for ($position = 1; $position <= 2; $position++) {
                $lesson = LearningCurriculum::lessons()[$number.'.'.$position];
                $topics[] = [
                    'code' => $number.'.'.$position,
                    'title' => $lesson['title'],
                    'note' => 'Sesi RPS '.$lesson['session'],
                    'progress' => 0,
                    'status' => $status,
                    'duration' => $lesson['minutes'].' menit',
                    'kind' => 'materi',
                ];
            }
            $topics[] = [
                'code' => 'QUIZ-ST-'.$number,
                'title' => 'Kuis Stage '.$number,
                'note' => '5 soal pilihan ganda',
                'progress' => 0,
                'status' => $status,
                'duration' => 'Nilai lulus 80',
                'kind' => 'latihan',
            ];
            $stages[] = [
                'number' => $number,
                'title' => $definition['title'],
                'description' => $definition['description'],
                'status' => $status,
                'week' => $definition['sessions'],
                'xp' => $definition['xp'],
                'outcome' => $number === 4 || $number === 8 ? 'Review evaluasi RPS' : 'Materi dan kuis penguatan',
                'sessionMinutes' => 24,
                'completedTopics' => 0,
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
                'currentStage' => 1,
                'totalStages' => 8,
                'completedStages' => 0,
                'earnedXp' => 0,
                'totalXp' => 820,
                'remainingHours' => 16,
            ],
            'stages' => $stages,
        ]);
    }
}
