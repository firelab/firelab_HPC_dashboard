from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import subprocess
import os
import logging

# Create Flask app
app = Flask(__name__)
CORS(app, resources={r"/hpc_dashboard/api/*": {"origins": "*"}})

# Configuration
HEAD_NODE_SSH = "root@192.168.56.64"
LOCAL_SCRIPTS_DIR = "/home/gunjan/sbatch_scripts"
LOCAL_LOGS_DIR = "/home/gunjan/logs"
REMOTE_SCRIPTS_DIR = "/home/web/sbatch_scripts"
REMOTE_LOGS_DIR = "/home/web/logs"

@app.route("/hpc_dashboard/api/upload-sbatch", methods=["POST"])
def upload_sbatch():
    app.logger.info("Received request to upload sbatch script.")
    try:
        # Save locally
        sbatch_script = request.files['file']
        local_script_path = os.path.join(LOCAL_SCRIPTS_DIR, sbatch_script.filename)
        sbatch_script.save(local_script_path)
        app.logger.debug(f"Saved sbatch script to {local_script_path}.")

        # Copy file to head node
        copy_command = f"scp {local_script_path} {HEAD_NODE_SSH}:{REMOTE_SCRIPTS_DIR}/"
        app.logger.debug(f"Executing copy command: {copy_command}")
        subprocess.run(copy_command, shell=True, check=True)

        # Execute sbatch command on the head node
        execute_command = f"ssh {HEAD_NODE_SSH} sbatch {REMOTE_SCRIPTS_DIR}/{sbatch_script.filename}"
        app.logger.debug(f"Executing sbatch command: {execute_command}")
        result = subprocess.run(execute_command, shell=True, capture_output=True, text=True, check=True)

        app.logger.info(f"Script submitted successfully: {result.stdout.strip()}")
        return jsonify({"message": "Script submitted", "output": result.stdout}), 200
    except subprocess.CalledProcessError as e:
        app.logger.error(f"Error during command execution: {e.stderr.strip()}")
        return jsonify({"error": str(e), "details": e.stderr.strip()}), 500
    except Exception as ex:
        app.logger.error(f"Unexpected error: {str(ex)}")
        return jsonify({"error": "Unexpected error occurred", "details": str(ex)}), 500


@app.route("/hpc_dashboard/api/get-log/<job_id>", methods=["GET"])
def get_log(job_id):
    app.logger.info(f"Received request to stream logs for job ID: {job_id}")
    try:
        log_path = os.path.join(LOCAL_LOGS_DIR, f"job_{job_id}.log")
        app.logger.debug(f"Log path: {log_path}")

        def stream_log():
            fetch_command = f"ssh {HEAD_NODE_SSH} tail -f {REMOTE_LOGS_DIR}/job_{job_id}.log"
            app.logger.debug(f"Executing log fetch command: {fetch_command}")
            process = subprocess.Popen(fetch_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            try:
                for line in iter(process.stdout.readline, b""):
                    yield f"data: {line.decode('utf-8')}\n\n"
            except GeneratorExit:
                process.terminate()
                app.logger.info(f"Log streaming terminated for job ID: {job_id}")
                raise
            except Exception as ex:
                app.logger.error(f"Error during log streaming: {str(ex)}")
                process.terminate()
                raise

        return Response(stream_with_context(stream_log()), content_type="text/event-stream")
    except subprocess.CalledProcessError as e:
        app.logger.error(f"Error during log retrieval: {e.stderr.strip()}")
        return jsonify({"error": str(e), "details": e.stderr.strip()}), 500
    except Exception as ex:
        app.logger.error(f"Unexpected error: {str(ex)}")
        return jsonify({"error": "Unexpected error occurred", "details": str(ex)}), 500


if __name__ == "__main__":
    app.logger.info("Starting HPC Dashboard backend service...")
    app.run(host="0.0.0.0", port=5001, debug=True)