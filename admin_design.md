# Design das Funcionalidades de Administração

## Requisitos
- Botão discreto de login no site
- Sistema de autenticação com email e senha predefinidos
  - Email: cesarmalaguti@gmail.com
  - Senha: mala1312
- Interface de administração para edição de conteúdo
- Funcionalidade para trocar a imagem de perfil
- Capacidade de editar o nome do site

## Estrutura do Sistema de Administração

### 1. Sistema de Login
- Adicionar um botão discreto de login no rodapé do site
- Criar uma página de login com formulário para email e senha
- Implementar autenticação do lado do cliente usando localStorage
- Redirecionar para o modo de edição após login bem-sucedido

### 2. Interface de Administração
- Adicionar uma barra de administração no topo do site quando logado
- Incluir botões para:
  - Ativar/desativar modo de edição
  - Fazer upload de nova imagem de perfil
  - Salvar alterações
  - Logout

### 3. Funcionalidades de Edição
- Implementar edição in-line para textos (títulos, parágrafos)
- Criar um sistema para editar o nome do site no cabeçalho
- Adicionar funcionalidade de upload de imagem para a foto de perfil
- Salvar alterações no localStorage para persistência

## Implementação Técnica

### Arquivos a Serem Criados
- `admin.js`: Lógica principal de administração
- `login.html`: Página de login
- `admin.css`: Estilos para a interface de administração

### Modificações em Arquivos Existentes
- Adicionar botão de login no `footer` em todos os arquivos HTML
- Incluir referência ao `admin.js` e `admin.css` em todos os arquivos HTML
- Modificar elementos HTML para suportar edição in-line

### Fluxo de Funcionamento
1. Usuário clica no botão de login discreto no rodapé
2. Usuário é redirecionado para a página de login
3. Após autenticação bem-sucedida, usuário retorna à página inicial com modo de administração ativado
4. Usuário pode editar conteúdos, trocar imagem de perfil e modificar o nome do site
5. Alterações são salvas no localStorage
6. Usuário pode fazer logout quando terminar
