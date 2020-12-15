"use strict";

const termwindow = document.querySelector(".window");

const prompt_ = "$";
const path = "~ ";
let command = "";

// List of commands
function clear(){
    termwindow.textContent = "";
}
function echo(args){
    let str = args.join(" ");
    termwindow.append(str + "\n");
}
function help(){
    commands.forEach(element => {
        termwindow.append(element.name + " - " + element.description + "\n");
    });;
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
    "function": clear,
    "description": "Clears the terminal"
}, {
    "name": "help",
    "function": help,
    "description": "Displays commands"
}, {
    "name": "echo",
    "function": echo,
    "description": "Returns string given"
}, {
    "name": "exit",
    "function": exit,
    "description": "Exits the application"
}, {
    "name": "whoami",
    "function": whoami,
    "description": "Displays info about user (not yet implemented)"
}, {
    "name": "kill",
    "function" : kill,
    "description": "Kills running command (not yet implemented"
}];

let commandHistory = [];
let historyIndex = 0;

function processcommand(){
    let isValid = false;

    let args = command.split(" ");
    let cmd = args[0];
    args.shift();

    // Iterate through the available commands to find a match.
    // Then call that command and pass in any arguments.
    for (let i = 0; i < commands.length; i++) {
        // Makes sure to ignore newlines in the command
        if (command.match(commands[i].name)){
            cmd = commands[i].name;
        }
        if (cmd === commands[i].name) {
            commands[i].function(args);
            isValid = true;
            break;
        }
    }

    if (!isValid){
        termwindow.append("Command not found: " + command);
    }

    // Add to command history and clean up.
	commandHistory.push(command);
	historyIndex = commandHistory.length;
	command = "";
}

let onlinestatus = navigator.onLine ? 'Online\n' : 'Offline\n'; // gets whether app is online or not
let status = 'Emulator Status: ' + onlinestatus;

function startterminal(){
    termwindow.append("Terminal Emulator - Electron " + process.versions.electron + "\n");
    termwindow.append(status + "\n");
    termwindow.append("For commands type: help (note: not all commands will be functional) \n")
    displayprompt();
}

// Displays "$ ~ in the console (default for now until file paths work)"
function displayprompt(){
    termwindow.append(prompt_);
    termwindow.append(path);
}

function appendcommand(str){
    termwindow.append(str);
    command += str;
}

function erase(n){
    command = command.slice(0, -n);
}

document.addEventListener("keydown", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
    if (key == 8){
        console.log(command)
        e.preventDefault();
        erase(1);
    }
})

// Allows typing
document.addEventListener("keypress", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
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
