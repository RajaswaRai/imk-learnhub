<?php

namespace Tests\Feature;

use App\LearningCurriculum;
use App\Models\ModuleProgress;
use App\Models\QuizAttempt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class LessonControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_verified_user_receives_lesson_and_quiz_data(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('lessons.show', ['lesson' => '1.2']));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('LessonDetail')
                ->where('auth.user.name', $user->name)
                ->where('lesson.id', '1.2')
                ->where('lesson.position', 2)
                ->where('lesson.session', 2)
                ->has('lesson.objectives')
                ->has('lesson.content')
                ->has('lesson.keyPoints'));
    }

    public function test_every_lesson_renders_block_content_for_unlocked_path(): void
    {
        $user = User::factory()->create();

        // Unlock every stage by completing all modules and passing all quizzes.
        $this->completeEntireCurriculum($user);

        foreach (array_keys(LearningCurriculum::lessons()) as $id) {
            $this->actingAs($user)
                ->get(route('lessons.show', ['lesson' => $id]))
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component('LessonDetail')
                    ->where('lesson.id', $id)
                    ->has('lesson.content'));
        }
    }

    public function test_locked_stage_lesson_is_forbidden(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('lessons.show', ['lesson' => '2.1']))->assertForbidden();
    }

    public function test_unknown_lesson_is_not_found(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/lessons/2.4');

        $response->assertNotFound();
    }

    public function test_completing_a_lesson_persists_progress(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('lessons.complete', ['lesson' => '1.1']))
            ->assertRedirect(route('lessons.show', ['lesson' => '1.1']));

        $this->assertDatabaseHas('module_progress', [
            'user_id' => $user->id,
            'module_id' => '1.1',
        ]);

        $this->actingAs($user)
            ->get(route('lessons.show', ['lesson' => '1.1']))
            ->assertInertia(fn (Assert $page) => $page->where('lesson.completed', true));
    }

    public static function lessonNavigationBoundaries(): array
    {
        return [
            'first lesson' => ['1.1', null, '1.2'],
            'last lesson' => ['1.2', '1.1', null],
        ];
    }

    #[DataProvider('lessonNavigationBoundaries')]
    public function test_first_and_last_lessons_only_link_to_available_neighbors(
        string $lesson,
        ?string $previousLesson,
        ?string $nextLesson,
    ): void {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('lessons.show', ['lesson' => $lesson]));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('lesson.id', $lesson)
                ->where('lesson.previousLesson', $previousLesson)
                ->where('lesson.nextLesson', $nextLesson));
    }

    private function completeEntireCurriculum(User $user): void
    {
        foreach (array_keys(LearningCurriculum::lessons()) as $id) {
            ModuleProgress::query()->create([
                'user_id' => $user->id,
                'module_id' => $id,
                'completed_at' => now(),
            ]);
        }

        foreach (array_keys(LearningCurriculum::stages()) as $stage) {
            QuizAttempt::query()->create([
                'user_id' => $user->id,
                'stage' => $stage,
                'score' => 100,
                'correct_count' => 5,
                'passed' => true,
                'answers' => [],
                'submitted_at' => now(),
            ]);
        }
    }
}
