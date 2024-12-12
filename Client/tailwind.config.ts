import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1.5rem',
  				sm: '1rem',
  				md: '2rem',
  				lg: '3rem',
  				xl: '4rem',
  				'2xl': '5rem'
  			}
  		},
  		fontFamily: {
  			slab: [
  				'Montagu Slab',
  				'sans-serif'
  			],
  			sans: [
  				'Open Sans',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: '#11224D',
  			primary2: '#193A6F',
  			primary3: '#2C599D',
  			primary4: '#5B84C4',
  			secondary: '#F98125',
  			secondary2: '#FB9B50',
  			background: '#A4BADD'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;
