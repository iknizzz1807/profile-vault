<script lang="ts">
  import { fade } from "svelte/transition";
  import FileUpload from "$lib/components/FileUpload.svelte";
  import ProfileEditor from "$lib/components/ProfileEditor.svelte";
  import CvPreview from "$lib/components/CvPreview.svelte";
  import Stepper from "$lib/components/Stepper.svelte";
  import type { MasterProfile } from "$lib/types";

  let stage = $state<"upload" | "edit" | "preview">("upload");
  let profileData = $state<MasterProfile | null>(null);
  let isLoading = $state(false);
  let error = $state("");

  const steps = [
    { name: "Tải lên", description: "Cung cấp thông tin hồ sơ của bạn" },
    { name: "Chỉnh sửa", description: "Kiểm tra và hoàn thiện thông tin" },
    { name: "Hoàn tất", description: "Xem trước và tải xuống CV" },
  ];

  let currentStep = $derived(stage === "upload" ? 0 : stage === "edit" ? 1 : 2);

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

      profileData = await response.json();
      stage = "edit";
    } catch (e: any) {
      error = "Đã xảy ra lỗi khi phân tích hồ sơ: " + e.message;
      stage = "upload";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Stepper UI -->
  <div class="mb-16" data-no-print>
    <Stepper {steps} {currentStep} />
  </div>

  <!-- Stage Content -->
  {#key stage}
    <div in:fade={{ duration: 300 }}>
      {#if stage === "upload"}
        <div class="max-w-3xl mx-auto">
          <h1
            class="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800"
          >
            Tạo CV Chuyên Nghiệp với AI
          </h1>
          <p class="text-lg text-slate-600 text-center mb-10">
            Tải lên CV, bản mô tả công việc, hoặc các tài liệu liên quan. AI sẽ
            tự động phân tích và điền thông tin giúp bạn.
          </p>
          <FileUpload onTextExtracted={handleTextExtracted} />
          {#if isLoading}
            <div class="text-center mt-8 space-y-4">
              <p class="text-lg font-semibold text-primary-600">
                🤖 AI đang phân tích, vui lòng chờ trong giây lát...
              </p>
              <div
                class="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary-600 mx-auto"
              ></div>
            </div>
          {/if}
          {#if error}
            <div
              class="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-6"
              role="alert"
            >
              <strong class="font-bold">Lỗi!</strong>
              <span class="block sm:inline">{error}</span>
            </div>
          {/if}
        </div>
      {:else if stage === "edit" && profileData}
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold mb-4 text-center text-slate-800">
            Xác nhận & Chỉnh sửa thông tin
          </h1>
          <p class="text-center text-slate-500 mb-8">
            Kiểm tra lại thông tin AI đã trích xuất và chỉnh sửa nếu cần.
          </p>
          <ProfileEditor
            bind:profileData
            onComplete={() => (stage = "preview")}
          />
        </div>
      {:else if stage === "preview" && profileData}
        <div class="max-w-5xl mx-auto">
          <h1 class="text-3xl font-bold mb-4 text-center text-slate-800">
            Xem trước & Tải xuống CV
          </h1>
          <CvPreview {profileData} onBack={() => (stage = "edit")} />
        </div>
      {/if}
    </div>
  {/key}
</div>
