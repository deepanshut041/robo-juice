from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send

from constant import ShopState

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

shop_status = ShopState.EMPTY

@app.route('/')
def main():
    return jsonify(name="Master Service")

@socketio.on('status')
def handle_shop_status():
    send("shop_status", shop_status)

if __name__ == '__main__':
    socketio.run(app)