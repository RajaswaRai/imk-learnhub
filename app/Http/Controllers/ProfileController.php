<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\LearningCurriculum;
use App\LearningProgress;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $progress = new LearningProgress($request->user());

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'semester' => 'Semester Ganjil 2026/2027',
            'profile' => [
                'nrp' => $request->user()->nrp,
                'studyProgram' => 'Teknik Informatika',
                'campus' => 'Institut Teknologi Indonesia',
                'completedLessons' => count($progress->completedModuleIds()),
                'totalLessons' => count(LearningCurriculum::lessons()),
                'passedQuizzes' => count($progress->passedStages()),
                'averageScore' => $progress->averageScore(),
                'streak' => $progress->streakDays(),
                'xp' => $progress->earnedXp(),
                'passwordUpdatedDays' => null,
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
