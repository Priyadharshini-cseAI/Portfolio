/* =========================
   Basic interactions & UX
   ========================= */

// small helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// Typed effect (simple)
const phrases = [
  "AI Engineer • Web Developer",
  "Building ML-powered products",
  "Love clean UIs & solid code",
  "Open to internships & roles"
];
let tIndex = 0, char = 0, forward = true;
const typedEl = $('#typed');

function typeTick() {
  const txt = phrases[tIndex];
  if (forward) {
    char++;
    if (char > txt.length) { forward = false; setTimeout(typeTick, 900); return; }
  } else {
    char--;
    if (char < 0) { forward = true; tIndex = (tIndex + 1) % phrases.length; setTimeout(typeTick, 300); return; }
  }
  typedEl.textContent = txt.slice(0, char);
  setTimeout(typeTick, forward ? 80 : 40);
}
typeTick();

/* Smooth scroll helper */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.scrollToSection = scrollToSection;

/* IntersectionObserver for fade-in sections */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card-fade').forEach(el => observer.observe(el));

/* Scroll to top button visibility */
const scrollTopBtn = $('#scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 420 ? 'block' : 'none';
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ✅ Toast helper (for feedback messages) */
const toast = $('#toast');
function showToast(text, duration = 3000) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* Contact button scroll focus */
const contactBtn = $('#contact-btn');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    setTimeout(() => { $('#name')?.focus(); }, 700);
  });
}

/* Close button (optional) */
const closeContact = $('#close-contact');
if (closeContact) {
  closeContact.addEventListener('click', () => {
    showToast('Contact panel closed');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}

/* ✅ Demo buttons toast (for projects) */
const demoButtons = document.querySelectorAll(".demo-btn");
if (toast && demoButtons.length) {
  demoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showToast("Demo coming soon!", 2000);
    });
  });
}

