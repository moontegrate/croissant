const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './public/index.html',
        flowbite.content()
    ],
    theme: {
        extend: {
            colors: {
                'main-color': '#FF7A7A',
                'main-color-light': '#FFACAC',
                'light-gray-text': '#898989',
                'border-color': '#E5E5E5',
                'message-card-accent': '#2F71F0',
                'action-card-accent': "#FFC93F",
                'condition-card-accent': '#4CE99E'
            }
        },
    },
    plugins: [flowbite.plugin()],
}

