<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        // TODO: Replace this demo dashboard payload with Eloquent queries.
        return Inertia::render('Dashboard', [
            'dashboard' => [
                'semester' => 'Semester Ganjil 2026/2027',
                'headerSemester' => 'Semester Ganjil 2024/2025',
                'streakDays' => 4,
                'experiencePoints' => 450,
                'welcomeTitle' => 'Belajar selangkah demi selangkah',
                'welcomeDescription' => 'lorem ipsum',
                'resume' => [
                    'courseTitle' => 'Pemrograman Dasar',
                    'stageTitle' => 'Stage 2: Variabel & Tipe Data',
                    'estimatedMinutes' => 15,
                    'completedTopics' => 3,
                    'totalTopics' => 5,
                    'progressPercentage' => 65,
                ],
                'courses' => [
                    [
                        'id' => 'pemrograman-dasar-3',
                        'courseLabel' => 'Pemrograman Dasar',
                        'meetingNumber' => 3,
                        'title' => 'judul',
                        'description' => 'lorem ipsum',
                        'status' => 'completed',
                        'estimatedMinutes' => 20,
                        'submoduleCount' => 4,
                        'progressPercentage' => null,
                        'artwork' => 'coding',
                        'isBookmarked' => true,
                    ],
                    [
                        'id' => 'pemrograman-dasar-4',
                        'courseLabel' => 'Pemrograman Dasar',
                        'meetingNumber' => 4,
                        'title' => 'judul',
                        'description' => 'lorem ipsum',
                        'status' => 'in_progress',
                        'estimatedMinutes' => 35,
                        'submoduleCount' => null,
                        'progressPercentage' => 45,
                        'artwork' => 'logic',
                        'isBookmarked' => true,
                    ],
                    [
                        'id' => 'pemrograman-dasar-5',
                        'courseLabel' => 'Pemrograman Dasar',
                        'meetingNumber' => 5,
                        'title' => 'judul',
                        'description' => 'lorem ipsum',
                        'status' => 'locked',
                        'estimatedMinutes' => null,
                        'submoduleCount' => null,
                        'progressPercentage' => null,
                        'artwork' => 'loop',
                        'isBookmarked' => true,
                    ],
                ],
            ],
        ]);
    }
}
