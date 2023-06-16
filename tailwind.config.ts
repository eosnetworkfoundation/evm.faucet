import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontSize: {
                xxs: ['.625rem', '12px'],
            },
            colors: {
                'background-black': '#15171B',
                'history-gray': '#B1B1B1',
            },
        },
        fontFamily: {
            table: ['Inter', ...defaultTheme.fontFamily.sans],
        },
    },
    plugins: [],
} satisfies Config;
