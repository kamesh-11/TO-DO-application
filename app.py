from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_todo():
    todo = request.json.get('todo')
    if todo:
        todos.append(todo)
        return jsonify({'success': True})
    return jsonify({'success': False})

@app.route('/delete', methods=['POST'])
def delete_todo():
    todo = request.json.get('todo')
    if todo in todos:
        todos.remove(todo)
        return jsonify({'success': True})
    return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True)
