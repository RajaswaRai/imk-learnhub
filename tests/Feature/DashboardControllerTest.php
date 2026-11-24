<?php

namespace Tests\Feature;

use App\Models\ModuleProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirect(route('login'));
    }

    public function test_verified_user_receives_dashboard_with_real_progress(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('auth.user.name', $user->name)
                ->where('dashboard.semester', 'Semester Ganjil 2026/2027')
                ->where('dashboard.streakDays', 0)
                ->where('dashboard.experiencePoints', 0)
                ->where('dashboard.resume.courseTitle', 'Pemrograman Dasar')
                ->where('dashboard.resume.completedTopics', 0)
                ->where('dashboard.resume.totalTopics', 3)
                ->has('dashboard.courses', 8)
                ->where('dashboard.courses.0.status', 'in_progress')
                ->where('dashboard.courses.1.status', 'locked'));
    }

    public function test_dashboard_reflects_completed_modules(): void
    {
        $user = User::factory()->create();

        ModuleProgress::query()->create([
            'user_id' => $user->id,
            'module_id' => '1.1',
            'completed_at' => now(),
        ]);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('dashboard.streakDays', 1)
                ->where('dashboard.resume.completedTopics', 1)
                ->where('dashboard.courses.0.progressPercentage', 33));
    }
}
