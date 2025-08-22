<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    open = false,
    children,
  }: { title: string; open?: boolean; children: Snippet } = $props();
</script>

<details class="accordion" {open}>
  <summary class="accordion-summary">
    <span class="text-lg font-semibold text-slate-800">{title}</span>
    <svg
      class="accordion-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      ></path>
    </svg>
  </summary>
  <div class="accordion-content">
    {@render children()}
  </div>
</details>
