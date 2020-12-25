"use strict"
const electron = require("electron");
const ipc = electron.ipcRenderer;

const themes = document.querySelector("#themes");
const fontsize = document.querySelector(".counter-num");
const increment = document.querySelector("#ctrl-plus");
const decrement = document.querySelector("#ctrl-minus");

themes.addEventListener("change", function(){
    const theme = themes.options;
    const option = themes.selectedIndex;
    ipc.send("theme", theme[option].text);
})
increment.addEventListener("click", function(){
    console.log("up");
})
decrement.addEventListener("click", function(){
    console.log("down");
})