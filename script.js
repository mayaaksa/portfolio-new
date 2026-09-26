const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const darkSections = [...document.querySelectorAll('.projects-section, .site-footer')];

menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', open);
});

function updateNavbarState() {
  if (!navbar) return;

  const isDarkArea = darkSections.some((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.5 && rect.bottom >= 120;
  });

  navbar.classList.toggle('navbar-scrolled', window.scrollY > 12 || isDarkArea);
  navbar.classList.toggle('navbar-dark', isDarkArea);
}

window.addEventListener('scroll', updateNavbarState);
window.addEventListener('resize', updateNavbarState);
updateNavbarState();

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cities = document.querySelectorAll('.city');
cities.forEach(city => {
  city.addEventListener('mouseenter', () => {
    cities.forEach(item => item.classList.remove('active'));
    city.classList.add('active');
  });
});

const heroArt = document.querySelector('.hero-art');
window.addEventListener('mousemove', (event) => {
  if (window.innerWidth < 850 || !heroArt) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 8;
  const y = (event.clientY / window.innerHeight - 0.5) * 8;
  heroArt.style.transform = `translate(${x}px, ${y}px)`;
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroArt && window.innerWidth > 850) {
    heroArt.style.marginTop = `${Math.min(scrolled * 0.08, 35)}px`;
  }
});
