<?php

namespace App\Http\Controllers;

use App\LearningCurriculum;
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

        $questions = array_map(static function (array $question): array {
            return [
                'question_id' => $question['question_id'],
                'question' => $question['question'],
                'options' => array_map(
                    static fn (string $text, string $id): array => ['option_id' => $id, 'text' => $text],
                    array_values($question['options']),
                    array_keys($question['options']),
                ),
                'points' => $question['points'],
                'order_index' => (int) substr($question['question_id'], -1),
            ];
        }, $quiz);

        return Inertia::render('Quiz', [
            'semester' => 'Semester Ganjil 2026/2027',
            'quiz' => [
                'stage' => $stage,
                'title' => 'Kuis Stage '.$stage,
                'description' => LearningCurriculum::stages()[$stage]['title'],
                'questionCount' => count($questions),
                'passingScore' => 80,
                'questions' => $questions,
            ],
        ]);
    }

    public function submit(Request $request, int $stage): RedirectResponse
    {
        abort_unless($stage >= 1 && $stage <= 8, 404);
        $quiz = LearningCurriculum::quiz($stage);
        abort_unless($quiz !== null, 404);

        $validated = $request->validate([
            'answers' => ['required', 'array', 'size:5'],
            'answers.*' => ['required', 'string', 'regex:/^[A-D]$/'],
        ]);

        $correctCount = 0;
        $review = [];
        foreach ($quiz as $question) {
            $selected = $validated['answers'][$question['question_id']] ?? null;
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

        $score = $correctCount * 20;
        $attempt = [
            'attempt_id' => (string) str()->uuid(),
            'stage' => $stage,
            'score' => $score,
            'correct_count' => $correctCount,
            'wrong_count' => 5 - $correctCount,
            'passed' => $score >= 80,
            'submitted_at' => now()->toIso8601String(),
            'review' => $review,
        ];
        $request->session()->put('quiz_attempt_'.$stage, $attempt);

        return redirect()->route('quizzes.review', ['stage' => $stage]);
    }

    public function review(Request $request, int $stage): Response
    {
        abort_unless($stage >= 1 && $stage <= 8, 404);
        $attempt = $request->session()->get('quiz_attempt_'.$stage);
        abort_unless(is_array($attempt) && $attempt['stage'] === $stage, 404);

        return Inertia::render('QuizReview', [
            'semester' => 'Semester Ganjil 2026/2027',
            'attempt' => $attempt,
        ]);
    }
}
