from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Caminho para o arquivo JSON que armazenará os projetos
PROJECTS_FILE = "projects.json"

def load_projects():
    try:
        with open(PROJECTS_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_projects(projects):
    with open(PROJECTS_FILE, "w", encoding="utf-8") as file:
        json.dump(projects, file, indent=4, ensure_ascii=False)

@app.route("/projects", methods=["GET"])
def get_projects():
    return jsonify(load_projects())

@app.route("/projects", methods=["POST"])
def add_project():
    projects = load_projects()
    new_project = request.json
    projects.append(new_project)
    save_projects(projects)
    return jsonify({"message": "Projeto adicionado com sucesso!"}), 201

@app.route("/projects/<int:index>", methods=["PUT"])
def update_project(index):
    projects = load_projects()
    if 0 <= index < len(projects):
        projects[index] = request.json
        save_projects(projects)
        return jsonify({"message": "Projeto atualizado com sucesso!"})
    return jsonify({"error": "Projeto não encontrado"}), 404

@app.route("/projects/<int:index>", methods=["DELETE"])
def delete_project(index):
    projects = load_projects()
    if 0 <= index < len(projects):
        removed_project = projects.pop(index)
        save_projects(projects)
        return jsonify({"message": "Projeto removido com sucesso!", "project": removed_project})
    return jsonify({"error": "Projeto não encontrado"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
