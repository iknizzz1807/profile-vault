<script lang="ts">
  import type { MasterProfile, WorkExperience, Education } from "$lib/types";
  import { slide } from "svelte/transition";
  import TrashIcon from "./icons/TrashIcon.svelte";

  let {
    profileData = $bindable(),
    onComplete,
  }: { profileData: MasterProfile; onComplete: () => void } = $props();

  function addWorkExperience() {
    profileData.workExperiences = [
      ...profileData.workExperiences,
      {
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: null,
        description: "",
      },
    ];
  }

  function removeWorkExperience(index: number) {
    profileData.workExperiences = profileData.workExperiences.filter(
      (_, i) => i !== index
    );
  }

  function addEducation() {
    profileData.educations = [
      ...profileData.educations,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: null,
      },
    ];
  }

  function removeEducation(index: number) {
    profileData.educations = profileData.educations.filter(
      (_, i) => i !== index
    );
  }
</script>

<div class="space-y-6">
  <!-- Thông tin cá nhân -->
  <details
    class="p-6 bg-white border rounded-xl shadow-sm open:ring-2 open:ring-primary-200"
    open
  >
    <summary
      class="text-xl font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center"
    >
      Thông tin cá nhân
      <span class="text-sm font-normal text-slate-500 group-open:hidden"
        >Chỉnh sửa</span
      >
    </summary>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        class="input"
        placeholder="Họ và tên"
        bind:value={profileData.profileInfo.fullName}
      />
      <input
        class="input"
        placeholder="Email"
        type="email"
        bind:value={profileData.profileInfo.email}
      />
      <input
        class="input"
        placeholder="Số điện thoại"
        bind:value={profileData.profileInfo.phoneNumber}
      />
      <input
        class="input"
        placeholder="Website/Portfolio"
        bind:value={profileData.profileInfo.website}
      />
    </div>
  </details>

  <!-- Tóm tắt -->
  <details
    class="p-6 bg-white border rounded-xl shadow-sm open:ring-2 open:ring-primary-200"
    open
  >
    <summary
      class="text-xl font-semibold text-slate-800 cursor-pointer list-none"
      >Tóm tắt bản thân</summary
    >
    <textarea
      class="textarea mt-4"
      rows="5"
      placeholder="Giới thiệu ngắn gọn về bản thân, kỹ năng và mục tiêu nghề nghiệp..."
      bind:value={profileData.summary.content}
    ></textarea>
  </details>

  <!-- Kinh nghiệm làm việc -->
  <details
    class="p-6 bg-white border rounded-xl shadow-sm open:ring-2 open:ring-primary-200"
    open
  >
    <summary
      class="text-xl font-semibold text-slate-800 cursor-pointer list-none"
      >Kinh nghiệm làm việc</summary
    >
    <div class="space-y-6 mt-4">
      {#each profileData.workExperiences as exp, i (exp)}
        <div class="space-y-4 border-t pt-6" transition:slide>
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-slate-600">Kinh nghiệm #{i + 1}</h3>
            <button
              class="btn-danger p-2 h-8 w-8"
              onclick={() => removeWorkExperience(i)}
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
          <input
            class="input"
            placeholder="Chức danh"
            bind:value={exp.jobTitle}
          />
          <input
            class="input"
            placeholder="Công ty"
            bind:value={exp.companyName}
          />
          <div class="grid grid-cols-2 gap-4">
            <input
              class="input"
              placeholder="Ngày bắt đầu (YYYY-MM)"
              bind:value={exp.startDate}
            />
            <input
              class="input"
              placeholder="Ngày kết thúc (YYYY-MM)"
              bind:value={exp.endDate}
            />
          </div>
          <textarea
            class="textarea"
            rows="4"
            placeholder="Mô tả công việc, thành tựu..."
            bind:value={exp.description}
          ></textarea>
        </div>
      {/each}
      <button class="btn-secondary w-full" onclick={addWorkExperience}
        >+ Thêm kinh nghiệm</button
      >
    </div>
  </details>

  <!-- Học vấn -->
  <details
    class="p-6 bg-white border rounded-xl shadow-sm open:ring-2 open:ring-primary-200"
    open
  >
    <summary
      class="text-xl font-semibold text-slate-800 cursor-pointer list-none"
      >Học vấn</summary
    >
    <div class="space-y-6 mt-4">
      {#each profileData.educations as edu, i (edu)}
        <div class="space-y-4 border-t pt-6" transition:slide>
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-slate-600">Học vấn #{i + 1}</h3>
            <button
              class="btn-danger p-2 h-8 w-8"
              onclick={() => removeEducation(i)}
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
          <input
            class="input"
            placeholder="Trường/Tổ chức"
            bind:value={edu.institution}
          />
          <input class="input" placeholder="Bằng cấp" bind:value={edu.degree} />
          <input
            class="input"
            placeholder="Chuyên ngành"
            bind:value={edu.fieldOfStudy}
          />
          <div class="grid grid-cols-2 gap-4">
            <input
              class="input"
              placeholder="Ngày bắt đầu (YYYY-MM)"
              bind:value={edu.startDate}
            />
            <input
              class="input"
              placeholder="Ngày kết thúc (YYYY-MM)"
              bind:value={edu.endDate}
            />
          </div>
        </div>
      {/each}
      <button class="btn-secondary w-full" onclick={addEducation}
        >+ Thêm học vấn</button
      >
    </div>
  </details>
</div>

<div class="flex justify-center mt-12">
  <button class="btn-primary text-lg py-3 px-12" onclick={onComplete}>
    Tiếp tục xem trước CV →
  </button>
</div>
