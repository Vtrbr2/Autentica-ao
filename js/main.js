document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para seções
  window.scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animação ao rolar
  const sections = document.querySelectorAll('.wf-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => observer.observe(sec));

  // Hamburger menu (visual)
  const hamburger = document.querySelector('.wf-hamburger');
  const menu = document.querySelector('.wf-menu');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('show');
  });

  // Carrossel de logos
  const track = document.getElementById('logoTrack');
  const prevBtn = document.querySelector('.logo-carousel .prev');
  const nextBtn = document.querySelector('.logo-carousel .next');

  let autoScroll;

  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      track.scrollBy({ left: track.querySelector('img').clientWidth + 32, behavior: 'smooth' });
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3000);
  };

  const stopAutoScroll = () => clearInterval(autoScroll);

  prevBtn?.addEventListener('click', () => {
    stopAutoScroll();
    track.scrollBy({ left: -(track.querySelector('img').clientWidth + 32), behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    stopAutoScroll();
    track.scrollBy({ left: track.querySelector('img').clientWidth + 32, behavior: 'smooth' });
  });

  track?.addEventListener('mouseenter', stopAutoScroll);
  track?.addEventListener('mouseleave', startAutoScroll);

  startAutoScroll();
});
