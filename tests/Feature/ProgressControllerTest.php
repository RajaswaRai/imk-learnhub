<?php

namespace Tests\Feature;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProgressControllerTest extends TestCase
{
    public function test_verified_user_receives_progress_analytics_and_activity_data(): void
    {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->get(route('progress.index'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Progress')
                ->where('auth.user.name', $user->name)
                ->where('progress.completionPercentage', 40)
                ->where('progress.averageScore', 92)
                ->where('progress.courseProgressPercentage', 62)
                ->has('modules', 8));
    }
}
