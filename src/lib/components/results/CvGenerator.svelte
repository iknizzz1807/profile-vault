<script lang="ts">
  import type { MasterProfile } from "$lib/types";
  import { generatePdf } from "$lib/services/pdfGenerator";
  import { templates } from "$lib/cv-templates";
  import TemplateCard from "$lib/components/ui/TemplateCard.svelte";

  let { profileData }: { profileData: MasterProfile } = $props();

  let cvElement: HTMLElement;
  let isDownloading = $state(false);
  let selectedTemplateId = $state(templates[0].id);

  const selectedTemplateComponent = $derived(
    templates.find((t) => t.id === selectedTemplateId)?.component
  );

  async function handleDownload() {
    if (!cvElement) return;
    isDownloading = true;
    try {
      await generatePdf(
        cvElement,
        `${profileData.profileInfo.fullName}_CV.pdf`
      );
    } finally {
      isDownloading = false;
    }
  }
</script>

<div>
  <div class="mb-12" data-no-print>
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <h2 class="text-xl font-bold text-slate-700">Chọn mẫu CV & Tải xuống</h2>
      <button
        class="btn-success w-full sm:w-auto"
        onclick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? "Đang xử lý..." : "Tải xuống PDF"}
      </button>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {#each templates as template (template.id)}
        <TemplateCard
          {template}
          bind:group={selectedTemplateId}
          name="cv-template-selector"
        />
      {/each}
    </div>
  </div>

  <!-- CV Render Area -->
  <div
    class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
  >
    {#if selectedTemplateComponent}
      <div bind:this={cvElement}>
        <svelte:component this={selectedTemplateComponent} {profileData} />
      </div>
    {/if}
  </div>
</div>
