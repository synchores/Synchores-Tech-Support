/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#193357',
        blue50: '#e8eaed',
        blue100: '#b6bcc6',
        blue200: '#939caa',
        blue300: '#626f83',
        blue400: '#43536b',
        blue500: '#142846',
        blue600: '#122440',
        blue700: '#0e1c32',
        blue800: '#0b1627',
        blue900: '#08111d',
        cyan: '#06b6d4',
        cyanMuted: '#0891b2',
        cyanDark: '#06899d',
        textPrimary: '#ffffff',
        textSecondary: '#d1d5db',
        textMuted: '#9ca3af',
        textDark: '#6b7280',
        textHiglight: '#179CF9',
        bgDark: '#08111d',
        bgDarker: '#0b1627',
        bgLight: '#0e1c32',
        bgCard: 'rgba(20,40,70,0.5)',
      },
    },
  },
  plugins: [],
}

