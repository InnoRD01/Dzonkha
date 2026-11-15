// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  })
);

// Header border once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Fade sections in as they enter the viewport
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.documentElement.classList.add("js");
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    io.observe(el);
  });
}

// Newsletter form (front end only: connect it to your email provider)
const form = document.querySelector(".signup");
const msg = document.querySelector(".form-msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  input.classList.toggle("invalid", !ok);
  if (!ok) {
    msg.textContent = "Please enter a valid email address.";
    return;
  }
  msg.textContent = "Thank you. We'll write when the next flush arrives.";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
