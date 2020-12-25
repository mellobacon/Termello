const {ipcMain} = require("electron").remote;

function SetFont(){
    const win = document.querySelector(".window");
    let fontsize = parseFloat(window.getComputedStyle(win, null).getPropertyValue("font-size"));
}

ipcMain.on("theme", function(e, arg){
    ToggleTheme(arg);
})