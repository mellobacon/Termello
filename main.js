const {app, BrowserWindow} = require("electron");

let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        height: 450,
        width: 800,
        icon: __dirname + '/Icons/Terminal.ico',
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function() {
    if (mainWindow === null) {
        createWindow();
    }
});
