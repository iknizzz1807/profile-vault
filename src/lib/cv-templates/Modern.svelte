<script lang="ts">
  import type { MasterProfile } from "$lib/types";
  import EmailIcon from "$lib/components/icons/EmailIcon.svelte";
  import PhoneIcon from "$lib/components/icons/PhoneIcon.svelte";
  import WebsiteIcon from "$lib/components/icons/WebsiteIcon.svelte";

  let { profileData }: { profileData: MasterProfile } = $props();
</script>

<div class="bg-white text-gray-800 font-sans p-0">
  <div class="grid grid-cols-12">
    <!-- Sidebar -->
    <aside class="col-span-4 bg-slate-800 text-white p-8">
      <div class="flex flex-col items-center text-center">
        <div
          class="w-32 h-32 rounded-full bg-primary-500 mb-4 flex items-center justify-center text-white text-5xl font-bold"
        >
          {profileData.profileInfo.fullName?.charAt(0) ?? ""}
        </div>
        <h1 class="text-3xl font-bold tracking-tight">
          {profileData.profileInfo.fullName}
        </h1>
      </div>

      <div class="mt-10 space-y-6 text-sm">
        <h2 class="sidebar-title">Liên hệ</h2>
        <ul class="space-y-3">
          {#if profileData.profileInfo.email}
            <li class="flex items-start gap-3">
              <EmailIcon class="w-4 h-4 mt-0.5 text-primary-400" />
              <span class="break-all">{profileData.profileInfo.email}</span>
            </li>
          {/if}
          {#if profileData.profileInfo.phoneNumber}
            <li class="flex items-start gap-3">
              <PhoneIcon class="w-4 h-4 mt-0.5 text-primary-400" />
              <span class="break-all"
                >{profileData.profileInfo.phoneNumber}</span
              >
            </li>
          {/if}
          {#if profileData.profileInfo.website}
            <li class="flex items-start gap-3">
              <WebsiteIcon class="w-4 h-4 mt-0.5 text-primary-400" />
              <a
                href={profileData.profileInfo.website}
                class="hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.profileInfo.website.replace(/https?:\/\//, "")}
              </a>
            </li>
          {/if}
        </ul>
      </div>

      {#if profileData.educations?.length > 0}
        <div class="mt-8 space-y-4">
          <h2 class="sidebar-title">Học vấn</h2>
          {#each profileData.educations as edu}
            <div class="break-inside-avoid">
              <h3 class="font-semibold text-base">{edu.institution}</h3>
              <p class="text-sm text-slate-300">
                {edu.degree}, {edu.fieldOfStudy}
              </p>
              <p class="text-xs text-slate-400 mt-1">
                {edu.startDate} - {edu.endDate || "Hiện tại"}
              </p>
            </div>
          {/each}
        </div>
      {/if}
    </aside>

    <!-- Main Content -->
    <main class="col-span-8 p-10">
      <!-- Summary -->
      {#if profileData.summary?.content}
        <section class="mb-8">
          <h2 class="main-title">Giới thiệu</h2>
          <p class="text-gray-700 leading-relaxed text-justify">
            {profileData.summary.content}
          </p>
        </section>
      {/if}

      <!-- Work Experience -->
      {#if profileData.workExperiences?.length > 0}
        <section>
          <h2 class="main-title">Kinh nghiệm làm việc</h2>
          <div class="space-y-6">
            {#each profileData.workExperiences as exp}
              <div class="break-inside-avoid">
                <div class="flex justify-between items-baseline mb-1">
                  <h3 class="font-bold text-lg text-slate-900">
                    {exp.jobTitle}
                  </h3>
                  <p class="text-sm font-medium text-slate-500 text-right">
                    {exp.startDate} - {exp.endDate || "Hiện tại"}
                  </p>
                </div>
                <p class="italic text-md text-primary-700">{exp.companyName}</p>
                <p class="mt-2 text-gray-700 whitespace-pre-wrap">
                  {exp.description}
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
  .sidebar-title {
    @apply text-lg font-bold uppercase tracking-widest text-primary-400 pb-2 border-b-2 border-primary-700;
  }
  .main-title {
    @apply text-2xl font-bold text-slate-800 pb-2 mb-4 border-b-2 border-slate-200;
  }
</style>
