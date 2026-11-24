/**
 * @param {{ id: string, title: string, icon: string, detail?: string }} props
 */
export default function SectionHeading({ id, title, icon, detail }) {
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <h2
                id={id}
                className="flex items-center gap-2 text-sm font-bold text-[var(--color-ink)]"
            >
                <img
                    src={`/images/learnhub-dashboard/${icon}`}
                    alt=""
                    className="h-4 w-4 object-contain"
                />
                {title}
            </h2>
            {detail && (
                <span className="text-[9px] font-semibold tracking-wide text-[var(--color-muted)]">
                    {detail}
                </span>
            )}
        </div>
    );
}
