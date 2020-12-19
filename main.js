const {app, BrowserWindow, Menu, MenuItem} = require("electron");
if (require('electron-squirrel-startup')) return app.quit();

let mainWindow;
const menu = new Menu();

function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        height: 450,
        width: 800,
        frame: false,
        transparent: true,
        icon: __dirname + '/Icons/Terminal.ico',
        webPreferences: {
            nodeIntegration: true
        }
    });

    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {label:'About'},
                {label:'Exit'}
            ]
        },
        {
            label: "Edit",
            submenu: [
                {label: "Preferences"}
            ]
        }
    ])
    Menu.setApplicationMenu(menu); 

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
