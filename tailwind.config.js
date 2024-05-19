/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			screens: {
				DEFAULT: "100%",
			},
			padding: {
				DEFAULT: "2.5rem",
			},
		},

		extend: {
			screens: {
				md: "748px",
				lg: "992px",
			},

			spacing: {
				15: "3.75rem",
			},

			colors: {
				blue: {
					DEFAULT: "#025FEB",
					50: "#E4EDF2",
					300: "#4b5c68",
					800: "#182C62",
				},
				gray: {
					100: "#F6F7F7",
				},
			},

			fontFamily: {
				sans: ['"Open Sans"', "sans-serif"],
			},
		},
	},

	plugins: [],
};
