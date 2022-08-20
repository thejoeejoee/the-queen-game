import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: "static",
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    css: [
        '@/assets/css/main.css',
    ],
})
