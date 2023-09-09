/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundColor: {
                'black-mode1': '#1D2633',
                'black-mode2': 'rgba(16, 22, 31, 1)',
                'white-mode1': '#FFFFFF',
                'white-mode2': '#F1F3F5',
                'grad-main': 'linear-gradient(90deg, #08C 1%, #5EDDFF 98%)',
                'button-blue': 'rgba(0, 136, 204, 0.80)',
                wallet: 'rgba(0, 0, 0, 0.10)',
            },
            screens: {
                sm: '320px',
                mm: '375px',
                laptop: '1440px',
                bigger: '1441px',
                lap: '1600px',
                desktop: '1920px',
            },
            fontFamily: {
                usual: 'Roboto',
                mono: 'Roboto Mono',
                Inter: 'Inter',
            },
            colors: {
                'black-mode1': '#1D2633',
                'black-mode2': 'rgba(16, 22, 31, 1)',
                'white-mode1': '#FFFFFF',
                'white-mode2': '#F1F3F5',
                wallet: 'rgba(0, 0, 0, 0.70)',
                darkwallet: 'rgba(255, 255, 255, 0.70)',
            },
        },
    },
    plugins: [],
};
