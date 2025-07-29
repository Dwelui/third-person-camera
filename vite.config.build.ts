import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'module/index.ts'),
            name: 'ThirdPersonCamera',
            fileName: (format) => `third-person-camera.${format}.js`,
        },
        rollupOptions: {
            external: ['three'],
            output: {
                globals: {
                    three: 'THREE',
                }
            }
        }
    }
});
