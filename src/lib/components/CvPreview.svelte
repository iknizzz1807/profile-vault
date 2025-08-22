<script lang="ts">
  import type { MasterProfile } from "$lib/types";
  import { generatePdf } from "$lib/services/pdfGenerator";
  import EmailIcon from "./icons/EmailIcon.svelte";
  import PhoneIcon from "./icons/PhoneIcon.svelte";
  import WebsiteIcon from "./icons/WebsiteIcon.svelte";

  let {
    profileData,
    onBack,
  }: { profileData: MasterProfile; onBack: () => void } = $props();

  let cvElement: HTMLElement;
  let isDownloading = $state(false);

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

<div class="flex justify-between items-center mb-8" data-no-print>
  <button class="btn-secondary" onclick={onBack}>← Quay lại chỉnh sửa</button>
  <button class="btn-success" onclick={handleDownload} disabled={isDownloading}>
    {isDownloading ? "Đang xử lý..." : "Tải xuống PDF"}
  </button>
</div>

<!-- Mẫu CV mới -->
<div
  class="bg-white text-black shadow-2xl max-w-4xl mx-auto rounded-lg"
  bind:this={cvElement}
>
  <div class="p-8 md:p-12 font-sans">
    <!-- Header -->
    <header class="text-center border-b-2 border-gray-200 pb-6 mb-6">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
      >
        {profileData.profileInfo.fullName}
      </h1>
      <div
        class="mt-4 flex justify-center flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600"
      >
        {#if profileData.profileInfo.email}
          <span class="flex items-center gap-2">
            <EmailIcon class="w-4 h-4" />
            {profileData.profileInfo.email}
          </span>
        {/if}
        {#if profileData.profileInfo.phoneNumber}
          <span class="flex items-center gap-2">
            <PhoneIcon class="w-4 h-4" />
            {profileData.profileInfo.phoneNumber}
          </span>
        {/if}
        {#if profileData.profileInfo.website}
          <span class="flex items-center gap-2">
            <WebsiteIcon class="w-4 h-4" />
            <a
              href={profileData.profileInfo.website}
              class="text-blue-600 hover:underline"
              target="_blank"
            >
              {profileData.profileInfo.website.replace(/https?:\/\//, "")}
            </a>
          </span>
        {/if}
      </div>
    </header>

    <div class="md:grid md:grid-cols-3 md:gap-10">
      <!-- Cột phải (chính) -->
      <div class="md:col-span-2">
        {#if profileData.summary?.content}
          <section class="mb-8">
            <h2 class="section-title">Tóm tắt</h2>
            <p class="text-sm text-gray-700 leading-relaxed text-justify">
              {profileData.summary.content}
            </p>
          </section>
        {/if}

        {#if profileData.workExperiences?.length > 0}
          <section class="mb-8">
            <h2 class="section-title">Kinh nghiệm làm việc</h2>
            <div class="space-y-6">
              {#each profileData.workExperiences as exp}
                <div class="break-inside-avoid">
                  <div class="flex justify-between items-baseline">
                    <h3 class="font-bold text-lg text-gray-800">
                      {exp.jobTitle}
                    </h3>
                    <p class="text-sm font-medium text-gray-500 text-right">
                      {exp.startDate} - {exp.endDate || "Hiện tại"}
                    </p>
                  </div>
                  <p class="italic text-md text-gray-600">{exp.companyName}</p>
                  <p class="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              {/each}
            </div>
          </section>
        {/if}
      </div>

      <!-- Cột trái (phụ) -->
      <div class="md:col-span-1 md:border-l md:pl-8 mt-8 md:mt-0">
        {#if profileData.educations?.length > 0}
          <section>
            <h2 class="section-title">Học vấn</h2>
            <div class="space-y-4">
              {#each profileData.educations as edu}
                <div class="break-inside-avoid">
                  <h3 class="font-bold text-base text-gray-800">
                    {edu.institution}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {edu.degree}, {edu.fieldOfStudy}
                  </p>
                  <p class="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate || "Hiện tại"}
                  </p>
                </div>
              {/each}
            </div>
          </section>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .section-title {
    @apply text-xl font-bold text-primary-700 border-b-2 border-primary-200 pb-2 mb-4 uppercase tracking-wider;
  }
</style>
