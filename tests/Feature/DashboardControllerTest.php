<?php

namespace Tests\Feature;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirect(route('login'));
    }

    public function test_verified_user_receives_dashboard_page_and_dummy_data(): void
    {
        $user = new User;
        $user->name = 'Nadia Mahasiswa';
        $user->email = 'nadia@example.test';
        $user->email_verified_at = now();

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('auth.user.name', 'Nadia Mahasiswa')
                ->where('dashboard.semester', 'Semester Ganjil 2026/2027')
                ->where('dashboard.streakDays', 4)
                ->where('dashboard.experiencePoints', 450)
                ->where('dashboard.resume.courseTitle', 'Pemrograman Dasar')
                ->has('dashboard.courses', 3)
                ->where('dashboard.courses.0.status', 'completed')
                ->where('dashboard.courses.1.status', 'in_progress')
                ->where('dashboard.courses.2.status', 'locked'));
    }

}
