// Espera o DOM carregar para executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. NAVEGAÇÃO MÓVEL (MENU HAMBÚRGUER)
     */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navMenuLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('is-active');
        hamburgerBtn.classList.toggle('is-active');
        hamburgerBtn.setAttribute('aria-expanded', isActive.toString());
        
        // Trava o scroll do body quando o menu está aberto
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link (para SPAs)
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    /**
     * 2. CARROSSEL DE LOGOS (Autoplay pausável)
     * Usando animação CSS, apenas pausamos no hover.
     */
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const carouselViewport = document.getElementById('logo-carousel');
        
        carouselViewport.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselViewport.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }

    /**
     * 3. ANIMAÇÃO DE SCROLL (Intersection Observer)
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    };

    const animationObserver = new IntersectionObserver(observerCallback, {
        root: null, // Observa em relação ao viewport
        threshold: 0.1  // Aciona quando 10% do elemento está visível
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    /**
     * 4. VALIDAÇÃO DO FORMULÁRIO
     */
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');

    // Mapeia mensagens de erro customizadas
    const errorMessages = {
        valueMissing: 'Este campo é obrigatório.',
        typeMismatch: 'Por favor, insira um e-mail válido.',
        tooShort: 'Sua mensagem precisa ter pelo menos 10 caracteres.',
    };

    const getErrorMessage = (input) => {
        if (input.validity.valueMissing) {
            return errorMessages.valueMissing;
        }
        if (input.validity.typeMismatch) {
            return errorMessages.typeMismatch;
        }
        if (input.validity.tooShort) {
            return errorMessages.tooShort;
        }
        return input.validationMessage; // Fallback para mensagem do navegador
    };

    const updateFieldValidation = (input) => {
        const formControl = input.closest('.form-control');
        const errorSpan = formControl.querySelector('.error-message');

        if (!input.validity.valid) {
            // Inválido
            formControl.classList.add('is-invalid');
            formControl.classList.remove('is-valid');
            errorSpan.textContent = getErrorMessage(input);
        } else {
            // Válido
            formControl.classList.remove('is-invalid');
            formControl.classList.add('is-valid');
            errorSpan.textContent = '';
        }
    };

    // Valida no "blur" (quando o usuário sai do campo)
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            updateFieldValidation(input);
        });
    });

    // Impede o envio do formulário se for inválido
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real

        let isFormValid = true;
        
        // Valida todos os campos ao tentar enviar
        formInputs.forEach(input => {
            updateFieldValidation(input);
            if (!input.validity.valid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Simulação de envio
            console.log('Formulário válido. Enviando dados...');
            alert('Obrigado pelo seu contato! (Simulação de envio)');
            contactForm.reset(); // Limpa o formulário
            formInputs.forEach(input => {
                input.closest('.form-control').classList.remove('is-valid');
            });
        } else {
            console.log('Formulário inválido. Corrija os erros.');
            // Foca no primeiro campo inválido
            contactForm.querySelector('.is-invalid input, .is-invalid textarea, .is-invalid select').focus();
        }
    });

});
