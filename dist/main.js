const {app, BrowserWindow, Menu, ipcMain} = require("electron");
const shell = require("electron").shell;

let mainWindow;
let menu = new Menu();

function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        height: 500,
        width: 900,
        frame: false,
        transparent: true,
        icon: "../Icons/Terminal.ico",
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
