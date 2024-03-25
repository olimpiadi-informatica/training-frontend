import olinfoPresets from "@olinfo/tailwind";

/** @type {import("tailwindcss").Config} */
export default {
  presets: [olinfoPresets],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@olinfo/react-components/dist/**/*.js",
  ],
};
