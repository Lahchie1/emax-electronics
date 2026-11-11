import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emax: {
          navy: "#123047",
          navyDark: "#0b1d2e",
          deepBlue: "#0d2844",
          teal: "#087E8B",
          tealHover: "#066570",
          amber: "#F2A541",
          amberHover: "#e09331",
          success: "#217A50",
          warning: "#9A6500",
          error: "#B42318",
          canvas: "#F7F9FA",
          surface: "#FFFFFF",
          surfaceDark: "#0c141c",
          border: "#E2E8F0",
          borderDark: "#1E3A52",
          textPrimary: "#2D3741",
          textMuted: "#667784",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 40px -15px rgba(0, 32, 70, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.65)",
        glassDark: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        glowAmber: "0 10px 25px -5px rgba(242, 165, 65, 0.45)",
        glowTeal: "0 10px 25px -5px rgba(8, 126, 139, 0.35)",
        cardHover: "0 25px 50px -12px rgba(18, 48, 71, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 12px rgba(242,165,65,0.4))" },
          "50%": { opacity: "0.85", filter: "drop-shadow(0 0 4px rgba(242,165,65,0.2))" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        floatDelayed: "float 4s ease-in-out 2s infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
