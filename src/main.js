const { app, BrowserWindow, Menu } = require("electron");
const path = require('path');
const glasstron = require("glasstron");

if (require('electron-squirrel-startup')) { 
    app.quit();
}

let mainWindow;
let menu = new Menu();

function createWindow() {
    mainWindow = new glasstron.BrowserWindow({
        autoHideMenuBar: true,
        height: 500,
        width: 945,
        frame: false,
        transparent: true,
        blur: true,
		blurType: "blurbehind",
		blurGnomeSigma: 100,
		blurCornerRadius: 20,
        icon: path.join(__dirname, 'Icons/Terminal.ico'),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            experimentalFeatures: true
        }
    });
    mainWindow.webContents.once("did-finish-load", function(){
        mainWindow.webContents.send("create-titlebar");
    })
    mainWindow.setMenu(menu);

    mainWindow.loadFile("src/pages/index.html");
    mainWindow.on("closed", function() {
        mainWindow = null;
        app.quit();
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

