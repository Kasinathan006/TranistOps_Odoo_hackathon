/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-tertiary-container": "#bdffdc",
        "primary": "#004ac6",
        "on-background": "#121c2a",
        "secondary-fixed-dim": "#bdc7d8",
        "outline-variant": "#c3c6d7",
        "error-container": "#ffdad6",
        "surface-dim": "#d0dbed",
        "tertiary-container": "#007d57",
        "on-primary-fixed": "#00174b",
        "on-tertiary-fixed": "#002114",
        "surface-container-low": "#eff4ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#eeefff",
        "inverse-primary": "#b4c5ff",
        "surface-variant": "#d9e3f6",
        "tertiary-fixed": "#85f8c4",
        "inverse-surface": "#27313f",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#dee9fc",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#003ea8",
        "primary-container": "#2563eb",
        "error": "#ba1a1a",
        "on-secondary-container": "#596372",
        "surface-bright": "#f8f9ff",
        "on-tertiary": "#ffffff",
        "surface-tint": "#0053db",
        "secondary-fixed": "#d9e3f4",
        "on-error-container": "#93000a",
        "secondary-container": "#d6e0f1",
        "surface-container-highest": "#d9e3f6",
        "surface-container": "#e6eeff",
        "on-surface-variant": "#434655",
        "secondary": "#555f6d",
        "surface": "#f8f9ff",
        "on-secondary-fixed": "#121c28",
        "on-tertiary-fixed-variant": "#005137",
        "tertiary-fixed-dim": "#68dba9",
        "on-secondary-fixed-variant": "#3e4755",
        "inverse-on-surface": "#eaf1ff",
        "background": "#f8f9ff",
        "primary-fixed-dim": "#b4c5ff",
        "on-secondary": "#ffffff",
        "primary-fixed": "#dbe1ff",
        "on-surface": "#121c2a",
        "tertiary": "#006243",
        "outline": "#737686"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "unit": "4px",
        "sidebar-width": "260px",
        "component-gap-dense": "8px",
        "container-padding": "24px",
        "gutter": "16px",
        "header-height": "56px"
      },
      "fontFamily": {
        "label-sm": ["Poppins"],
        "body-sm": ["Poppins"],
        "label-md": ["Poppins"],
        "headline-md": ["Poppins"],
        "body-lg": ["Poppins"],
        "headline-sm": ["Poppins"],
        "code": ["monospace"],
        "display-lg": ["Poppins"],
        "body-md": ["Poppins"]
      },
      "fontSize": {
        "label-sm": ["11px", { "lineHeight": "14px", "fontWeight": "500" }],
        "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
        "headline-md": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
        "code": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
        "display-lg": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
