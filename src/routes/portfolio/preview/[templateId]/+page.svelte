<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { MasterProfile } from "$lib/types";
  import { portfolioTemplates } from "$lib/portfolio-templates";

  let profileData = $state<MasterProfile | null>(null);

  const templateId = $derived($page.params.templateId);
  const selectedTemplateComponent = $derived(
    portfolioTemplates.find((t) => t.id === templateId)?.component
  );

  onMount(() => {
    const dataFromStorage = sessionStorage.getItem("portfolio_preview_data");
    if (dataFromStorage) {
      profileData = JSON.parse(dataFromStorage);
    }
  });
</script>

<svelte:head>
  <title>Xem trước Portfolio</title>
</svelte:head>

{#if profileData && selectedTemplateComponent}
  <svelte:component this={selectedTemplateComponent} {profileData} />
{:else if !profileData}
  <div class="flex h-screen items-center justify-center">
    <p>Đang tải dữ liệu xem trước...</p>
  </div>
{:else}
  <div class="flex h-screen items-center justify-center">
    <p>Không tìm thấy mẫu portfolio.</p>
  </div>
{/if}
