import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');

const tsxPages = new Set(['LearningPath', 'Progress', 'LessonDetail', 'Quiz', 'QuizReview']);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const jsxPath = `./Pages/${name}.jsx`;
        const path = pages[jsxPath] && !tsxPages.has(name) ? jsxPath : `./Pages/${name}.tsx`;

        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
