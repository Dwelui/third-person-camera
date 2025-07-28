import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ThirdPersonCamera',
            fileName: (format) => `third-person-camera.${format}.js`,
        },
        rollupOptions: {
            external: ['three', 'vue'],
            output: {
                globals: {
                    three: 'THREE',
                    vue: 'Vue'
                }
            }
        }
    }
});
