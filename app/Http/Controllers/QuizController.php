<?php

namespace App\Http\Controllers;

use App\LearningContent;
use App\LearningCurriculum;
use App\LearningProgress;
use App\Models\QuizAttempt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function show(Request $request, int $stage): Response
    {
        abort_unless($stage >= 1 && $stage <= 8, 404);
        $quiz = LearningCurriculum::quiz($stage);
        abort_unless($quiz !== null, 404);

        $progress = new LearningProgress($request->user());
        abort_unless($progress->isStageUnlocked($stage), 403);

        $meta = LearningContent::quizzes()[$stage];
        $questions = array_map(static function (array $question, int $index) use ($meta): array {
            return [
                'question_id' => $question['question_id'],
                'question' => $question['question'],
                'topic' => $meta['topics'][$index] ?? null,
                'options' => array_map(
                    static fn (string $text, string $id): array => ['option_id' => $id, 'text' => $text],
                    array_values($question['options']),
                    array_keys($question['options']),
                ),
                'points' => $question['points'],
                'order_index' => $index + 1,
            ];
        }, $quiz, array_keys($quiz));

        return Inertia::render('Quiz', [
            'semester' => 'Semester Ganjil 2026/2027',
            'quiz' => [
                'stage' => $stage,
                'title' => 'Kuis Evaluasi Stage '.$stage,
                'description' => $meta['description'],
                'tip' => $meta['tip'],
                'topics' => $meta['topics'],
                'timeLimitMinutes' => $meta['time_limit_minutes'],
                'questionCount' => count($questions),
                'passingScore' => LearningProgress::PASSING_SCORE,
                'pointsPerQuestion' => 20,
                'passingCorrectCount' => 4,
                'bestScore' => $progress->bestScoreFor($stage),
                'passed' => $progress->hasPassedStage($stage),
                'questions' => $questions,
            ],
        ]);
    }

    public function submit(Request $request, int $stage): RedirectResponse
    {
        abort_unless($stage >= 1 && $stage <= 8, 404);
        $quiz = LearningCurriculum::quiz($stage);
        abort_unless($quiz !== null, 404);

        $progress = new LearningProgress($request->user());
        abort_unless($progress->isStageUnlocked($stage), 403);

        $validated = $request->validate([
            'answers' => ['present', 'array'],
            'answers.*' => ['string', 'regex:/^[A-D]$/'],
        ]);

        $correctCount = 0;
        foreach ($quiz as $question) {
            $selected = $validated['answers'][$question['question_id']] ?? null;
            $correctCount += $selected === $question['correct_option'] ? 1 : 0;
        }

        $score = $correctCount * 20;

        $attempt = QuizAttempt::query()->create([
            'user_id' => $request->user()->id,
            'stage' => $stage,
            'score' => $score,
            'correct_count' => $correctCount,
            'passed' => $score >= LearningProgress::PASSING_SCORE,
            'answers' => $validated['answers'],
            'submitted_at' => now(),
        ]);

        return redirect()->route('quizzes.show', ['stage' => $stage])
            ->with('quiz_result', [
                'stage' => $stage,
                'score' => $attempt->score,
                'correct_count' => $correctCount,
                'total_questions' => count($quiz),
                'passed' => $attempt->passed,
                'stage_completed' => $progress->stageStatuses()[$stage] === 'completed',
                'next_stage' => $stage < 8 ? $stage + 1 : null,
                'xp_earned' => $attempt->passed ? LearningCurriculum::stages()[$stage]['xp'] : 0,
                'review_url' => route('quizzes.review', ['stage' => $stage], false),
            ]);
    }

    public function review(Request $request, int $stage): Response
    {
        abort_unless($stage >= 1 && $stage <= 8, 404);
        $quiz = LearningCurriculum::quiz($stage);
        abort_unless($quiz !== null, 404);

        $progress = new LearningProgress($request->user());
        abort_unless($progress->isStageUnlocked($stage), 403);

        $attempt = QuizAttempt::query()
            ->where('user_id', $request->user()->id)
            ->where('stage', $stage)
            ->orderByDesc('submitted_at')
            ->orderByDesc('id')
            ->first();

        abort_unless($attempt !== null, 404);

        $answers = $attempt->answers;
        $review = [];
        $correctCount = 0;

        foreach ($quiz as $question) {
            $selected = $answers[$question['question_id']] ?? null;
            $isCorrect = $selected === $question['correct_option'];
            $correctCount += $isCorrect ? 1 : 0;

            $review[] = [
                'question_id' => $question['question_id'],
                'question' => $question['question'],
                'options' => $question['options'],
                'selected_option' => $selected,
                'correct_option' => $question['correct_option'],
                'explanation' => $question['explanation'],
                'is_correct' => $isCorrect,
            ];
        }

        return Inertia::render('QuizReview', [
            'semester' => 'Semester Ganjil 2026/2027',
            'attempt' => [
                'attempt_id' => (string) $attempt->id,
                'stage' => $stage,
                'score' => $attempt->score,
                'correct_count' => $correctCount,
                'wrong_count' => count($quiz) - $correctCount,
                'passed' => $attempt->passed,
                'submitted_at' => $attempt->submitted_at->toIso8601String(),
                'stageCompleted' => $progress->stageStatuses()[$stage] === 'completed',
                'review' => $review,
            ],
        ]);
    }
}
