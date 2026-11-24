import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

/**
 * @param {{
 *   show: boolean,
 *   title: string,
 *   description: string,
 *   confirmLabel: string,
 *   cancelLabel?: string,
 *   onConfirm: () => void,
 *   onCancel: () => void,
 *   processing?: boolean,
 * }} props
 */
export default function ConfirmModal({
    show,
    title,
    description,
    confirmLabel,
    cancelLabel = "Batal",
    onConfirm,
    onCancel,
    processing = false,
}) {
    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6"
                onClose={onCancel}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-[var(--color-forest)]/60 backdrop-blur-sm" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:scale-95"
                >
                    <DialogPanel className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-2xl">
                        <div className="p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/30 text-2xl">
                                ⚠️
                            </div>
                            <h2 className="mt-4 text-lg font-extrabold text-[var(--color-forest)]">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                                {description}
                            </p>

                            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    disabled={processing}
                                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-surface-soft)] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]"
                                >
                                    {cancelLabel}
                                </button>
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    disabled={processing}
                                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--color-forest)] px-4 text-xs font-bold text-white transition-colors hover:bg-[var(--color-forest-muted)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                                >
                                    {processing ? "Memproses..." : confirmLabel}
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
