from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return jsonify(
        name="PLC Controller"
    )

@app.route('/drink/make')
def makeDrink(self):
    print("Making Drink")

    return "Done"

@app.route('/msg/read')
def speakMsg(self, msg):
    print(msg)

    return "Done"

if __name__ == '__main__':
    app.run()