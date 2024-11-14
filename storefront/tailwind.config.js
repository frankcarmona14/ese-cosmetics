module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: "#050505",
      "black-10%": "rgba(5, 5, 5, 0.1)",
      white: "#FDFDFD",
      grayscale: {
        800: "#1F1F20",
        700: "#3A3A3B",
        600: "#545457",
        500: "#808080",
        400: "#A3A3A3",
        300: "#BBBBBB",
        200: "#D1D1D1",
        100: "#E7E7E7",
        50: "#F4F4F4",
        30: "#F8F8F9",
        20: "#FBFBFB",
      },
      red: {
        900: "#BD3207",
        primary: "#DF4718",
      },
      yellow: "#FFEFB7",
      transparent: "rgba(0,0,0,0)",
      current: "currentColor",
    },
    fontSize: {
      "3xl": ["3.5rem", 1.4],
      "2xl": ["3rem", 1.4],
      xl: ["2.5rem", 1.4],
      lg: ["2rem", 1.4],
      md: ["1.5rem", 1.4],
      sm: ["1.125rem", 1.4],
      base: ["1rem", 1.4],
      xs: ["0.75rem", 1.4],
    },
    borderRadius: {
      "2xs": "2px",
      xs: "4px",
      md: "24px",
      lg: "30px",
      full: "100%",
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      spacing: {
        13.5: "3.375rem",
        14.5: "3.625rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.5rem",
        31: "7.75rem",
        33: "8.25rem",
        34: "8.5rem",
        35: "8.75rem",
        37: "9.25rem",
        39: "9.75rem",
        42: "10.5rem",
        46: "11.5rem",
        47: "11.75rem",
        50: "12.5rem",
        61: "15.25rem",
        75: "18.75rem",
        90: "22.5rem",
        100: "25rem",
        108: "27rem",
        120: "30rem",
        123: "30.75rem",
        124: "31rem",
        125: "31.25rem",
        135: "33.75rem",
        150: "37.5rem",
        159: "39.75rem",
      },
      borderWidth: {
        6: "6px",
      },
      transitionProperty: {
        fontWeight: "font-weight",
        padding: "padding",
      },
      zIndex: {
        header: "9999",
      },
      keyframes: {
        shine: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        shine: "shine 1s linear infinite",
      },
      backgroundColor: {
        "rose-400": "#fb7185",
        "rose-450": "rgb(238 94 117)"
      },
      textColor: {
        "rose-400": "#fb7185",
        "rose-450": "rgb(238 94 117)"
      }
    }
  },
  safelist: [
    {
      pattern: /col-(start|end)-(1|2|3|4|5|6|7|8|9|10|11|12|13)/,
      variants: ["xs", "sm", "md", "lg", "xl"],
    },
  ],
  plugins: [require("tailwindcss-radix")()],
}
