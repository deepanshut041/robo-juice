import rpyc
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from constant import ShopState

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

shop_status = ShopState.WELCOME
detection_service = rpyc.connect("localhost", 18861).root
plc_service = rpyc.connect("localhost", 18862).root

# Temporary
@app.route('/plc/verify')
def plc_verify():
    return jsonify(msg=plc_service.verify())

@app.route('/detection/verify')
def detection_verify():
    return jsonify(msg=detection_service.verify())

@app.route('/master/verify')
def master_verify():
    return jsonify(status="Master Service is Working")

@app.route('/detection/detect')
def detection():
    s = request.args.get('status')
    if s == 'on':
        detection_service.detection_start()
    if s == 'off':
        detection_service.detection_end()
    return jsonify(msg="Detection service", status = detection_service.detection_status())

@socketio.on('connect')
def connect():
    emit('status', shop_status.name)

if __name__ == '__main__':
    socketio.run(app)