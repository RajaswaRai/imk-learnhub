<?php

namespace Tests\Feature;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class QuizControllerTest extends TestCase
{
    public function test_verified_user_receives_quiz_without_answer_keys(): void
    {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->get(route('quizzes.show', ['stage' => 1]));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Quiz')
                ->has('quiz.questions', 5)
                ->has('quiz.questions.0.options', 4)
                ->missing('quiz.questions.0.correct_option')
                ->missing('quiz.questions.0.explanation'));
    }

    public function test_quiz_submit_calculates_score_and_review(): void
    {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), [
            'answers' => [
                'Q-ST01-01' => 'B',
                'Q-ST01-02' => 'C',
                'Q-ST01-03' => 'B',
                'Q-ST01-04' => 'C',
                'Q-ST01-05' => 'A',
            ],
        ]);

        $response->assertRedirect(route('quizzes.review', ['stage' => 1]));

        $reviewResponse = $this->actingAs($user)->get(route('quizzes.review', ['stage' => 1]));
        $reviewResponse
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('QuizReview')
                ->where('attempt.score', 100)
                ->where('attempt.correct_count', 5)
                ->where('attempt.passed', true)
                ->has('attempt.review', 5));
    }

    public function test_quiz_submit_requires_all_answers(): void
    {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), [
            'answers' => [],
        ]);

        $response->assertSessionHasErrors('answers');
    }
}
