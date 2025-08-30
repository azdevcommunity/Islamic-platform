/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class', 'class'],
    content: [
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				'50': '#EBFAF4',
    				'100': '#D0F5E6',
    				'200': '#A2EAD0',
    				'300': '#74DEB9',
    				'400': '#45D3A2',
    				'500': '#26C48E',
    				'600': '#1C9E74',
    				'700': '#007A4C',
    				'800': '#00613C',
    				'900': '#00472C',
    				'950': '#002D1B',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			accent: {
    				'50': '#FFFDE6',
    				'100': '#FFF9C2',
    				'200': '#FFF599',
    				'300': '#FFEF70',
    				'400': '#F7E652',
    				'500': '#EBCC1F',
    				'600': '#DBAC13',
    				'700': '#B7810F',
    				'800': '#936315',
    				'900': '#7A5117',
    				'950': '#422B0D',
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
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
    			},
    			'fadeInUp': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(30px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'slideInRight': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateX(30px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			'scaleIn': {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.9)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			},
    			'shimmer': {
    				'0%': {
    					backgroundPosition: '-200px 0'
    				},
    				'100%': {
    					backgroundPosition: 'calc(200px + 100%) 0'
    				}
    			},
    			'float': {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			'pulse-soft': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.7'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
    			'slideInRight': 'slideInRight 0.5s ease-out forwards',
    			'scaleIn': 'scaleIn 0.4s ease-out forwards',
    			'shimmer': 'shimmer 2s infinite linear',
    			'float': 'float 3s ease-in-out infinite',
    			'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [
        require("tailwindcss-animate")
    ],
};
