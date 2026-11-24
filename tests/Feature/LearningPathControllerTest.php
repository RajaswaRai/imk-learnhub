<?php

namespace Tests\Feature;

use App\Models\ModuleProgress;
use App\Models\QuizAttempt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LearningPathControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $response = $this->get(route('learning-path.show'));

        $response->assertRedirect(route('login'));
    }

    public function test_verified_user_receives_learning_path_page_and_stages(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('learning-path.show'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('LearningPath')
                ->where('auth.user.name', $user->name)
                ->where('course.name', 'Pemrograman Dasar')
                ->where('course.currentStage', 1)
                ->has('stages', 8)
                ->where('stages.0.status', 'active')
                ->where('stages.1.status', 'locked'));
    }

    public function test_next_stage_unlocks_after_previous_stage_is_completed(): void
    {
        $user = User::factory()->create();

        foreach (['1.1', '1.2'] as $moduleId) {
            ModuleProgress::query()->create([
                'user_id' => $user->id,
                'module_id' => $moduleId,
                'completed_at' => now(),
            ]);
        }

        QuizAttempt::query()->create([
            'user_id' => $user->id,
            'stage' => 1,
            'score' => 100,
            'correct_count' => 5,
            'passed' => true,
            'answers' => [],
            'submitted_at' => now(),
        ]);

        $response = $this->actingAs($user)->get(route('learning-path.show'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('stages.0.status', 'completed')
                ->where('stages.1.status', 'active')
                ->where('stages.2.status', 'locked')
                ->where('course.completedStages', 1));
    }
}
