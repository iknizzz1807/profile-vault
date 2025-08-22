<script lang="ts">
  import type { MasterProfile } from "$lib/types";
  import { slide } from "svelte/transition";
  import TrashIcon from "$lib/components/icons/TrashIcon.svelte";
  import Accordion from "$lib/components/ui/Accordion.svelte";

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
        endDate: "",
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
        endDate: "",
      },
    ];
  }

  function removeEducation(index: number) {
    profileData.educations = profileData.educations.filter(
      (_, i) => i !== index
    );
  }
</script>

<div class="space-y-6 text-left">
  <!-- Thông tin cá nhân -->
  <Accordion title="Thông tin cá nhân" open={true}>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
  </Accordion>

  <!-- Tóm tắt -->
  <Accordion title="Tóm tắt bản thân" open={true}>
    <textarea
      class="textarea"
      rows="5"
      placeholder="Giới thiệu ngắn gọn về bản thân, kỹ năng và mục tiêu nghề nghiệp..."
      bind:value={profileData.summary.content}
    ></textarea>
  </Accordion>

  <!-- Kinh nghiệm làm việc -->
  <Accordion title="Kinh nghiệm làm việc" open={true}>
    <div class="space-y-6">
      {#each profileData.workExperiences as exp, i (i)}
        <div class="border-t border-slate-200 pt-6" transition:slide>
          <div class="mb-4 flex items-center justify-between">
            <h3 class="font-medium text-slate-700">Kinh nghiệm #{i + 1}</h3>
            <button
              class="btn-danger !h-8 !w-8 !rounded-full !p-2"
              onclick={() => removeWorkExperience(i)}
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </div>
          <div class="space-y-4">
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
        </div>
      {/each}
      <button class="btn-secondary w-full" onclick={addWorkExperience}
        >+ Thêm kinh nghiệm</button
      >
    </div>
  </Accordion>

  <!-- Học vấn -->
  <Accordion title="Học vấn" open={true}>
    <div class="space-y-6">
      {#each profileData.educations as edu, i (i)}
        <div class="border-t border-slate-200 pt-6" transition:slide>
          <div class="mb-4 flex items-center justify-between">
            <h3 class="font-medium text-slate-700">Học vấn #{i + 1}</h3>
            <button
              class="btn-danger !h-8 !w-8 !rounded-full !p-2"
              onclick={() => removeEducation(i)}
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </div>
          <div class="space-y-4">
            <input
              class="input"
              placeholder="Trường/Tổ chức"
              bind:value={edu.institution}
            />
            <input
              class="input"
              placeholder="Bằng cấp"
              bind:value={edu.degree}
            />
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
        </div>
      {/each}
      <button class="btn-secondary w-full" onclick={addEducation}
        >+ Thêm học vấn</button
      >
    </div>
  </Accordion>
</div>

<div class="mt-12 flex justify-center">
  <button class="btn-primary px-12 py-3 text-lg" onclick={onComplete}>
    Hoàn tất & Xem kết quả →
  </button>
</div>
