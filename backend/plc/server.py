from flask import Flask, jsonify, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

preparing_juice = False

@app.route('/')
def main():
    return jsonify(name="Plc Service")

@app.route('/speak')
def speak(msg):
    # Here we can run motors to sync lips and speak with microphone
    return msg

@app.route('/juice')
def handle_juice(juice):
    # Here you can prepare any type of juice you wanted
    global preparing_juice

    if preparing_juice:
        abort(400, "Already preparing Juice")
        
    prepare_juice = True
    return jsonify(msg="Started to prepare juice")

if __name__ == '__main__':
    app.run(port=5001)