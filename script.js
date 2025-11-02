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

function typeTick(){
  const txt = phrases[tIndex];
  if(forward){
    char++;
    if(char > txt.length){ forward = false; setTimeout(typeTick, 900); return; }
  } else {
    char--;
    if(char < 0){ forward = true; tIndex = (tIndex + 1) % phrases.length; setTimeout(typeTick, 300); return;}
  }
  typedEl.textContent = txt.slice(0, char);
  setTimeout(typeTick, forward ? 80 : 40);
}
typeTick();

/* Smooth scroll helper */
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}
window.scrollToSection = scrollToSection;

/* IntersectionObserver for fade-in sections */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
    }
  });
},{threshold:0.12});

document.querySelectorAll('.card-fade').forEach(el => observer.observe(el));

/* Scroll to top button visibility */
const scrollTopBtn = $('#scroll-top');
if(scrollTopBtn){
  window.addEventListener('scroll', () => {
    if(window.scrollY > 420) scrollTopBtn.style.display = 'block';
    else scrollTopBtn.style.display = 'none';
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

/* Contact form handling (local only) */
const contactForm = $('#contact-form');
const toast = $('#toast');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    // Basic validation
    if(!name || !email || !message){
      showToast('Please complete all fields.');
      return;
    }
    // Simulate sending
    showToast('Message sent — thanks! (demo mode)');
    contactForm.reset();
  });
}

/* small toast helper */
function showToast(text, duration = 3000){
  toast.textContent = text; 
  toast.style.display='block';
  setTimeout(()=>{ toast.style.display='none'; }, duration);
}

/* Contact button scroll focus */
const contactBtn = $('#contact-btn');
if(contactBtn){
  contactBtn.addEventListener('click', (e)=>{
    setTimeout(()=>{ $('#name').focus(); }, 700);
  });
}

/* Close button (optional) */
const closeContact = $('#close-contact');
if(closeContact){
  closeContact.addEventListener('click', () => {
    showToast('Contact panel closed');
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
  });
}

/* Small accessibility: enable keyboard focus for CTA buttons */
$$('.cta').forEach(btn => btn.addEventListener('keyup', e => {
  if(e.key === 'Enter') btn.click();
}));

/* Updated Demo buttons toast */
const demoButtons = document.querySelectorAll(".demo-btn");
if(toast && demoButtons.length){
  demoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);
    });
  });
}
