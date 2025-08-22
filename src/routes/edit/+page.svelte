<script lang="ts">
  import { goto } from "$app/navigation";
  import ProfileEditor from "$lib/components/steps/ProfileEditor.svelte";
  import Stepper from "$lib/components/ui/Stepper.svelte";
  import { profileData } from "$lib/stores/profile";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  onMount(() => {
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

  function handleComplete() {
    goto("/results");
  }
</script>

{#if $profileData}
  <div class="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8" in:fade>
    <div class="mb-12 md:mb-16">
      <div class="mx-auto max-w-2xl">
        <Stepper {steps} currentStep={1} />
      </div>
    </div>

    <div class="mx-auto max-w-4xl text-center">
      <h1
        class="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl"
      >
        Xác nhận & Chỉnh sửa thông tin
      </h1>
      <p class="mt-4 mb-10 text-lg text-slate-600">
        Kiểm tra lại thông tin AI đã trích xuất và chỉnh sửa nếu cần thiết để có
        một bộ hồ sơ hoàn hảo.
      </p>

      <ProfileEditor
        bind:profileData={$profileData}
        onComplete={handleComplete}
      />
    </div>
  </div>
{/if}
