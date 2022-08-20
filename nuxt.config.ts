import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    css: [
        '@/assets/main.css',
    ],

    router: {
        base: process.env.NODE_ENV !== 'production' ? '/' : '/the-queen-game/'
    }
})
