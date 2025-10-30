// Espera o DOM carregar antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  // --- 1. SCRIPT DO MENU MOBILE ---
  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-mobile-link");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("active");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  }

  // Fechar menu mobile ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // --- 2. SCRIPT DO SWITCH DE TEMA (DARK/LIGHT) ---
  const themeSwitch = document.getElementById("theme-switch");
  const themeLabel = document.getElementById("theme-label");
  const body = document.body;

  // Função para aplicar o tema
  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("light-mode");
      themeSwitch.checked = true;
      themeLabel.textContent = "Modo Claro";
    } else {
      body.classList.remove("light-mode");
      themeSwitch.checked = false;
      themeLabel.textContent = "Modo Escuro";
    }
  }

  // Verifica se o usuário já tem uma preferência salva
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || "dark"); // Padrão é escuro

  // Adiciona o listener para a troca
  themeSwitch.addEventListener("change", (e) => {
    const newTheme = e.target.checked ? "light" : "dark";
    localStorage.setItem("theme", newTheme); // Salva a preferência
    applyTheme(newTheme);
  });

  // --- 3. SCRIPT DO FAQ (ACORDEÃO) ---
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const answer = item.querySelector(".faq-answer");

      // Verifica se o item clicado já está ativo
      const isActive = item.classList.contains("active");

      // Fecha todos os outros itens
      document.querySelectorAll(".faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-answer").classList.remove("active");
        otherItem.querySelector(".faq-question").classList.remove("active");
      });

      // Se o item clicado não estava ativo, abre ele
      if (!isActive) {
        item.classList.add("active");
        answer.classList.add("active");
        question.classList.add("active");
      }
    });
  });

  // --- 4. SCRIPT DO CARROSSEL DE CURSOS (SWIPER.JS) ---
  const swiper = new Swiper(".cursos-carousel", {
    slidesPerView: 1,
    spaceBetween: 24, // Espaço entre os slides
    loop: true,
    // Navegação (Setas)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Responsivo
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // --- 5. SCRIPT DO CARROSSEL DE LOGOS (INFINITO) ---
  const scrollers = document.querySelectorAll(".logo-scroller");

  // Verifica se o usuário prefere movimento reduzido
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".logo-scroller-inner");
      const scrollerContent = Array.from(scrollerInner.children);

      // Duplica os logos para criar o efeito infinito
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  // --- 6. SCRIPT DO ANO ATUAL (FOOTER) ---
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});
