<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import FileUpload from "$lib/components/steps/FileUpload.svelte";
  import Stepper from "$lib/components/ui/Stepper.svelte";
  import { profileData, createEmptyProfile } from "$lib/stores/profile";

  let isLoading = $state(false);
  let error = $state("");

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

  async function handleTextExtracted(textContent: string) {
    isLoading = true;
    error = "";

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textContent }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Lỗi từ server");
      }

      const parsedData = await response.json();
      profileData.set(parsedData);
      goto("/edit");
    } catch (e: any) {
      error = "Đã xảy ra lỗi khi phân tích hồ sơ: " + e.message;
    } finally {
      isLoading = false;
    }
  }

  function handleStartWithoutUpload() {
    profileData.set(createEmptyProfile());
    goto("/edit");
  }
</script>

<div class="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <!-- Stepper UI -->
  <div class="mb-12 md:mb-16">
    <div class="mx-auto max-w-2xl">
      <Stepper {steps} currentStep={0} />
    </div>
  </div>

  <!-- Content -->
  <div class="mx-auto max-w-3xl text-center" in:fade={{ duration: 300 }}>
    <h1
      class="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl"
    >
      Tạo Hồ Sơ Chuyên Nghiệp với AI
    </h1>
    <p class="mx-auto mt-4 mb-10 max-w-2xl text-lg text-slate-600">
      Tải lên CV, bản mô tả công việc, hoặc các tài liệu liên quan. AI sẽ tự
      động phân tích và điền thông tin giúp bạn.
    </p>

    <div class="content-card">
      <FileUpload onTextExtracted={handleTextExtracted} />
    </div>

    <div class="my-6 flex items-center">
      <div class="flex-grow border-t border-slate-300"></div>
      <span class="flex-shrink px-4 text-slate-500">hoặc</span>
      <div class="flex-grow border-t border-slate-300"></div>
    </div>

    <button class="btn-secondary text-base" onclick={handleStartWithoutUpload}>
      Bắt đầu với hồ sơ trống →
    </button>

    {#if isLoading}
      <div class="mt-8 space-y-4">
        <p
          class="flex items-center justify-center gap-2 text-lg font-semibold text-primary-600"
        >
          <svg
            class="h-6 w-6 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>🤖 AI đang phân tích, vui lòng chờ trong giây lát...</span>
        </p>
      </div>
    {/if}

    {#if error}
      <div
        class="relative mt-8 rounded-lg border-l-4 border-red-500 bg-red-100 p-4 text-left text-red-700"
        role="alert"
      >
        <strong class="font-bold">Đã xảy ra lỗi!</strong>
        <span class="ml-2 block sm:inline">{error}</span>
      </div>
    {/if}
  </div>
</div>
