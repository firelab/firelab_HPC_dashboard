from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Route to fetch current jobs
@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    jobs = [
        {"id": 101, "name": "Job A", "status": "Running", "submittedAt": "2024-11-15 10:00:00"},
        {"id": 102, "name": "Job B", "status": "Pending", "submittedAt": "2024-11-15 10:05:00"},
        {"id": 103, "name": "Job C", "status": "Completed", "submittedAt": "2024-11-15 09:30:00"},
    ]
    return jsonify(jobs)

# Route to handle job submissions
@app.route("/api/submit-job", methods=["POST"])
def submit_job():
    data = request.json
    # Add logic to process job submission
    return jsonify({"message": f"Job {data['name']} submitted successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
