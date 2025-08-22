import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: {
          "50": "hsl(var(--primary-hue) var(--primary-saturation) 95%)",
          "100": "hsl(var(--primary-hue) var(--primary-saturation) 90%)",
          "200": "hsl(var(--primary-hue) var(--primary-saturation) 80%)",
          "300": "hsl(var(--primary-hue) var(--primary-saturation) 70%)",
          "400": "hsl(var(--primary-hue) var(--primary-saturation) 60%)",
          "500":
            "hsl(var(--primary-hue) var(--primary-saturation) var(--primary-lightness))",
          "600": "hsl(var(--primary-hue) var(--primary-saturation) 45%)",
          "700": "hsl(var(--primary-hue) var(--primary-saturation) 35%)",
          "800": "hsl(var(--primary-hue) var(--primary-saturation) 25%)",
          "900": "hsl(var(--primary-hue) var(--primary-saturation) 15%)",
          "950": "hsl(var(--primary-hue) var(--primary-saturation) 10%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },

  plugins: [forms],
} as Config;
