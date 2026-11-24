<?php

namespace App;

use App\Models\ModuleProgress;
use App\Models\QuizAttempt;
use App\Models\User;
use Illuminate\Support\Collection;

class LearningProgress
{
    public const PASSING_SCORE = 80;

    public function __construct(private readonly User $user) {}

    /**
     * Resolve the display status of every stage for this user.
     *
     * @return array<int, 'completed'|'active'|'locked'>
     */
    public function stageStatuses(): array
    {
        $completedModules = $this->completedModuleIds();
        $passedStages = $this->passedStages();

        $statuses = [];
        $previousCompleted = true;

        foreach (array_keys(LearningCurriculum::stages()) as $stage) {
            $modulesCompleted = $this->stageModules($stage)->isEmpty()
                || $this->stageModules($stage)->every(
                    fn (string $module) => in_array($module, $completedModules, true)
                );

            $completed = $modulesCompleted && in_array($stage, $passedStages, true);
            $unlocked = $previousCompleted;

            $statuses[$stage] = match (true) {
                $completed => 'completed',
                $unlocked => 'active',
                default => 'locked',
            };

            $previousCompleted = $completed;
        }

        return $statuses;
    }

    /**
     * @return array<int, string>
     */
    public function completedModuleIds(): array
    {
        return ModuleProgress::query()
            ->where('user_id', $this->user->id)
            ->whereNotNull('completed_at')
            ->pluck('module_id')
            ->all();
    }

    /**
     * @return array<int, int>
     */
    public function passedStages(): array
    {
        return QuizAttempt::query()
            ->where('user_id', $this->user->id)
            ->where('passed', true)
            ->pluck('stage')
            ->unique()
            ->map(static fn (int $stage): int => $stage)
            ->all();
    }

    public function bestScoreFor(int $stage): ?int
    {
        $score = QuizAttempt::query()
            ->where('user_id', $this->user->id)
            ->where('stage', $stage)
            ->max('score');

        return $score === null ? null : (int) $score;
    }

    public function hasPassedStage(int $stage): bool
    {
        return in_array($stage, $this->passedStages(), true);
    }

    public function hasAttemptedStage(int $stage): bool
    {
        return QuizAttempt::query()
            ->where('user_id', $this->user->id)
            ->where('stage', $stage)
            ->exists();
    }

    public function isModuleCompleted(string $moduleId): bool
    {
        return in_array($moduleId, $this->completedModuleIds(), true);
    }

    public function markModuleCompleted(string $moduleId): void
    {
        ModuleProgress::query()->updateOrCreate(
            ['user_id' => $this->user->id, 'module_id' => $moduleId],
            ['completed_at' => now()],
        );
    }

    public function isStageUnlocked(int $stage): bool
    {
        return ($this->stageStatuses()[$stage] ?? 'locked') !== 'locked';
    }

    /**
     * Average of the best score achieved in each stage with an attempt.
     */
    public function averageScore(): int
    {
        $scores = collect(array_keys(LearningCurriculum::stages()))
            ->map(fn (int $stage): ?int => $this->bestScoreFor($stage))
            ->filter(static fn (?int $score): bool => $score !== null);

        return $scores->isEmpty() ? 0 : (int) round($scores->avg());
    }

    public function completedStagesCount(): int
    {
        return count(array_filter(
            $this->stageStatuses(),
            static fn (string $status): bool => $status === 'completed'
        ));
    }

    public function earnedXp(): int
    {
        $stages = LearningCurriculum::stages();
        $statuses = $this->stageStatuses();
        $earned = 0;

        foreach ($stages as $number => $definition) {
            if (($statuses[$number] ?? null) === 'completed') {
                $earned += $definition['xp'];
            }
        }

        return $earned;
    }

    public function totalXp(): int
    {
        return array_sum(array_column(LearningCurriculum::stages(), 'xp'));
    }

    /**
     * Consecutive days of meaningful activity ending today (or yesterday).
     */
    public function streakDays(): int
    {
        $dates = collect($this->completedModuleIds() === []
            ? []
            : ModuleProgress::query()
                ->where('user_id', $this->user->id)
                ->whereNotNull('completed_at')
                ->pluck('completed_at'))
            ->merge(
                QuizAttempt::query()
                    ->where('user_id', $this->user->id)
                    ->pluck('submitted_at')
            )
            ->filter()
            ->map(static fn ($timestamp): string => $timestamp->toDateString())
            ->unique()
            ->sortDesc()
            ->values();

        if ($dates->isEmpty()) {
            return 0;
        }

        $today = now()->startOfDay();
        $cursor = $dates->first() === $today->toDateString()
            ? $today
            : $today->copy()->subDay();

        if ($dates->first() !== $cursor->toDateString()) {
            return 0;
        }

        $streak = 0;
        foreach ($dates as $date) {
            if ($date !== $cursor->toDateString()) {
                break;
            }
            $streak++;
            $cursor = $cursor->copy()->subDay();
        }

        return $streak;
    }

    /**
     * Completed module count within a stage.
     */
    public function completedModulesInStage(int $stage): int
    {
        $completedModules = $this->completedModuleIds();

        return $this->stageModules($stage)
            ->filter(fn (string $module) => in_array($module, $completedModules, true))
            ->count();
    }

    /**
     * @return Collection<int, string>
     */
    private function stageModules(int $stage): Collection
    {
        return collect(LearningCurriculum::lessons())
            ->keys()
            ->filter(fn (string $id): bool => str_starts_with($id, $stage.'.'))
            ->values();
    }
}
