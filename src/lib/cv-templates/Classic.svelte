<script lang="ts">
  import type { MasterProfile } from "$lib/types";
  import EmailIcon from "$lib/components/icons/EmailIcon.svelte";
  import PhoneIcon from "$lib/components/icons/PhoneIcon.svelte";
  import WebsiteIcon from "$lib/components/icons/WebsiteIcon.svelte";

  let { profileData }: { profileData: MasterProfile } = $props();
</script>

<div class="bg-white text-gray-800 font-sans">
  <div class="p-8 md:p-12">
    <!-- Header -->
    <header class="text-center border-b-2 border-gray-200 pb-6 mb-8">
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
              rel="noopener noreferrer"
            >
              {profileData.profileInfo.website.replace(/https?:\/\//, "")}
            </a>
          </span>
        {/if}
      </div>
    </header>

    <main class="space-y-10">
      <!-- Summary -->
      {#if profileData.summary?.content}
        <section>
          <h2 class="section-title">Tóm tắt bản thân</h2>
          <p class="text-gray-700 leading-relaxed text-justify">
            {profileData.summary.content}
          </p>
        </section>
      {/if}

      <!-- Work Experience -->
      {#if profileData.workExperiences?.length > 0}
        <section>
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
                <p class="mt-2 text-gray-700 whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            {/each}
          </div>
        </section>
      {/if}

      <!-- Education -->
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
    </main>
  </div>
</div>

<style>
  .section-title {
    @apply text-xl font-bold text-primary-700 border-b-2 border-primary-200 pb-2 mb-4 uppercase tracking-wider;
  }
</style>
