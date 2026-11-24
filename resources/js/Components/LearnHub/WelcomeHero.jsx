const assetPath = '/images/learnhub-dashboard/';

/**
 * @param {{ title: string, description: string }} props
 */
export default function WelcomeHero({ title, description }) {
    return (
        <section
            aria-labelledby="welcome-title"
            className="relative isolate overflow-hidden rounded-3xl bg-[var(--color-forest-muted)] px-6 py-8 text-white shadow-md sm:px-8 md:min-h-[232px] md:px-10 md:py-9"
        >
            <span
                aria-hidden="true"
                className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-white/15 blur-3xl"
            />
            <span
                aria-hidden="true"
                className="absolute -bottom-16 left-1/3 -z-10 h-56 w-56 rounded-full bg-[var(--color-forest)] opacity-50 blur-2xl"
            />

            <div className="relative z-10 flex min-h-40 flex-col items-start justify-center gap-4 md:min-h-[152px] md:pr-48">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wide text-[var(--color-mint)] backdrop-blur-sm">
                    <img
                        src={`${assetPath}imgContainer2.svg`}
                        alt=""
                        className="h-3 w-3 object-contain"
                    />
                    Rencana Pembelajaran Terpandu
                </span>
                <h2
                    id="welcome-title"
                    className="max-w-xl text-2xl font-bold leading-tight tracking-tight sm:text-[30px]"
                >
                    {title}
                </h2>
                <p className="max-w-xl text-sm leading-6 text-[var(--color-mint)]">
                    {description}
                </p>
                <a
                    href="#continue-learning"
                    className="mt-1 inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-2 text-sm font-bold text-amber-950 shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-forest-muted)] active:translate-y-px"
                >
                    Mulai Belajar Hari Ini
                    <img
                        src={`${assetPath}imgContainer3.svg`}
                        alt=""
                        className="h-3.5 w-3.5 object-contain"
                    />
                </a>
            </div>

            <img
                src={`${assetPath}imgAsset34X3.png`}
                alt="Maskot burung hantu LearnHub"
                className="pointer-events-none absolute bottom-0 right-5 hidden h-[190px] w-auto object-contain md:block md:right-8"
            />
        </section>
    );
}
