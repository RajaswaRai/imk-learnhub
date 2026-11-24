<?php

namespace App\Http\Controllers;

use App\LearningContent;
use App\LearningCurriculum;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function __invoke(string $lesson): Response
    {
        $lessons = LearningCurriculum::lessons();
        abort_unless(isset($lessons[$lesson]), 404);

        $navigation = $lessons[$lesson];
        $content = LearningContent::modules()[$lesson];
        $stageDefinition = LearningCurriculum::stages()[$navigation['stage']];

        return Inertia::render('LessonDetail', [
            'semester' => 'Semester Ganjil 2026/2027',
            'lesson' => [
                'id' => $lesson,
                'courseName' => 'Pemrograman Dasar',
                'stage' => $navigation['stage'],
                'stageTitle' => $stageDefinition['title'],
                'session' => $navigation['session'],
                'position' => $navigation['position'],
                'totalTopics' => 2,
                'title' => $content['title'],
                'objective' => $content['objective'],
                'objectives' => $content['objectives'],
                'readMinutes' => $content['minutes'],
                'content' => $content['content'],
                'keyPoints' => $content['key_points'],
                'mentorTip' => $content['tip'],
                'summary' => $content['summary'],
                'previousLesson' => $navigation['previousLesson'],
                'nextLesson' => $navigation['nextLesson'],
            ],
        ]);
    }
}
