from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# -------------------
# 1️⃣ Connect to RDS
# Replace the values with your RDS info
DB_USER = "Fatemeh"
DB_PASSWORD = "Vsn8615$"
DB_HOST = "tasks-db.ctckeuu8ytly.ca-central-1.rds.amazonaws.com"
DB_PORT = "5432"
DB_NAME = "tasks_db"

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# -------------------

# -------------------
# 2️⃣ Create Tasks table
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), nullable=False)
    done = db.Column(db.Boolean, default=False)

# Create the table (run once)
with app.app_context():
    db.create_all()
# -------------------

# -------------------
# 3️⃣ Routes
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{'task': t.task, 'done': t.done} for t in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(task=data['task'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added!"}), 201

# Optional: mark task done
@app.route('/tasks/<int:id>/done', methods=['PUT'])
def mark_done(id):
    task = Task.query.get_or_404(id)
    task.done = True
    db.session.commit()
    return jsonify({"message": "Task marked as done!"})
# -------------------

if __name__ == '__main__':
    app.run(debug=True)    
    