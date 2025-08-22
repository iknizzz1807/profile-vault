<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <title>Profile Vault AI - Trình tạo CV thông minh</title>
  <meta
    name="description"
    content="Tạo CV chuyên nghiệp nhanh chóng với sự trợ giúp của AI. Tải lên, chỉnh sửa và tải xuống CV của bạn."
  />
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900 font-body flex flex-col">
  <header
    class="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm"
    data-no-print
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <img src={favicon} alt="Profile Vault AI Logo" class="h-8 w-8" />
          <a href="/" class="text-xl font-bold text-primary-600"
            >Profile Vault AI</a
          >
        </div>
        <p class="hidden md:block text-sm text-slate-500">
          Trình tạo CV thông minh thế hệ mới
        </p>
      </div>
    </div>
  </header>

  <main class="flex-grow py-8 sm:py-12">
    {@render children?.()}
  </main>

  <footer
    class="text-center py-6 text-slate-500 text-sm border-t bg-white mt-12"
    data-no-print
  >
    <p>
      &copy; {new Date().getFullYear()} Profile Vault AI. All rights reserved.
    </p>
    <p class="mt-1">
      Made with ❤️ using <a
        href="https://kit.svelte.dev"
        class="text-primary-600 hover:underline">SvelteKit</a
      >
    </p>
  </footer>
</div>
