import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontSize: {
                xxs: ['.625rem', '12px'],
            },
        },
        fontFamily: {
            table: ['Inter', ...defaultTheme.fontFamily.sans],
        },
    },
    plugins: [],
} satisfies Config;
