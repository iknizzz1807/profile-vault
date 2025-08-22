document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  if (!faders.length) return;

  const appearOptions = {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Start a little earlier
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target); // Animate only once
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});
