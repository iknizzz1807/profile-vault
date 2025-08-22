<script lang="ts">
  import { extractTextFromFiles } from "$lib/services/fileExtractor";
  import UploadCloudIcon from "./icons/UploadCloudIcon.svelte";
  import FileIcon from "./icons/FileIcon.svelte";
  import TrashIcon from "./icons/TrashIcon.svelte";
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
  }

  function removeFile(fileToRemove: File) {
    selectedFiles = selectedFiles.filter((file) => file !== fileToRemove);
  }

  async function handleSubmit() {
    if (selectedFiles.length === 0) return;

    const textContent = await extractTextFromFiles(selectedFiles);
    if (textContent.trim()) {
      onTextExtracted(textContent);
      selectedFiles = []; // Xóa danh sách file sau khi gửi thành công
    } else {
      alert("Không thể trích xuất nội dung từ các file đã chọn.");
    }
  }

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      addFiles(input.files);
    }
    input.value = ""; // Reset để có thể chọn lại cùng file
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
  class="relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ease-in-out"
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
    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.txt,.md"
  />
  <label
    for="file-upload"
    class="cursor-pointer flex flex-col items-center justify-center space-y-4"
  >
    <UploadCloudIcon class="w-16 h-16 text-slate-400" />
    <div class="flex flex-col text-sm text-slate-600">
      <span class="font-semibold text-primary-600">
        Nhấn để tải lên
        <span class="text-slate-500 font-normal">hoặc kéo thả file vào đây</span
        >
      </span>
    </div>
    <p class="text-xs text-slate-500">Hỗ trợ: PDF, DOCX, TXT, MD</p>
  </label>
</div>

{#if selectedFiles.length > 0}
  <div class="mt-8" transition:slide>
    <h3 class="text-lg font-semibold text-slate-700 mb-4">Các file đã chọn:</h3>
    <ul class="space-y-3">
      {#each selectedFiles as file (file.name)}
        <li
          class="flex items-center justify-between bg-white p-3 rounded-lg border shadow-sm"
        >
          <div class="flex items-center gap-3 min-w-0">
            <FileIcon class="w-5 h-5 text-slate-500 flex-shrink-0" />
            <span class="text-sm text-slate-800 truncate" title={file.name}
              >{file.name}</span
            >
          </div>
          <button
            class="p-1 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
            onclick={() => removeFile(file)}
            aria-label="Xóa file {file.name}"
          >
            <TrashIcon class="w-4 h-4" />
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
