import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            name: "index",
            entry: ['src/index.ts'],
            formats: ['es', 'cjs', 'umd'],
        },
        minify: false
    }
})