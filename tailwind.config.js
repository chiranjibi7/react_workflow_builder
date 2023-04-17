
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    // require("tw-elements/dist/plugin")
  ],
}