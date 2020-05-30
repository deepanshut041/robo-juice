const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev'); 
const { spawn } = require('child_process');

let mainWindow = null
let masterServer = null
let plcServer = null

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, fullscreen: !isDev})
    mainWindow.removeMenu()

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './front-end/build/index.html')}`;
    mainWindow.loadURL(startURL)
    startMasterServer()
    startPlcServer()
}

function startMasterServer() {
    masterServer = spawn('python', ['backend/master/server.py']);
    masterServer.stdout.on('data', (data) => console.log(data.toString('utf8')));
    masterServer.on('error', (err) => console.error(err));
}   

function startPlcServer(){
    plcServer = spawn('python', ['backend/plc/server.py']);
    plcServer.stdout.on('data', (data) => console.log(data.toString('utf8')));
    plcServer.on('error', (err) => console.error(err));
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
    if (masterServer) {
        masterServer.stdin.pause();
        masterServer.kill();
    }
})