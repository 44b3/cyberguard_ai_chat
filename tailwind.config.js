/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* subtle white border */
        input: "var(--color-input)", /* dark navy */
        ring: "var(--color-ring)", /* electric cyan */
        background: "var(--color-background)", /* near-black with blue undertones */
        foreground: "var(--color-foreground)", /* pure white */
        surface: {
          DEFAULT: "var(--color-surface)", /* dark navy */
          foreground: "var(--color-surface-foreground)", /* white */
        },
        primary: {
          DEFAULT: "var(--color-primary)", /* electric cyan */
          foreground: "var(--color-primary-foreground)", /* near-black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* deep violet */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* vibrant red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* slightly lighter navy */
          foreground: "var(--color-muted-foreground)", /* muted blue-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* coral red */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* dark navy */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* dark navy */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* bright green */
          foreground: "var(--color-success-foreground)", /* near-black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber */
          foreground: "var(--color-warning-foreground)", /* near-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* vibrant red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '1': '1',
        '100': '100',
        '200': '200',
        '1000': '1000',
      },
      animation: {
        "shooting-star": "shooting-star 3s linear infinite",
        "planet-rotation": "planet-rotation 60s linear infinite",
        "cosmic-pulse": "cosmic-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        "shooting-star": {
          "0%": {
            transform: "translateX(-100px) translateY(-100px)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100vw) translateY(100vh)",
            opacity: "0",
          },
        },
        "planet-rotation": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "cosmic-pulse": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(1.05)",
          },
        },
      },
      boxShadow: {
        'cosmic': '0 4px 20px rgba(0, 212, 255, 0.15)',
        'cosmic-intense': '0 8px 32px rgba(0, 212, 255, 0.25)',
        'cosmic-shadow': '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'cosmic': '8px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}