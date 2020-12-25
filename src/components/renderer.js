const customTitlebar = require('custom-electron-titlebar');
const { ipcRenderer, remote} = require('electron');


function createSettingsWindow(){
    let w = new remote.BrowserWindow({
        autoHideMenuBar: true,
        height: 400,
        width: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    w.webContents.openDevTools();

    w.loadFile("src/pages/preferences.html");
    
    w.on("closed", function(){
        w = null;
    });
}


ipcRenderer.once("create-titlebar", function(){
    const menu = new remote.Menu();
    menu.append(new remote.MenuItem({
        label: "File",
            submenu: [
                {
                    label: "About",
                    click(){
                        remote.shell.openExternal("https://github.com/mellobacon/Termello");
                    }
                },
                {
                    label: "Exit",
                    click(){
                        remote.app.quit();
                    },
                }
            ]
    }));
    menu.append(new remote.MenuItem({
        label: "Edit",
            submenu: [
                {
                    label: "Preferences",
                    click(){
                        createSettingsWindow();
                    },
                }
            ]
    }));
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#444'),
        icon: "../Icons/Terminal.ico",
        menu: menu,
    });
})
