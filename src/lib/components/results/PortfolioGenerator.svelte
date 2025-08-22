<script lang="ts">
  import type { MasterProfile } from "$lib/types";
  import { portfolioTemplates } from "$lib/portfolio-templates";
  import { generatePortfolioZip } from "$lib/services/portfolioGenerator";
  import TemplateCard from "$lib/components/ui/TemplateCard.svelte";

  let { profileData }: { profileData: MasterProfile } = $props();

  let isDownloading = $state(false);
  let selectedTemplateId = $state(portfolioTemplates[0].id);

  function handlePreview() {
    // Save data to sessionStorage to be accessed by the preview tab
    sessionStorage.setItem(
      "portfolio_preview_data",
      JSON.stringify(profileData)
    );
    window.open(`/portfolio/preview/${selectedTemplateId}`, "_blank");
  }

  async function handleDownload() {
    isDownloading = true;
    try {
      await generatePortfolioZip(selectedTemplateId, profileData);
    } catch (error) {
      console.error("Failed to generate portfolio zip:", error);
      alert("Đã có lỗi xảy ra khi tạo file zip.");
    } finally {
      isDownloading = false;
    }
  }
</script>

<div>
  <div class="mb-12" data-no-print>
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <h2 class="text-xl font-bold text-slate-700">
        Chọn mẫu Portfolio & Tải xuống
      </h2>
      <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <button class="btn-secondary w-full sm:w-auto" onclick={handlePreview}
          >Xem trước</button
        >
        <button
          class="btn-success w-full sm:w-auto"
          onclick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? "Đang nén..." : "Tải Source Code (ZIP)"}
        </button>
      </div>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {#each portfolioTemplates as template (template.id)}
        <TemplateCard
          {template}
          bind:group={selectedTemplateId}
          name="portfolio-template-selector"
        />
      {/each}
    </div>
  </div>

  <div
    class="rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 p-8 text-center"
  >
    <h3 class="text-lg font-semibold text-slate-800">
      Xem trước trong tab mới
    </h3>
    <p class="mt-2 text-slate-600">
      Chọn một mẫu và nhấn "Xem trước" để xem trang web portfolio của bạn sẽ
      trông như thế nào. Khi đã hài lòng, hãy tải xuống mã nguồn để tuỳ chỉnh và
      triển khai!
    </p>
  </div>
</div>
