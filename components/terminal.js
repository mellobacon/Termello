"use strict";

const termwindow = $(".window");
const termwindow_ = document.querySelector(".window"); // This is here to get the clear command working

const prompt_ = "$";
const path = "~ ";
let command = "";

let onlinestatus = navigator.onLine ? span("status-success", "Online" + "\n") : span("status-fail", "Offline" + "\n"); // gets whether app is online or not
let status = span("title", "Emulator Status: ") + onlinestatus;


// UTILITY
function span(classname, message_){
    return "<span class=\"" + classname + "\">" + message_ + "</span>"
}
// END UTILITY

//TODO Move these to their own class
// List of command functions
function clear(){
    termwindow_.textContent = "";
}
function echo(args){
    let str = args.join(" ");
    termwindow.append(str + "\n");
}
function help(){
    commands.forEach(element => {
        termwindow.append(element.name + " - " + element.description + "\n");
    });
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
function whatis(args) {
    commands.forEach(element => {
        if (args == element.name){
            termwindow.append(element.name + " - " + element.description + "\n");
        }
    })
}
// End command functions




// List of commands
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
    "function": kill,
    "description": "Kills running command (not yet implemented)"
}, {
    "name": "whatis",
    "function": whatis,
    "description": "Displays help about a single command"
}];
// End commands




let commandHistory = [];
let historyIndex = 0;

// Functions for making the terminal do its job
function processcommand(){
    let isValid = false;

    let args = command.split(" ");
    let cmd = args[0];
    args.shift();

    // Iterate through the available commands to find a match.
    // Then call that command and pass in any arguments.
    for (let i = 0; i < commands.length; i++) {
        // Process the command
        if (cmd === commands[i].name) {
            commands[i].function(args);
            isValid = true;
            break;
        }
    }

    if (!isValid) {
        termwindow.append(span("status-fail", "Command not found: " + command + "\n"));
    }

    // Add to command history and clean up
	commandHistory.push(command);
	historyIndex = commandHistory.length;
	command = "";
}

function appendcommand(str){
    termwindow.append(str);
    command += str;
}

function clearcommand(){
    if (command.length > 0){
        erase(command.length);
    }
}

function erase(n){
    command = command.slice(0, -n);
    termwindow.html(termwindow.html().slice(0, -n));
}
// End console functionality


// Allows backspacing
document.addEventListener("keydown", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
    if (key == 8) {
        console.log(command)
        e.preventDefault();
        if (command !== "" && command !== "\n") {
            erase(1);
        }
        termwindow_.scrollBy({
                top: termwindow_.scrollHeight,
                behavior: "smooth"
            })
    }
    // Allows moving through command history
	if (key === 38 || key === 40) {
        // Move up or down the history
        // Up key
        if (key === 38) {
            historyIndex--;
            if (historyIndex < 0) {
                historyIndex++;
            }
        } 
        // Down key
        else if (key === 40) {
            historyIndex++;
            if (historyIndex > commandHistory.length - 1) {
                historyIndex--;
            }
        }

        // Get command
        var cmd = commandHistory[historyIndex];
        if (cmd !== undefined) {
            console.log(cmd);
            clearcommand();
            appendcommand(cmd);
        }
        termwindow_.scrollBy({
            top: termwindow_.scrollHeight,
            behavior: "smooth"
        })
    }
})

// Allows typing
document.addEventListener("keypress", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
    switch (key){
        case 13:
            termwindow.append("\n");
            if (command.trim().length !== 0){
                processcommand();
            }
            displayprompt();
            termwindow_.scrollBy({
                top: termwindow_.scrollHeight,
                behavior: "smooth"
            })
            break;
        default:
            e.preventDefault();
            appendcommand(String.fromCharCode(key));
    }
})
// End typing


// Displays "$ ~ in the console (default for now until file paths work)"
function displayprompt(){
    termwindow.append(span("prompt", prompt_));
    termwindow.append(span("path", path));
    termwindow_.scrollBy({
        top: termwindow_.scrollHeight,
        behavior: "smooth"
    })
}

// Some startup stuffs
function startterminal(){
    termwindow.append(span("title", "Terminal Emulator - Electron 11.1.0\n"));
    termwindow.append(status);
    termwindow.append(span("message", "For commands type: help (note: not all commands will be functional)\n"))
    displayprompt();
}

startterminal();
