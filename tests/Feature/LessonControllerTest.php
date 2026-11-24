<?php

namespace Tests\Feature;

use App\LearningCurriculum;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class LessonControllerTest extends TestCase
{
    public function test_verified_user_receives_lesson_and_quiz_data(): void
    {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->get(route('lessons.show', ['lesson' => '2.2']));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('LessonDetail')
                ->where('auth.user.name', $user->name)
                ->where('lesson.id', '2.2')
                ->where('lesson.position', 2)
                ->where('lesson.session', 4)
                ->has('lesson.objectives')
                ->has('lesson.content')
                ->has('lesson.keyPoints'));
    }

    public function test_every_lesson_renders_block_content(): void
    {
        $user = User::factory()->make();

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

    public function test_unknown_lesson_is_not_found(): void
    {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->get('/lessons/2.4');

        $response->assertNotFound();
    }

    public static function lessonNavigationBoundaries(): array
    {
        return [
            'first lesson' => ['2.1', null, '2.2'],
            'last lesson' => ['2.2', '2.1', null],
        ];
    }

    #[DataProvider('lessonNavigationBoundaries')]
    public function test_first_and_last_lessons_only_link_to_available_neighbors(
        string $lesson,
        ?string $previousLesson,
        ?string $nextLesson,
    ): void {
        $user = User::factory()->make();

        $response = $this->actingAs($user)->get(route('lessons.show', ['lesson' => $lesson]));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('lesson.id', $lesson)
                ->where('lesson.previousLesson', $previousLesson)
                ->where('lesson.nextLesson', $nextLesson));
    }
}
