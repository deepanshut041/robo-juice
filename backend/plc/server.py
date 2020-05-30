from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return jsonify(name="Plc Service")

@app.route('/speak')
def speak(msg):
    # Here we can run motors to sync lips and speak with microphone
    return msg

if __name__ == '__main__':
    app.run(port=5001)