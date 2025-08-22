<script lang="ts">
  type Template = { id: string; name: string; thumbnail: string };
  let {
    template,
    group,
    name,
  }: { template: Template; group: string; name: string } = $props();
</script>

<label class="template-card-label">
  <input type="radio" {name} class="sr-only" value={template.id} bind:group />
  <div class="template-card">
    <img
      src={template.thumbnail}
      alt="Thumbnail for {template.name} template"
      class="h-auto w-full rounded-md border border-slate-200 object-cover"
      loading="lazy"
    />
    <p class="mt-2 text-center text-sm font-medium text-slate-700">
      {template.name}
    </p>
  </div>
</label>
