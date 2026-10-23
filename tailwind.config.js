import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        appear: "in-right 200ms",
      },
      border: {
        3: "3px",
      },
      cursor: {
        inherit: "inherit",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      lineHeight: {
        5.5: "1.375rem",
      },
      maxWidth: {
        snackbar: "560px",
      },
      minHeight: {
        badge: "22px",
      },
      minWidth: {
        badge: "22px",
        listbox: "200px",
        snackbar: "300px",
        "tabs-list": "400px",
      },
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [
    plugin(({ addVariant }) => {
      [
        "active",
        "checked",
        "completed",
        "disabled",
        "readOnly",
        "error",
        "expanded",
        "focused",
        "required",
        "selected",
      ].forEach((state) => {
        addVariant(`ui-${state}`, [
          `&[class~="Mui-${state}"]`,
          `&[class~="base--${state}"]`,
        ]);
        addVariant(`ui-not-${state}`, [
          `&:not([class~="Mui-${state}"])`,
          `&:not([class~="base--${state}"])`,
        ]);
      });

      // for focus-visible, use the same selector as headlessui
      // https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-tailwindcss/src/index.ts#LL35C11-L35C11
      addVariant(`ui-focus-visible`, [
        `&[class~="Mui-focusVisible"]`,
        `&[class~="base--focusVisible"]`,
        `&:focus-visible`,
      ]);
      addVariant(`ui-not-focus-visible`, [
        `&:not([class~="Mui-focusVisible"])`,
        `&:not([class~="base--focusVisible"])`,
      ]);
    }),
  ],
};
