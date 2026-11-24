<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearningPathController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\QuizController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/learning-path', LearningPathController::class)->name('learning-path.show');
    Route::get('/progress', ProgressController::class)->name('progress.index');
    Route::get('/lessons/{lesson}', LessonController::class)
        ->where('lesson', '[1-8]\.[12]')
        ->name('lessons.show');
    Route::post('/lessons/{lesson}/complete', [LessonController::class, 'complete'])
        ->where('lesson', '[1-8]\.[12]')
        ->name('lessons.complete');
    Route::get('/quizzes/stage/{stage}', [QuizController::class, 'show'])
        ->whereNumber('stage')
        ->name('quizzes.show');
    Route::post('/quizzes/stage/{stage}', [QuizController::class, 'submit'])
        ->whereNumber('stage')
        ->name('quizzes.submit');
    Route::get('/quizzes/stage/{stage}/review', [QuizController::class, 'review'])
        ->whereNumber('stage')
        ->name('quizzes.review');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
