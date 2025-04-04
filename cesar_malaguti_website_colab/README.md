# Instruções para o Google Colab

Este arquivo contém instruções para hospedar o site de César Malaguti no Google Colab.

## Passos para hospedar o site

1. Faça upload do arquivo zip `cesar_malaguti_website.zip` para o Google Colab
2. Execute os seguintes comandos no Colab:

```python
# Instalar dependências
!pip install flask flask-cors

# Extrair os arquivos do site
!unzip cesar_malaguti_website.zip -d /content/
!mv /content/cesar_malaguti_website_colab /content/cesar_malaguti_website

# Criar o arquivo do servidor Flask
%%writefile /content/app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='/content/cesar_malaguti_website')
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "" or path == "/":
        return send_from_directory('/content/cesar_malaguti_website', 'index.html')
    try:
        return send_from_directory('/content/cesar_malaguti_website', path)
    except:
        return send_from_directory('/content/cesar_malaguti_website', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

# Iniciar o servidor
!python /content/app.py
```

3. Clique no link fornecido pelo Colab para acessar o site

## Funcionalidades implementadas

1. **Sistema de Login Discreto**:
   - Um pequeno ponto (·) no rodapé do site serve como botão de login
   - Credenciais configuradas:
     - Email: cesarmalaguti@gmail.com
     - Senha: mala1312

2. **Interface de Administração**:
   - Após o login, uma barra de administração aparece no topo do site
   - Botões para ativar/desativar o modo de edição, trocar imagem e salvar alterações

3. **Edição de Conteúdo em Todas as Abas**:
   - Capacidade de editar o nome completo do site (César Malaguti Andrade Soares)
   - Edição in-line de todos os textos do site em todas as abas quando o modo de edição está ativado
   - Sistema de salvamento que preserva as alterações mesmo após sair do site

4. **Upload de Imagem de Perfil**:
   - Funcionalidade para trocar a imagem do círculo azul por uma foto personalizada
   - Interface intuitiva para seleção e recorte da imagem

5. **Suporte Multilíngue**:
   - Bandeiras do Brasil e Inglaterra no canto superior direito para alternar entre português e inglês
   - Capacidade de editar o conteúdo em ambos os idiomas no modo administrador

## Instruções de uso

1. Para acessar o modo de administração:
   - Clique no ponto (·) no rodapé do site
   - Insira as credenciais (email: cesarmalaguti@gmail.com, senha: mala1312)
   - Clique em "Entrar"

2. Para editar o conteúdo:
   - Após fazer login, clique em "Ativar Edição"
   - Clique em qualquer texto para editá-lo, incluindo o nome do site
   - Após concluir as edições, clique em "Salvar Alterações"

3. Para trocar a imagem de perfil:
   - Após fazer login, clique em "Trocar Imagem"
   - Selecione uma nova imagem do seu computador
   - Clique em "Salvar Imagem"

4. Para alternar entre idiomas:
   - Clique na bandeira do Brasil para português
   - Clique na bandeira da Inglaterra para inglês
   - No modo de edição, você pode editar o conteúdo em ambos os idiomas

5. Para sair do modo de administração:
   - Clique no botão "Sair" na barra de administração
