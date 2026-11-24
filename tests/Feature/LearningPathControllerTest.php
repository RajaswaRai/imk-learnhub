<?php

namespace Tests\Feature;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LearningPathControllerTest extends TestCase
{
    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $response = $this->get(route('learning-path.show'));

        $response->assertRedirect(route('login'));
    }

    public function test_verified_user_receives_learning_path_page_and_stages(): void
    {
        $user = User::factory()->make();

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
}
