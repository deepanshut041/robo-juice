const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev'); 
const { spawn } = require('child_process');


let mainWindow = null
let spawnedChild = null

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, fullscreen: !isDev})
    mainWindow.removeMenu()

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './front-end/build/index.html')}`;
    mainWindow.loadURL(startURL)
    mainWindow.webContents.openDevTools()
    spawnPythonServer()
}

function spawnPythonServer() {
    spawnedChild = spawn('python', ['cgs/server.py']);
    spawnedChild.stdout.on('data', (data) => console.log(data.toString('utf8')));
    spawnedChild.on('error', (err) => console.error(err));
}   

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
    if (spawnedChild) {
        spawnedChild.stdin.pause();
        spawnedChild.kill();
    }
})