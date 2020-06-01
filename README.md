# Robo Juice

Robo Juice Skeleton repository

## Getting Started

Clone the repo, and then

### Running React

```bash
cd front-end
npm install
npm start
```

### Running Electron and Python

I strongly recommend developing Python applications in virtual environment.

```bash
cd robo-juice
pip install -r requirements.txt
npm install
npm start
```

If properly configured, the above commands should have no problem. Otherwise, please check out the guides online.

## Core functions

**Note**: Unwanted lines of files of removed just for demonstration purposes.

### 1. Python Servers

#### 1.1 Master Server

We want to build up a Flask server in Python end so that we can communicate with it using React Service. The file is located under `/backend/master/server.py`

```python
import rpyc
...

# Setting up flask server with socket
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

# Stetting rpyc client for image detection and plcservice
detection_service = rpyc.connect("localhost", 18861).root
plc_service = rpyc.connect("localhost", 18862).root

# Temporary
...

if __name__ == '__main__':
    socketio.run(app)
```

#### 1.2 Image Detection Service

We build detection service with `rpyc` server so that we can communicate with it using other services. The file is located under `/backend/detection/detection_service.py`.

```python
import rpyc
...

class DetectionTask:
    ...
    # This function run a infinite loop and read frame from camera and provide this frames to detection.
    # The detect function detect wether there is human in frame or not.
    def run(self):
        while True:
            if(self._detect):
                time.sleep(0.5)
                ret, frame = self.cap.read()
                result = detect(frame)
            else:
                time.sleep(1)
                print("Not Detecting")

class DetectionService(rpyc.Service):
    ...
    # Start Detection Service and capature camera
    def exposed_detection_start(self):
        if(not self.c.status()):
            self.c.start()

    # Give current status of detection service.
    def exposed_detection_status(self):
        return self.c.status()

    # Stop Detection Service and release camera
    def exposed_detection_end(self):
        if(self.c.status()):
            self.c.pause()
    ...

# Starting rpyc server at port 18861 as single shot server.
if __name__ == '__main__':
    t = rpyc.OneShotServer(DetectionService, port=18861)
    t.start()
```

#### 1.3 PLC Service

We also build PLC service with `rpyc` server so that we can communicate with it using other services. The file is located under `/backend/plc/plc_service.py`.

```python
import rpyc

class PlcService(rpyc.Service):
    ...

# Starting rpyc server at port 18862 as single shot server.
if __name__ == '__main__':
    t = rpyc.OneShotServer(PlcService, port=18862)
    t.start()
```

### 2. Node.js / Electron part

Basic idea: In the main process, spawn the Python child process and create the window. All the HTML / JavaScript / CSS are managed by Electron, instead of by Python web server.

In `main.js`, these are default codes to start from, with nothing special

```js
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev'); 
const { spawn } = require('child_process');
...
const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, fullscreen: !isDev})
    mainWindow.removeMenu()

    // In development mode electron get react from port 3000 while at production it get react from build files
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './front-end/build/index.html')}`;
    mainWindow.loadURL(startURL)

    // All servers wether they are detection plc or master
    startDetectionServer()
    startPlcServer()
    startMasterServer()
}
...
app.on('ready', createWindow)
app.on('window-all-closed', () => {
    app.quit()
    ...
})
```
