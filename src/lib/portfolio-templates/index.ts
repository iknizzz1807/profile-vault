import type { Component } from "svelte";
import type { MasterProfile } from "$lib/types";

// Import Svelte component for preview
import ModernPortfolio from "./modern/ModernPortfolio.svelte";

// Import static files for download
import modernHtml from "./modern/template.html?raw";
import modernCss from "./modern/style.css?raw";
import modernJs from "./modern/script.js?raw";

// Import thumbnail
import modernThumb from "$lib/assets/portfolio-modern-thumb.png";

export interface PortfolioTemplate {
  id: string;
  name: string;
  component: Component<{ profileData: MasterProfile }>;
  thumbnail: string;
  staticFiles: {
    html: string;
    css?: string;
    js?: string;
  };
}

export const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: "modern",
    name: "Portfolio Hiện đại",
    component: ModernPortfolio,
    thumbnail: modernThumb,
    staticFiles: {
      html: modernHtml,
      css: modernCss,
      js: modernJs,
    },
  },
];
