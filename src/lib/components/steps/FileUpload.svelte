<script lang="ts">
  import { extractTextFromFiles } from "$lib/services/fileExtractor";
  import UploadCloudIcon from "$lib/components/icons/UploadCloudIcon.svelte";
  import FileIcon from "$lib/components/icons/FileIcon.svelte";
  import TrashIcon from "$lib/components/icons/TrashIcon.svelte";
  import { slide } from "svelte/transition";

  let { onTextExtracted }: { onTextExtracted: (text: string) => void } =
    $props();

  let dragOver = $state(false);
  let selectedFiles = $state<File[]>([]);

  function addFiles(files: FileList) {
    const newFiles = Array.from(files).filter(
      (newFile) =>
        !selectedFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
    );
    selectedFiles.push(...newFiles);
    selectedFiles = selectedFiles;
  }

  function removeFile(fileToRemove: File) {
    selectedFiles = selectedFiles.filter((file) => file !== fileToRemove);
  }

  async function handleSubmit() {
    if (selectedFiles.length === 0) return;

    const textContent = await extractTextFromFiles(selectedFiles);
    if (textContent.trim()) {
      onTextExtracted(textContent);
      selectedFiles = []; // Clear files after successful submission
    } else {
      alert("Không thể trích xuất nội dung từ các file đã chọn.");
    }
  }

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      addFiles(input.files);
    }
    input.value = ""; // Reset to allow re-selecting the same file
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    if (event.dataTransfer?.files) {
      addFiles(event.dataTransfer.files);
    }
  }
</script>

<div
  class="relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ease-in-out"
  class:border-primary-500={dragOver}
  class:bg-primary-50={dragOver}
  class:scale-105={dragOver}
  ondragover={(e) => {
    e.preventDefault();
    dragOver = true;
  }}
  ondragleave={() => (dragOver = false)}
  ondrop={handleDrop}
>
  <input
    type="file"
    multiple
    onchange={handleFileSelect}
    id="file-upload"
    class="hidden"
    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.txt,.md,.csv"
  />
  <label
    for="file-upload"
    class="flex cursor-pointer flex-col items-center justify-center space-y-4"
  >
    <UploadCloudIcon class="h-16 w-16 text-slate-400" />
    <div class="flex flex-col text-sm text-slate-600">
      <span class="font-semibold text-primary-600">
        Nhấn để tải lên
        <span class="font-normal text-slate-500">hoặc kéo thả file vào đây</span
        >
      </span>
    </div>
    <p class="text-xs text-slate-500">Hỗ trợ: PDF, DOCX, TXT, MD, CSV</p>
  </label>
</div>

{#if selectedFiles.length > 0}
  <div class="mt-8" transition:slide>
    <h3 class="mb-4 text-left text-lg font-semibold text-slate-700">
      Các file đã chọn:
    </h3>
    <ul class="space-y-3">
      {#each selectedFiles as file (file.name)}
        <li
          class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3"
        >
          <div class="flex min-w-0 items-center gap-3">
            <FileIcon class="h-5 w-5 flex-shrink-0 text-slate-500" />
            <span class="truncate text-sm text-slate-800" title={file.name}
              >{file.name}</span
            >
          </div>
          <button
            class="rounded-full p-1 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600"
            onclick={() => removeFile(file)}
            aria-label="Xóa file {file.name}"
          >
            <TrashIcon class="h-4 w-4" />
          </button>
        </li>
      {/each}
    </ul>

    <div class="mt-8 text-center">
      <button
        class="btn-primary text-lg"
        onclick={handleSubmit}
        disabled={selectedFiles.length === 0}
      >
        Gửi {selectedFiles.length} file để phân tích
      </button>
    </div>
  </div>
{/if}
