<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <title>Profile Vault AI - Trình tạo CV và Portfolio thông minh</title>
  <meta
    name="description"
    content="Tạo CV và website portfolio chuyên nghiệp nhanh chóng với sự trợ giúp của AI."
  />
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-900">
  <header
    class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md"
    data-no-print
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <a href="/" class="flex items-center gap-3">
          <img src={favicon} alt="Profile Vault AI Logo" class="h-8 w-8" />
          <span class="text-xl font-bold tracking-tight text-primary-600"
            >Profile Vault AI</span
          >
        </a>
        <p class="hidden text-sm text-slate-500 md:block">
          Trình tạo hồ sơ thông minh thế hệ mới
        </p>
      </div>
    </div>
  </header>

  <main class="w-full flex-grow">
    {@render children()}
  </main>

  <footer
    class="border-t bg-white py-6 text-center text-sm text-slate-500"
    data-no-print
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <p>
        &copy; {new Date().getFullYear()} Profile Vault AI. All rights reserved.
      </p>
      <p class="mt-1">
        Made with ❤️ using
        <a
          href="https://kit.svelte.dev"
          class="text-primary-600 hover:underline">SvelteKit</a
        >
      </p>
    </div>
  </footer>
</div>
