<?php

namespace App\Http\Controllers;

use App\LearningContent;
use App\LearningCurriculum;
use App\LearningProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function __invoke(Request $request, string $lesson): Response
    {
        $lessons = LearningCurriculum::lessons();
        abort_unless(isset($lessons[$lesson]), 404);

        $navigation = $lessons[$lesson];
        $progress = new LearningProgress($request->user());

        abort_unless($progress->isStageUnlocked($navigation['stage']), 403);

        $content = LearningContent::modules()[$lesson];
        $stageDefinition = LearningCurriculum::stages()[$navigation['stage']];
        $status = $progress->stageStatuses()[$navigation['stage']];

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
                'completed' => $progress->isModuleCompleted($lesson),
                'stageStatus' => $status,
                'previousLesson' => $navigation['previousLesson'],
                'nextLesson' => $navigation['nextLesson'],
            ],
        ]);
    }

    public function complete(Request $request, string $lesson): RedirectResponse
    {
        $lessons = LearningCurriculum::lessons();
        abort_unless(isset($lessons[$lesson]), 404);

        $progress = new LearningProgress($request->user());
        abort_unless($progress->isStageUnlocked($lessons[$lesson]['stage']), 403);

        $progress->markModuleCompleted($lesson);

        return redirect()->route('lessons.show', ['lesson' => $lesson]);
    }
}
