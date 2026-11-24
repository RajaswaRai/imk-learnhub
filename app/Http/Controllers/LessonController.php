<?php

namespace App\Http\Controllers;

use App\LearningCurriculum;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function __invoke(string $lesson): Response
    {
        $lessons = LearningCurriculum::lessons();
        abort_unless(isset($lessons[$lesson]), 404);
        $lessonData = $lessons[$lesson];

        return Inertia::render('LessonDetail', [
            'semester' => 'Semester Ganjil 2026/2027',
            'lesson' => [
                'id' => $lessonData['id'],
                'courseName' => 'Pemrograman Dasar',
                'stage' => $lessonData['stage'],
                'title' => $lessonData['title'],
                'concepts' => array_map(static fn (string $text, int $index) => [
                    'type' => 'Konsep '.($index + 1),
                    'value' => $text,
                    'label' => 'RPS Sesi '.$lessonData['session'],
                    'tone' => $index % 2 === 0 ? 'mint' : 'amber',
                ], $lessonData['concepts'], array_keys($lessonData['concepts'])),
                'mentorTip' => $lessonData['tip'],
                'codeTitle' => 'Pseudocode / Catatan',
                'runtime' => 'Contoh bacaan statis',
                'code' => "MULAI\n  Baca konsep modul\n  Hubungkan konsep dengan masalah\n  Tinjau rangkuman\nSELESAI",
                'output' => null,
                'question' => null,
                'choices' => [],
                'correctChoice' => null,
                'previousLesson' => $lessonData['previousLesson'],
                'nextLesson' => $lessonData['nextLesson'],
                'summary' => $lessonData['summary'],
            ],
        ]);
    }
}
