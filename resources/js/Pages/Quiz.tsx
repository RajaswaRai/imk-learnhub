import { Form, Head } from '@inertiajs/react';
import LearnHubPageLayout from '@/Components/LearnHub/LearnHubPageLayout';
import quizzes from '@/routes/quizzes';

type AuthUser = { name: string; email: string };

type QuizProps = {
    auth: { user: AuthUser };
    semester: string;
    quiz: {
        stage: number;
        title: string;
        description: string;
        questionCount: number;
        passingScore: number;
        questions: Array<{
            question_id: string;
            question: string;
            options: Array<{ option_id: string; text: string }>;
            points: number;
        }>;
    };
};

export default function Quiz({ auth, semester, quiz }: QuizProps) {
    return (
        <>
            <Head title={quiz.title} />
            <LearnHubPageLayout authUser={auth.user} semester={semester} activeRoute="learningPath">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                    <section className="flex flex-col gap-4">
                        <header className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-forest-muted)]">
                                KUIS STAGE {quiz.stage}
                            </p>
                            <h1 className="mt-2 text-2xl font-extrabold text-[var(--color-forest)] sm:text-3xl">
                                {quiz.title}
                            </h1>
                            <p className="mt-2 text-sm text-[var(--color-muted)]">{quiz.description}</p>
                        </header>

                        <Form
                            action={quizzes.submit.url(quiz.stage)}
                            method="post"
                            className="flex flex-col gap-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {errors.answers && (
                                        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            Jawab seluruh soal sebelum mengumpulkan kuis.
                                        </p>
                                    )}
                                    {quiz.questions.map((question, index) => (
                                        <fieldset key={question.question_id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
                                            <legend className="w-full text-sm font-bold leading-6 text-[var(--color-ink)]">
                                                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-mint)] text-xs text-[var(--color-forest)]">
                                                    {index + 1}
                                                </span>
                                                {question.question}
                                            </legend>
                                            <div className="mt-4 grid gap-2">
                                                {question.options.map((option) => (
                                                    <label key={option.option_id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] p-3 text-sm transition-colors hover:bg-[var(--color-surface-soft)] focus-within:ring-2 focus-within:ring-[var(--color-forest)]">
                                                        <input
                                                            type="radio"
                                                            name={`answers[${question.question_id}]`}
                                                            value={option.option_id}
                                                            className="h-4 w-4 accent-[var(--color-forest)]"
                                                            required
                                                        />
                                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-soft)] text-xs font-bold text-[var(--color-forest)]">
                                                            {option.option_id}
                                                        </span>
                                                        <span className="font-medium text-[var(--color-ink)]">{option.text}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>
                                    ))}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-forest)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing ? 'Mengumpulkan...' : 'Kumpulkan jawaban'}
                                    </button>
                                </>
                            )}
                        </Form>
                    </section>

                    <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm lg:sticky lg:top-24">
                        <p className="text-xs font-bold text-[var(--color-ink)]">Informasi kuis</p>
                        <dl className="mt-3 grid gap-3 text-xs">
                            <div className="flex justify-between gap-3"><dt className="text-[var(--color-muted)]">Jumlah soal</dt><dd className="font-bold">{quiz.questionCount}</dd></div>
                            <div className="flex justify-between gap-3"><dt className="text-[var(--color-muted)]">Nilai lulus</dt><dd className="font-bold">{quiz.passingScore}</dd></div>
                            <div className="flex justify-between gap-3"><dt className="text-[var(--color-muted)]">Poin per soal</dt><dd className="font-bold">20</dd></div>
                        </dl>
                    </aside>
                </div>
            </LearnHubPageLayout>
        </>
    );
}
