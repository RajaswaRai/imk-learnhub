<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProgressController extends Controller
{
    public function __invoke(): Response
    {
        // TODO: Replace this demo progress data with Eloquent queries.
        return Inertia::render('Progress', [
            'semester' => 'Semester Ganjil 2024/2025',
            'progress' => [
                'completionPercentage' => 40,
                'completedMaterials' => 10,
                'totalMaterials' => 25,
                'completedQuizzes' => 8,
                'pendingQuizzes' => 1,
                'averageScore' => 92,
                'completedStages' => 5,
                'totalStages' => 8,
                'courseProgressPercentage' => 62,
                'courseName' => 'Pemrograman Dasar',
                'courseCode' => 'IF101',
                'credits' => 3,
                'scheduleStatus' => 'Tepat Waktu',
            ],
            'nextMilestone' => [
                'courseName' => 'PEMROGRAMAN DASAR • MODUL 6',
                'title' => 'judul',
                'description' => 'lorem ipsum',
                'dueInDays' => 2,
            ],
            'modules' => [
                ['label' => 'M-01', 'status' => 'completed'],
                ['label' => 'M-02', 'status' => 'completed'],
                ['label' => 'M-03', 'status' => 'completed'],
                ['label' => 'M-04', 'status' => 'completed'],
                ['label' => 'M-05', 'status' => 'completed'],
                ['label' => 'M-06', 'status' => 'active'],
                ['label' => 'M-07', 'status' => 'locked'],
                ['label' => 'M-08', 'status' => 'locked'],
            ],
        ]);
    }
}
