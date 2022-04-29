module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                dec: "url('/dec.svg')",
            }),
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
