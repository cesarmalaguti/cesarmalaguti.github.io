// Arquivo para configuração do Google Colab
// Este script deve ser executado no Google Colab para hospedar o site

// Função para configurar o ambiente no Google Colab
function setupColabEnvironment() {
  // Instalar dependências necessárias
  !pip install flask flask-cors

  // Criar estrutura de diretórios
  !mkdir -p /content/cesar_malaguti_website

  // Código para criar o servidor Flask
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

  // Iniciar o servidor
  !python /content/app.py
}

// Instruções para o usuário
/*
Para hospedar este site no Google Colab, siga estas etapas:

1. Faça upload de todos os arquivos do site para o Google Colab
2. Execute o seguinte comando para extrair os arquivos:
   !unzip arquivo_do_site.zip -d /content/cesar_malaguti_website

3. Execute o seguinte código para iniciar o servidor:
   !pip install flask flask-cors
   !python /content/app.py

4. Clique no link fornecido pelo Colab para acessar o site
*/
