// Variável global para o idioma atual
let currentLanguage = 'pt'; // Idioma padrão: português

// Função para alternar a visibilidade dos elementos com base no idioma
function toggleLanguageElements(lang) {
    // Seleciona todos os elementos com atributo data-lang
    const langElements = document.querySelectorAll('[data-lang]');
    
    // Alterna a visibilidade com base no idioma
    langElements.forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Função para mudar o idioma
function changeLanguage(lang) {
    if (lang === currentLanguage) return;
    
    // Atualiza o idioma atual
    currentLanguage = lang;
    
    // Atualiza as classes ativas dos botões de idioma
    const ptFlag = document.querySelector('.pt-flag');
    const enFlag = document.querySelector('.en-flag');
    
    if (ptFlag && enFlag) {
        if (lang === 'pt') {
            ptFlag.classList.add('active');
            enFlag.classList.remove('active');
        } else {
            ptFlag.classList.remove('active');
            enFlag.classList.add('active');
        }
    }
    
    // Alterna a visibilidade dos elementos com base no idioma
    toggleLanguageElements(lang);
    
    // Carrega o conteúdo do idioma selecionado
    if (typeof loadSavedContent === 'function') {
        loadSavedContent();
    }
}

// Adiciona seletores de idioma
function addLanguageSelectors() {
    const header = document.querySelector('header .container');
    
    if (header && !document.querySelector('.language-selector')) {
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        
        // Bandeira do Brasil (português)
        const ptFlag = document.createElement('button');
        ptFlag.className = 'flag-btn pt-flag' + (currentLanguage === 'pt' ? ' active' : '');
        ptFlag.setAttribute('data-lang', 'pt');
        ptFlag.setAttribute('aria-label', 'Português');
        ptFlag.title = 'Português';
        
        // Bandeira da Inglaterra (inglês)
        const enFlag = document.createElement('button');
        enFlag.className = 'flag-btn en-flag' + (currentLanguage === 'en' ? ' active' : '');
        enFlag.setAttribute('data-lang', 'en');
        enFlag.setAttribute('aria-label', 'English');
        enFlag.title = 'English';
        
        // Adiciona os eventos de clique
        ptFlag.addEventListener('click', function() {
            changeLanguage('pt');
        });
        
        enFlag.addEventListener('click', function() {
            changeLanguage('en');
        });
        
        languageSelector.appendChild(ptFlag);
        languageSelector.appendChild(enFlag);
        
        header.appendChild(languageSelector);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona os seletores de idioma
    addLanguageSelectors();
    
    // Configura o idioma inicial
    toggleLanguageElements(currentLanguage);
});
