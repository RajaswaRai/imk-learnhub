<?php

namespace Tests\Feature;

use App\Models\ModuleProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class QuizControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_verified_user_receives_quiz_without_answer_keys(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('quizzes.show', ['stage' => 1]));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Quiz')
                ->where('quiz.questionCount', 5)
                ->where('quiz.passingScore', 80)
                ->where('quiz.timeLimitMinutes', 10)
                ->has('quiz.topics', 5)
                ->has('quiz.questions', 5)
                ->has('quiz.questions.0.options', 4)
                ->has('quiz.questions.0.topic')
                ->missing('quiz.questions.0.correct_option')
                ->missing('quiz.questions.0.explanation'));
    }

    public function test_locked_stage_quiz_is_forbidden(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('quizzes.show', ['stage' => 2]))->assertForbidden();
    }

    public function test_quiz_submit_calculates_score_and_persists_attempt(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), [
            'answers' => [
                'Q-ST01-01' => 'B',
                'Q-ST01-02' => 'C',
                'Q-ST01-03' => 'B',
                'Q-ST01-04' => 'C',
                'Q-ST01-05' => 'A',
            ],
        ]);

        $response->assertRedirect(route('quizzes.show', ['stage' => 1]));
        $response->assertSessionHas('quiz_result');

        $this->assertDatabaseHas('quiz_attempts', [
            'user_id' => $user->id,
            'stage' => 1,
            'score' => 100,
            'correct_count' => 5,
            'passed' => true,
        ]);

        $this->actingAs($user)
            ->get(route('quizzes.review', ['stage' => 1]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('QuizReview')
                ->where('attempt.score', 100)
                ->where('attempt.correct_count', 5)
                ->where('attempt.passed', true)
                ->where('attempt.stageCompleted', false)
                ->has('attempt.review', 5));
    }

    public function test_stage_becomes_completed_only_after_modules_and_passing_quiz(): void
    {
        $user = User::factory()->create();

        foreach (['1.1', '1.2'] as $moduleId) {
            ModuleProgress::query()->create([
                'user_id' => $user->id,
                'module_id' => $moduleId,
                'completed_at' => now(),
            ]);
        }

        $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), [
            'answers' => [
                'Q-ST01-01' => 'B',
                'Q-ST01-02' => 'C',
                'Q-ST01-03' => 'B',
                'Q-ST01-04' => 'C',
                'Q-ST01-05' => 'A',
            ],
        ]);

        $this->actingAs($user)
            ->get(route('quizzes.review', ['stage' => 1]))
            ->assertInertia(fn (Assert $page) => $page->where('attempt.stageCompleted', true));

        $this->actingAs($user)->get(route('quizzes.show', ['stage' => 2]))->assertOk();
    }

    public function test_quiz_submit_scores_partial_answers_when_timer_expires(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), [
            'answers' => [
                'Q-ST01-01' => 'B',
                'Q-ST01-02' => 'C',
                'Q-ST01-03' => 'A',
            ],
        ]);

        $response->assertRedirect(route('quizzes.show', ['stage' => 1]));

        $this->actingAs($user)
            ->get(route('quizzes.review', ['stage' => 1]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('QuizReview')
                ->where('attempt.correct_count', 2)
                ->where('attempt.passed', false));
    }

    public function test_quiz_submit_requires_answers_payload(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), []);

        $response->assertSessionHasErrors('answers');
    }

    public function test_review_is_available_after_attempt_and_shows_latest_answers(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('quizzes.submit', ['stage' => 1]), [
            'answers' => [
                'Q-ST01-01' => 'B',
                'Q-ST01-02' => 'C',
                'Q-ST01-03' => 'B',
                'Q-ST01-04' => 'C',
                'Q-ST01-05' => 'A',
            ],
        ]);

        // Meninjau kembali kapan saja dari halaman Learning Path.
        $this->actingAs($user)
            ->get(route('learning-path.show'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('stages.0.topics.2.kind', 'latihan')
                ->where('stages.0.topics.2.hasAttempt', true));

        $this->actingAs($user)
            ->get(route('quizzes.review', ['stage' => 1]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('QuizReview')
                ->where('attempt.review.0.selected_option', 'B'));
    }

    public function test_review_is_not_available_before_any_attempt(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('quizzes.review', ['stage' => 1]))->assertNotFound();
    }
}
