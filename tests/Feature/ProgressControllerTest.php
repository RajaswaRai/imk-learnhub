<?php

namespace Tests\Feature;

use App\Models\ModuleProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProgressControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_verified_user_receives_progress_analytics_and_activity_data(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('progress.index'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Progress')
                ->where('auth.user.name', $user->name)
                ->where('progress.completedMaterials', 0)
                ->where('progress.totalMaterials', 16)
                ->where('progress.completionPercentage', 0)
                ->where('progress.completedStages', 0)
                ->has('modules', 8));
    }

    public function test_progress_reflects_completed_modules(): void
    {
        $user = User::factory()->create();

        ModuleProgress::query()->create([
            'user_id' => $user->id,
            'module_id' => '1.1',
            'completed_at' => now(),
        ]);

        $this->actingAs($user)
            ->get(route('progress.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('progress.completedMaterials', 1)
                ->where('progress.completionPercentage', 6));
    }
}
