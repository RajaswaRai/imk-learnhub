import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'; // <-- Import Node path utility

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'), // <-- Matches your jsconfig.json
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
