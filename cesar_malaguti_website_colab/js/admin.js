// Script para funcionalidades de administração

// Configurações e variáveis globais
const ADMIN_EMAIL = 'cesarmalaguti@gmail.com';
const ADMIN_PASSWORD = 'mala1312';
let editMode = false;
// Idioma padrão definido no arquivo language.js

// Função para verificar se o usuário está logado
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Função para adicionar o botão de login no rodapé
function addLoginButton() {
    const footerP = document.querySelector('footer .container p');
    
    // Verifica se o botão já existe
    if (!document.querySelector('.login-link')) {
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.className = 'login-link';
        loginLink.textContent = '·';
        loginLink.title = 'Área administrativa';
        loginLink.setAttribute('aria-label', 'Área administrativa');
        
        footerP.appendChild(document.createTextNode(' '));
        footerP.appendChild(loginLink);
    }
}

// Função para criar a barra de administração
function createAdminBar() {
    // Verifica se a barra já existe
    if (document.querySelector('.admin-bar')) {
        return;
    }
    
    const adminBar = document.createElement('div');
    adminBar.className = 'admin-bar';
    
    const adminBarContainer = document.createElement('div');
    adminBarContainer.className = 'admin-bar-container';
    
    const adminBarTitle = document.createElement('div');
    adminBarTitle.className = 'admin-bar-title';
    adminBarTitle.textContent = 'Modo Administrador';
    
    const adminBarActions = document.createElement('div');
    adminBarActions.className = 'admin-bar-actions';
    
    // Botão para ativar/desativar modo de edição
    const editButton = document.createElement('button');
    editButton.className = 'admin-btn';
    editButton.id = 'toggleEditMode';
    editButton.textContent = 'Ativar Edição';
    
    // Botão para trocar imagem de perfil
    const imageButton = document.createElement('button');
    imageButton.className = 'admin-btn';
    imageButton.id = 'changeProfileImage';
    imageButton.textContent = 'Trocar Imagem';
    
    // Botão para salvar alterações
    const saveButton = document.createElement('button');
    saveButton.className = 'admin-btn success';
    saveButton.id = 'saveChanges';
    saveButton.textContent = 'Salvar Alterações';
    saveButton.style.display = 'none';
    
    // Botão para logout
    const logoutButton = document.createElement('button');
    logoutButton.className = 'admin-btn danger';
    logoutButton.id = 'adminLogout';
    logoutButton.textContent = 'Sair';
    
    // Adiciona os botões à barra
    adminBarActions.appendChild(editButton);
    adminBarActions.appendChild(imageButton);
    adminBarActions.appendChild(saveButton);
    adminBarActions.appendChild(logoutButton);
    
    adminBarContainer.appendChild(adminBarTitle);
    adminBarContainer.appendChild(adminBarActions);
    adminBar.appendChild(adminBarContainer);
    
    // Adiciona a barra ao corpo do documento
    document.body.insertBefore(adminBar, document.body.firstChild);
    
    // Adiciona classe ao body para ajustar o padding
    document.body.classList.add('admin-mode');
    
    // Mostra a barra
    adminBar.classList.add('active');
    
    // Configura os eventos dos botões
    setupAdminBarEvents();
}

// Função para configurar os eventos da barra de administração
function setupAdminBarEvents() {
    // Botão de toggle do modo de edição
    const editButton = document.getElementById('toggleEditMode');
    if (editButton) {
        editButton.addEventListener('click', function() {
            toggleEditMode();
        });
    }
    
    // Botão de troca de imagem
    const imageButton = document.getElementById('changeProfileImage');
    if (imageButton) {
        imageButton.addEventListener('click', function() {
            showImageUploadModal();
        });
    }
    
    // Botão de salvar alterações
    const saveButton = document.getElementById('saveChanges');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            saveChanges();
        });
    }
    
    // Botão de logout
    const logoutButton = document.getElementById('adminLogout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logout();
        });
    }
}

// Função para ativar/desativar o modo de edição
function toggleEditMode() {
    editMode = !editMode;
    const editButton = document.getElementById('toggleEditMode');
    const saveButton = document.getElementById('saveChanges');
    
    if (editMode) {
        // Ativa o modo de edição
        editButton.textContent = 'Desativar Edição';
        saveButton.style.display = 'block';
        
        // Torna os elementos editáveis
        makeElementsEditable(true);
    } else {
        // Desativa o modo de edição
        editButton.textContent = 'Ativar Edição';
        saveButton.style.display = 'none';
        
        // Remove a editabilidade dos elementos
        makeElementsEditable(false);
    }
}

// Função para tornar os elementos editáveis ou não
function makeElementsEditable(editable) {
    // Elementos que podem ser editados em todas as páginas
    const editableElements = [];
    
    // Adiciona o logo/nome do site
    const logoElement = document.querySelector('.logo a');
    if (logoElement) {
        editableElements.push(logoElement);
    }
    
    // Adiciona elementos específicos com base na página atual
    const currentPage = getCurrentPage();
    
    if (currentPage === 'index') {
        // Página inicial
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            editableElements.push(heroTitle);
        }
        
        // Parágrafos da seção "about"
        const aboutParagraphs = document.querySelectorAll('.about p');
        aboutParagraphs.forEach(p => editableElements.push(p));
    } 
    else if (currentPage === 'publications') {
        // Página de publicações
        const publicationsTitle = document.querySelector('.publications h1');
        if (publicationsTitle) {
            editableElements.push(publicationsTitle);
        }
        
        // Itens de publicação
        const publicationItems = document.querySelectorAll('.publication-item');
        publicationItems.forEach(item => {
            const title = item.querySelector('h2');
            const details = item.querySelector('p');
            if (title) editableElements.push(title);
            if (details) editableElements.push(details);
        });
    } 
    else if (currentPage === 'projects') {
        // Página de projetos
        const projectsTitle = document.querySelector('.projects h1');
        if (projectsTitle) {
            editableElements.push(projectsTitle);
        }
        
        // Itens de projeto
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            const title = item.querySelector('h2');
            const description = item.querySelector('p');
            if (title) editableElements.push(title);
            if (description) editableElements.push(description);
        });
    } 
    else if (currentPage === 'experience') {
        // Página de experiência
        const experienceTitle = document.querySelector('.experience h1');
        if (experienceTitle) {
            editableElements.push(experienceTitle);
        }
        
        // Itens de experiência
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            const title = item.querySelector('h2');
            const company = item.querySelector('h3');
            const period = item.querySelector('.period');
            const description = item.querySelector('p');
            
            if (title) editableElements.push(title);
            if (company) editableElements.push(company);
            if (period) editableElements.push(period);
            if (description) editableElements.push(description);
        });
    } 
    else if (currentPage === 'education') {
        // Página de formação
        const educationTitle = document.querySelector('.education h1');
        if (educationTitle) {
            editableElements.push(educationTitle);
        }
        
        // Itens de formação
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach(item => {
            const degree = item.querySelector('h2');
            const institution = item.querySelector('h3');
            const period = item.querySelector('.period');
            const description = item.querySelector('p');
            
            if (degree) editableElements.push(degree);
            if (institution) editableElements.push(institution);
            if (period) editableElements.push(period);
            if (description) editableElements.push(description);
        });
    } 
    else if (currentPage === 'contact') {
        // Página de contato
        const contactTitle = document.querySelector('.contact h1');
        if (contactTitle) {
            editableElements.push(contactTitle);
        }
        
        // Informações de contato
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            const title = item.querySelector('h2');
            const info = item.querySelectorAll('p');
            
            if (title) editableElements.push(title);
            info.forEach(p => editableElements.push(p));
        });
    }
    
    // Aplica a editabilidade aos elementos
    editableElements.forEach(element => {
        if (element) {
            element.contentEditable = editable;
            
            // Adiciona ou remove eventos de edição
            if (editable) {
                element.dataset.originalContent = element.innerHTML;
                element.dataset.language = currentLanguage;
            } else {
                // Se o usuário cancelou a edição, restaura o conteúdo original
                if (element.dataset.originalContent && !saveChanges.called) {
                    element.innerHTML = element.dataset.originalContent;
                }
                delete element.dataset.originalContent;
            }
        }
    });
}

// Função para obter a página atual com base na URL
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (!filename || filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    return filename.replace('.html', '');
}

// Função para salvar as alterações
function saveChanges() {
    // Marca a função como chamada para evitar restauração do conteúdo original
    saveChanges.called = true;
    
    // Obtém a página atual
    const currentPage = getCurrentPage();
    
    // Inicializa o objeto de conteúdo se não existir
    let savedContent = JSON.parse(localStorage.getItem('savedContent') || '{}');
    
    // Inicializa o objeto para o idioma atual se não existir
    if (!savedContent[currentLanguage]) {
        savedContent[currentLanguage] = {};
    }
    
    // Inicializa o objeto para a página atual se não existir
    if (!savedContent[currentLanguage][currentPage]) {
        savedContent[currentLanguage][currentPage] = {};
    }
    
    // Salva o nome do site em todas as páginas
    const siteName = document.querySelector('.logo a').textContent;
    savedContent[currentLanguage].siteName = siteName;
    
    // Salva o conteúdo específico da página
    if (currentPage === 'index') {
        // Página inicial
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            savedContent[currentLanguage][currentPage].heroTitle = heroTitle.textContent;
        }
        
        // Parágrafos da seção "about"
        const aboutParagraphs = Array.from(document.querySelectorAll('.about p')).map(p => p.innerHTML);
        savedContent[currentLanguage][currentPage].aboutParagraphs = aboutParagraphs;
    } 
    else if (currentPage === 'publications') {
        // Página de publicações
        const publicationsTitle = document.querySelector('.publications h1');
        if (publicationsTitle) {
            savedContent[currentLanguage][currentPage].title = publicationsTitle.textContent;
        }
        
        // Itens de publicação
        const publicationItems = document.querySelectorAll('.publication-item');
        const publications = [];
        
        publicationItems.forEach(item => {
            const title = item.querySelector('h2');
            const details = item.querySelector('p');
            
            publications.push({
                title: title ? title.innerHTML : '',
                details: details ? details.innerHTML : ''
            });
        });
        
        savedContent[currentLanguage][currentPage].publications = publications;
    } 
    else if (currentPage === 'projects') {
        // Página de projetos
        const projectsTitle = document.querySelector('.projects h1');
        if (projectsTitle) {
            savedContent[currentLanguage][currentPage].title = projectsTitle.textContent;
        }
        
        // Itens de projeto
        const projectItems = document.querySelectorAll('.project-item');
        const projects = [];
        
        projectItems.forEach(item => {
            const title = item.querySelector('h2');
            const description = item.querySelector('p');
            
            projects.push({
                title: title ? title.innerHTML : '',
                description: description ? description.innerHTML : ''
            });
        });
        
        savedContent[currentLanguage][currentPage].projects = projects;
    } 
    else if (currentPage === 'experience') {
        // Página de experiência
        const experienceTitle = document.querySelector('.experience h1');
        if (experienceTitle) {
            savedContent[currentLanguage][currentPage].title = experienceTitle.textContent;
        }
        
        // Itens de experiência
        const experienceItems = document.querySelectorAll('.experience-item');
        const experiences = [];
        
        experienceItems.forEach(item => {
            const title = item.querySelector('h2');
            const company = item.querySelector('h3');
            const period = item.querySelector('.period');
            const description = item.querySelector('p');
            
            experiences.push({
                title: title ? title.innerHTML : '',
                company: company ? company.innerHTML : '',
                period: period ? period.innerHTML : '',
                description: description ? description.innerHTML : ''
            });
        });
        
        savedContent[currentLanguage][currentPage].experiences = experiences;
    } 
    else if (currentPage === 'education') {
        // Página de formação
        const educationTitle = document.querySelector('.education h1');
        if (educationTitle) {
            savedContent[currentLanguage][currentPage].title = educationTitle.textContent;
        }
        
        // Itens de formação
        const educationItems = document.querySelectorAll('.education-item');
        const educations = [];
        
        educationItems.forEach(item => {
            const degree = item.querySelector('h2');
            const institution = item.querySelector('h3');
            const period = item.querySelector('.period');
            const description = item.querySelector('p');
            
            educations.push({
                degree: degree ? degree.innerHTML : '',
                institution: institution ? institution.innerHTML : '',
                period: period ? period.innerHTML : '',
                description: description ? description.innerHTML : ''
            });
        });
        
        savedContent[currentLanguage][currentPage].educations = educations;
    } 
    else if (currentPage === 'contact') {
        // Página de contato
        const contactTitle = document.querySelector('.contact h1');
        if (contactTitle) {
            savedContent[currentLanguage][currentPage].title = contactTitle.textContent;
        }
        
        // Informações de contato
        const contactItems = document.querySelectorAll('.contact-item');
        const contacts = [];
        
        contactItems.forEach(item => {
            const title = item.querySelector('h2');
            const info = Array.from(item.querySelectorAll('p')).map(p => p.innerHTML);
            
            contacts.push({
                title: title ? title.innerHTML : '',
                info: info
            });
        });
        
        savedContent[currentLanguage][currentPage].contacts = contacts;
    }
    
    // Salva o conteúdo no localStorage
    localStorage.setItem('savedContent', JSON.stringify(savedContent));
    
    // Desativa o modo de edição
    toggleEditMode();
    
    // Exibe mensagem de sucesso
    alert('Alterações salvas com sucesso!');
    
    // Reseta o flag
    saveChanges.called = false;
}

// Função para criar o modal de upload de imagem
function createImageUploadModal() {
    // Verifica se o modal já existe
    if (document.querySelector('.modal-overlay')) {
        return;
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Cabeçalho do modal
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = 'Trocar Imagem de Perfil';
    
    const modalClose = document.createElement('button');
    modalClose.className = 'modal-close';
    modalClose.innerHTML = '&times;';
    modalClose.setAttribute('aria-label', 'Fechar');
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalClose);
    
    // Corpo do modal
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    const imageUploadContainer = document.createElement('div');
    imageUploadContainer.className = 'image-upload-container';
    
    const imagePreview = document.createElement('div');
    imagePreview.className = 'image-preview';
    
    const previewImg = document.createElement('img');
    previewImg.id = 'imagePreview';
    previewImg.src = document.querySelector('.profile-img').src;
    previewImg.alt = 'Prévia da imagem';
    
    imagePreview.appendChild(previewImg);
    
    const imageUploadLabel = document.createElement('label');
    imageUploadLabel.className = 'image-upload-label';
    imageUploadLabel.htmlFor = 'imageUpload';
    imageUploadLabel.textContent = 'Escolher Imagem';
    
    const imageUploadInput = document.createElement('input');
    imageUploadInput.type = 'file';
    imageUploadInput.id = 'imageUpload';
    imageUploadInput.className = 'image-upload-input';
    imageUploadInput.accept = 'image/*';
    
    imageUploadContainer.appendChild(imagePreview);
    imageUploadContainer.appendChild(imageUploadLabel);
    imageUploadContainer.appendChild(imageUploadInput);
    
    modalBody.appendChild(imageUploadContainer);
    
    // Rodapé do modal
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'admin-btn';
    cancelButton.textContent = 'Cancelar';
    
    const saveImageButton = document.createElement('button');
    saveImageButton.className = 'admin-btn success';
    saveImageButton.textContent = 'Salvar Imagem';
    
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(saveImageButton);
    
    // Monta o modal
    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);
    
    modalOverlay.appendChild(modal);
    
    // Adiciona o modal ao corpo do documento
    document.body.appendChild(modalOverlay);
    
    // Configura os eventos do modal
    setupModalEvents();
}

// Função para configurar os eventos do modal
function setupModalEvents() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const cancelButton = document.querySelector('.modal-footer .admin-btn:not(.success)');
    const saveImageButton = document.querySelector('.modal-footer .admin-btn.success');
    const imageUploadInput = document.getElementById('imageUpload');
    
    // Evento de fechar o modal
    modalClose.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
    });
    
    cancelButton.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
    });
    
    // Evento de clique fora do modal para fechar
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    
    // Evento de upload de imagem
    imageUploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Evento de salvar imagem
    saveImageButton.addEventListener('click', function() {
        const newImageSrc = document.getElementById('imagePreview').src;
        
        // Atualiza a imagem de perfil
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.src = newImageSrc;
            
            // Salva a imagem no localStorage
            localStorage.setItem('profileImage', newImageSrc);
            
            // Fecha o modal
            modalOverlay.classList.remove('active');
            
            // Exibe mensagem de sucesso
            alert('Imagem de perfil atualizada com sucesso!');
        }
    });
}

// Função para mostrar o modal de upload de imagem
function showImageUploadModal() {
    // Cria o modal se não existir
    if (!document.querySelector('.modal-overlay')) {
        createImageUploadModal();
    }
    
    // Mostra o modal
    document.querySelector('.modal-overlay').classList.add('active');
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.reload();
}

// Função para carregar o conteúdo salvo
function loadSavedContent() {
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
        const content = JSON.parse(savedContent);
        
        // Verifica se há conteúdo para o idioma atual
        if (content[currentLanguage]) {
            // Atualiza o nome do site em todas as páginas
            if (content[currentLanguage].siteName) {
                const logoElement = document.querySelector('.logo a');
                if (logoElement) {
                    logoElement.textContent = content[currentLanguage].siteName;
                }
            }
            
            // Obtém a página atual
            const currentPage = getCurrentPage();
            
            // Verifica se há conteúdo para a página atual
            if (content[currentLanguage][currentPage]) {
                const pageContent = content[currentLanguage][currentPage];
                
                if (currentPage === 'index') {
                    // Página inicial
                    if (pageContent.heroTitle) {
                        const heroTitle = document.querySelector('.hero-content h1');
                        if (heroTitle) {
                            heroTitle.textContent = pageContent.heroTitle;
                        }
                    }
                    
                    // Parágrafos da seção "about"
                    if (pageContent.aboutParagraphs) {
                        const aboutParagraphs = document.querySelectorAll('.about p');
                        aboutParagraphs.forEach((p, index) => {
                            if (pageContent.aboutParagraphs[index]) {
                                p.innerHTML = pageContent.aboutParagraphs[index];
                            }
                        });
                    }
                } 
                else if (currentPage === 'publications') {
                    // Página de publicações
                    if (pageContent.title) {
                        const publicationsTitle = document.querySelector('.publications h1');
                        if (publicationsTitle) {
                            publicationsTitle.textContent = pageContent.title;
                        }
                    }
                    
                    // Itens de publicação
                    if (pageContent.publications) {
                        const publicationItems = document.querySelectorAll('.publication-item');
                        publicationItems.forEach((item, index) => {
                            if (pageContent.publications[index]) {
                                const pub = pageContent.publications[index];
                                const title = item.querySelector('h2');
                                const details = item.querySelector('p');
                                
                                if (title && pub.title) title.innerHTML = pub.title;
                                if (details && pub.details) details.innerHTML = pub.details;
                            }
                        });
                    }
                } 
                else if (currentPage === 'projects') {
                    // Página de projetos
                    if (pageContent.title) {
                        const projectsTitle = document.querySelector('.projects h1');
                        if (projectsTitle) {
                            projectsTitle.textContent = pageContent.title;
                        }
                    }
                    
                    // Itens de projeto
                    if (pageContent.projects) {
                        const projectItems = document.querySelectorAll('.project-item');
                        projectItems.forEach((item, index) => {
                            if (pageContent.projects[index]) {
                                const proj = pageContent.projects[index];
                                const title = item.querySelector('h2');
                                const description = item.querySelector('p');
                                
                                if (title && proj.title) title.innerHTML = proj.title;
                                if (description && proj.description) description.innerHTML = proj.description;
                            }
                        });
                    }
                } 
                else if (currentPage === 'experience') {
                    // Página de experiência
                    if (pageContent.title) {
                        const experienceTitle = document.querySelector('.experience h1');
                        if (experienceTitle) {
                            experienceTitle.textContent = pageContent.title;
                        }
                    }
                    
                    // Itens de experiência
                    if (pageContent.experiences) {
                        const experienceItems = document.querySelectorAll('.experience-item');
                        experienceItems.forEach((item, index) => {
                            if (pageContent.experiences[index]) {
                                const exp = pageContent.experiences[index];
                                const title = item.querySelector('h2');
                                const company = item.querySelector('h3');
                                const period = item.querySelector('.period');
                                const description = item.querySelector('p');
                                
                                if (title && exp.title) title.innerHTML = exp.title;
                                if (company && exp.company) company.innerHTML = exp.company;
                                if (period && exp.period) period.innerHTML = exp.period;
                                if (description && exp.description) description.innerHTML = exp.description;
                            }
                        });
                    }
                } 
                else if (currentPage === 'education') {
                    // Página de formação
                    if (pageContent.title) {
                        const educationTitle = document.querySelector('.education h1');
                        if (educationTitle) {
                            educationTitle.textContent = pageContent.title;
                        }
                    }
                    
                    // Itens de formação
                    if (pageContent.educations) {
                        const educationItems = document.querySelectorAll('.education-item');
                        educationItems.forEach((item, index) => {
                            if (pageContent.educations[index]) {
                                const edu = pageContent.educations[index];
                                const degree = item.querySelector('h2');
                                const institution = item.querySelector('h3');
                                const period = item.querySelector('.period');
                                const description = item.querySelector('p');
                                
                                if (degree && edu.degree) degree.innerHTML = edu.degree;
                                if (institution && edu.institution) institution.innerHTML = edu.institution;
                                if (period && edu.period) period.innerHTML = edu.period;
                                if (description && edu.description) description.innerHTML = edu.description;
                            }
                        });
                    }
                } 
                else if (currentPage === 'contact') {
                    // Página de contato
                    if (pageContent.title) {
                        const contactTitle = document.querySelector('.contact h1');
                        if (contactTitle) {
                            contactTitle.textContent = pageContent.title;
                        }
                    }
                    
                    // Informações de contato
                    if (pageContent.contacts) {
                        const contactItems = document.querySelectorAll('.contact-item');
                        contactItems.forEach((item, index) => {
                            if (pageContent.contacts[index]) {
                                const contact = pageContent.contacts[index];
                                const title = item.querySelector('h2');
                                const infos = item.querySelectorAll('p');
                                
                                if (title && contact.title) title.innerHTML = contact.title;
                                if (contact.info) {
                                    infos.forEach((p, i) => {
                                        if (contact.info[i]) p.innerHTML = contact.info[i];
                                    });
                                }
                            }
                        });
                    }
                }
            }
        }
    }
    
    // Carrega a imagem de perfil salva
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.src = savedImage;
        }
    }
}

// Função para adicionar seletores de idioma
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
    
    // Carrega o conteúdo do idioma selecionado
    loadSavedContent();
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o botão de login discreto
    addLoginButton();
    
    // Adiciona os seletores de idioma
    addLanguageSelectors();
    
    // Verifica se o usuário está logado
    if (isLoggedIn()) {
        // Cria a barra de administração
        createAdminBar();
    }
    
    // Carrega o conteúdo salvo
    loadSavedContent();
});
