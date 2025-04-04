// Script principal para o site de César Malaguti

// Função para manipular o menu de navegação responsivo
function setupMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menuToggle.setAttribute('aria-label', 'Menu de navegação');
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .container');
    
    // Adiciona o botão apenas em telas menores via JavaScript
    if (window.innerWidth <= 768) {
        header.insertBefore(menuToggle, nav);
        nav.classList.add('mobile-hidden');
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-hidden');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Ajusta o menu quando a janela é redimensionada
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-toggle')) {
                header.insertBefore(menuToggle, nav);
                nav.classList.add('mobile-hidden');
            }
        } else {
            if (document.querySelector('.menu-toggle')) {
                document.querySelector('.menu-toggle').remove();
                nav.classList.remove('mobile-hidden');
            }
        }
    });
}

// Função para validar o formulário de contato
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                valid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }
            
            if (!email.value.trim() || !email.value.includes('@')) {
                valid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }
            
            if (!subject.value.trim()) {
                valid = false;
                subject.classList.add('error');
            } else {
                subject.classList.remove('error');
            }
            
            if (!message.value.trim()) {
                valid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }
            
            if (valid) {
                // Simulação de envio (em um site real, isso seria um AJAX para um backend)
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simula um atraso de envio
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.textContent = 'Mensagem Enviada!';
                    
                    // Restaura o botão após alguns segundos
                    setTimeout(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
}

// Função para adicionar efeitos de scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para destacar a seção atual no menu de navegação
function setupScrollSpy() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('main section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Inicializa todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupContactForm();
    setupSmoothScroll();
    setupScrollSpy();
    
    // Adiciona classe para animações de entrada
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});
