const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev'); 


let mainWindow = null

const createWindow = () => {

    mainWindow = new BrowserWindow({ width: 800, height: 600, fullscreen: !isDev})
    mainWindow.removeMenu()

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './front-end/build/index.html')}`;

    mainWindow.loadURL(startURL)

    var python = require('child_process').spawn('python', ['./hello.py']);
    python.stdout.on('data',function(data){
        console.log("data: ",data.toString('utf8'));
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})