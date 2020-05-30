from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import time

detect = True

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return jsonify(name="Plc Service")

@app.route('/detect')
def detection():
    global detect
    s = request.args.get('status')
    if s == 'on':
        detect = True
    if s == 'off':
        detect = False

    return jsonify(msg="Detection service", status = detect)



def yolo():
    time.sleep(1)

if __name__ == '__main__':
    flask_t = threading.Thread(target=app.run, args=('127.0.0.1','5002'))
    flask_t.start()

    while(True):
        if(detect):
            yolo()
            print("detecting")
        else:
            time.sleep(1)
            print("Skipping")


    