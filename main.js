const {app, BrowserWindow, Menu, MenuItem} = require("electron");
if (require('electron-squirrel-startup')) return app.quit();

let mainWindow;
let w;
const menu = new Menu();
function x(){
    w = new BrowserWindow({
        autoHideMenuBar: true,
        height: 400,
        width: 500,
        frame: false
    });
    w.loadURL(`file://${__dirname}/preferences.html`)
    w.on("closed", function() {
        w = null;
    });
}
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
                {label:'Debug', click(){
                    
                }},
                {
                    label:'Exit',
                    click(){
                        app.quit()
                    },
                    accelerator:"CmdOrCtrl+Shift+C"
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Preferences",
                    click(){
                        x()
                    }
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu); 

    mainWindow.loadURL(`file://${__dirname}/index.html`);
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
