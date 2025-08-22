<script lang="ts">
  import { goto } from "$app/navigation";
  import Stepper from "$lib/components/ui/Stepper.svelte";
  import CvGenerator from "$lib/components/results/CvGenerator.svelte";
  import PortfolioGenerator from "$lib/components/results/PortfolioGenerator.svelte";
  import { profileData } from "$lib/stores/profile";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let activeTab = $state<"cv" | "portfolio">("cv");

  onMount(() => {
    // Nếu người dùng tải lại trang này mà không có dữ liệu, điều hướng về trang chủ
    if (!$profileData) {
      goto("/");
    }
  });

  const steps = [
    {
      name: "Tải lên & Phân tích",
      description: "Cung cấp thông tin hồ sơ của bạn",
    },
    {
      name: "Chỉnh sửa & Hoàn thiện",
      description: "Kiểm tra và hoàn thiện thông tin",
    },
    {
      name: "Tạo sản phẩm",
      description: "Chọn và tải xuống CV hoặc Portfolio",
    },
  ];
</script>

{#if $profileData}
  <div class="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8" in:fade>
    <div class="mb-12 md:mb-16">
      <div class="mx-auto max-w-2xl">
        <Stepper {steps} currentStep={2} />
      </div>
    </div>

    <div class="mx-auto max-w-5xl text-center">
      <h1
        class="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl"
      >
        Tạo & Tải xuống sản phẩm
      </h1>
      <p class="mt-4 mb-10 text-lg text-slate-600">
        Chọn một sản phẩm bạn muốn tạo, tuỳ chỉnh mẫu và tải về.
      </p>

      <!-- Tabs -->
      <div class="mb-8 border-b border-slate-200" data-no-print>
        <nav class="-mb-px flex justify-center space-x-8" aria-label="Tabs">
          <button
            onclick={() => (activeTab = "cv")}
            class="whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium transition-colors"
            class:text-primary-600={activeTab === "cv"}
            class:border-primary-500={activeTab === "cv"}
            class:text-slate-500={activeTab !== "cv"}
            class:border-transparent={activeTab !== "cv"}
            class:hover:text-slate-700={activeTab !== "cv"}
            class:hover:border-slate-300={activeTab !== "cv"}
          >
            Tạo CV
          </button>
          <button
            onclick={() => (activeTab = "portfolio")}
            class="whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium transition-colors"
            class:text-primary-600={activeTab === "portfolio"}
            class:border-primary-500={activeTab === "portfolio"}
            class:text-slate-500={activeTab !== "portfolio"}
            class:border-transparent={activeTab !== "portfolio"}
            class:hover:text-slate-700={activeTab !== "portfolio"}
            class:hover:border-slate-300={activeTab !== "portfolio"}
          >
            Tạo Portfolio Website
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      {#key activeTab}
        <div in:fade={{ duration: 200 }}>
          {#if activeTab === "cv"}
            <CvGenerator profileData={$profileData} />
          {:else if activeTab === "portfolio"}
            <PortfolioGenerator profileData={$profileData} />
          {/if}
        </div>
      {/key}
    </div>
  </div>
{/if}
