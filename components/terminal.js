"use strict";

const p = document.createElement("p");
const div = document.createElement("div");

const termwindow = document.querySelector(".window");

const prompt_ = "$";
const path = "~ ";
let command = "";

// List of commands
function clear(){
    termwindow.textContent = "";
}
function echo(args){
    const str = args.join(" ");
    termwindow.append(str + "\n");
}
function help(){
    termwindow.append("There is no help. Yet. Suffer.\n");
}
function exit(){
    window.close();
}
function whoami(){
    termwindow.append("Command not available\n");
}
function kill(){
    termwindow.append("Command not available\n")
}
function brackeys(){
    // make brackeys logo
}

const commands = [{
    "name": "clear",
    "function": clear
}, {
    "name": "help",
    "function": help
}, {
    "name": "echo",
    "function": echo
}, {
    "name": "exit",
    "function": exit
}, {
    "name": "whoami",
    "function": whoami
}, {
    "name": "kill",
    "function" : kill
}];

const commandHistory = [];
let historyIndex = 0;

function processcommand(){
    const args = command.split(' ');
    //Use the find method which is better then a for loop
    const cmd = commands.find(cmd => cmd.name == args[0]);

    if (cmd == null) termwindow.append("Command not found: " + command);
    else cmd.function();

    // Add to command history and clean up.
    commandHistory.unshift(cmd);
	command = "";
}

const onlinestatus = navigator.onLine ? 'Online\n' : 'Offline\n'; // gets whether app is online or not
const status = 'Emulator Status: ' + onlinestatus;

function startterminal(){
    termwindow.append("Terminal Emulator - Electron " + process.versions.electron + "\n");
    termwindow.append(status + "\n");
    displayprompt();
}

// Displays "$ ~ in the console (default)"
function displayprompt(){
    termwindow.append(prompt_);
    termwindow.append(path);
}

function appendcommand(str){
    termwindow.append(str);
    command += str;
}

function erase(n){
    if(command.length == 0) return;
    command = command.slice(0, -n);
    termwindow.textContent = termwindow.textContent.slice(0, -n);
}

document.addEventListener("keydown", function(e){
    e = e || window.Event;
    const key = typeof e.which === "number" ? e.which : e.key;
    if (key == 8) erase(1);
})

// Allows typing to go brr (except erasing for no fucking reason)
//Now it's fixed :)
document.addEventListener("keypress", function(e){
    e = e || window.Event;
    const key = typeof e.which === "number" ? e.which : e.key;
    switch (key){
        case 13:
            appendcommand(" \n");
            if (command.trim().length !== 0){
                processcommand();
            }
            displayprompt();
            break;
        default:
            e.preventDefault();
            appendcommand(String.fromCharCode(key));
    }
})

// Some startup stuffs
startterminal();
