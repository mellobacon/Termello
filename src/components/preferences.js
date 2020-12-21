"use strict"
const electron = require("electron");
const ipc = electron.ipcRenderer;

const themes = document.querySelector("#themes");

themes.addEventListener("change", function(){
    const theme = themes.options;
    const option = themes.selectedIndex;
    ipc.send("theme", theme[option].text);
})