from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send

from constant import ShopState

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

shop_status = ShopState.WELCOME

@app.route('/')
def main():
    return jsonify(status="Master Service")

@app.route('/orders')
def orders():
    emit('orders', "orders", broadcast=True, namespace='/')
    return jsonify(status="Master Service")

@socketio.on('connect')
def connect():
    emit('status', shop_status.name)


if __name__ == '__main__':
    socketio.run(app)