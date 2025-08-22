<script lang="ts">
  import { onMount } from "svelte";
  import type { MasterProfile } from "$lib/types";

  let { profileData }: { profileData: MasterProfile } = $props();

  const initials = $derived(
    profileData.profileInfo.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  );

  const jobTitle = $derived(
    profileData.workExperiences[0]?.jobTitle || "Professional Extraordinaire"
  );

  onMount(() => {
    // Logic animation giống hệt file script.js
    const faders = document.querySelectorAll(".fade-in");
    if (!faders.length) return;

    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });

    // Cleanup
    return () => {
      faders.forEach((fader) => appearOnScroll.unobserve(fader));
    };
  });
</script>

<div class="container">
  <header class="hero">
    <div class="hero-initials">{initials}</div>
    <h1 class="hero-title">{profileData.profileInfo.fullName}</h1>
    <h2 class="hero-subtitle">{jobTitle}</h2>
    <p class="hero-summary">{profileData.summary.content}</p>
    <div class="hero-links">
      {#if profileData.profileInfo.email}
        <a href="mailto:{profileData.profileInfo.email}" class="btn"
          >Contact Me</a
        >
      {/if}
      {#if profileData.profileInfo.website}
        <a
          href={profileData.profileInfo.website}
          class="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer">Website</a
        >
      {/if}
    </div>
  </header>

  <main>
    <section id="experience" class="fade-in">
      <h2>Work Experience</h2>
      <div class="card-grid">
        {#each profileData.workExperiences as exp}
          <div class="card">
            <h3>{exp.jobTitle}</h3>
            <p class="card-subtitle">{exp.companyName}</p>
            <p class="dates">{exp.startDate} - {exp.endDate || "Present"}</p>
            <p>{exp.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <section id="education" class="fade-in">
      <h2>Education</h2>
      <div class="card-grid">
        {#each profileData.educations as edu}
          <div class="card">
            <h3>{edu.degree}</h3>
            <p class="card-subtitle">{edu.institution}</p>
            <p class="dates">{edu.startDate} - {edu.endDate || "Present"}</p>
            <p>{edu.fieldOfStudy}</p>
          </div>
        {/each}
      </div>
    </section>
  </main>

  <footer class="fade-in">
    <p>
      &copy; {new Date().getFullYear()}
      {profileData.profileInfo.fullName}. Built with passion.
    </p>
  </footer>
</div>

<style>
  @import "./style.css";
</style>
