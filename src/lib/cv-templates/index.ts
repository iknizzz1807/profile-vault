import type { CvTemplate } from "$lib/types";
import Classic from "./Classic.svelte";
import Modern from "./Modern.svelte";

// Import thumbnail images. You should create these images.
// For example, take a screenshot of each template.
// I'll use placeholders here.
import classicThumb from "$lib/assets/template-classic-thumb.png"; // Create this file
import modernThumb from "$lib/assets/template-modern-thumb.png"; // Create this file

export const templates: CvTemplate[] = [
  {
    id: "classic",
    name: "Cổ điển",
    component: Classic,
    thumbnail: classicThumb,
  },
  {
    id: "modern",
    name: "Hiện đại",
    component: Modern,
    thumbnail: modernThumb,
  },
];
