"use strict";
//#region variables
const { spawn } = require('child_process');
const { loadavg } = require('os');
const ls = spawn('MelloShell.exe', ['-lh', '/usr']);
let com = "";

const termwindow = $(".window");
const termwindow_ = document.querySelector(".window");
let command = "";
//#endregion

//#region UTILITY
function span(classname, message_){
  return "<span class=\"" + classname + "\">" + message_ + "</span>"
}

// Functions for making the terminal do its job
function processcommand(c){
  ls.stdin.write(c);
  c = "";
  ls.stdin.end();
}

function appendcommand(str){
  termwindow.append(str);
  command += str;
}

function erase(n){
  command = command.slice(0, -n);
  termwindow.html(termwindow.html().slice(0, -n));
}
// End console functionality
// END UTILITY
//#endregion


ls.stdout.on('data', (data) => {
  com = `${data}`;
  
  termwindow.append(span("prompt", com));

  // Allows backspacing
  document.addEventListener("keydown", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
    if (key == 8) {
        e.preventDefault();
        if (command !== "" && command !== "\n") {
          erase(1);
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
          processcommand(command);
        }
        termwindow.append(span("prompt", com));
        termwindow_.scrollBy({
          top: termwindow_.scrollHeight,
          behavior: "smooth"
        })
        break;
      default:
        e.preventDefault();
        appendcommand(String.fromCharCode(key));
        termwindow_.scrollBy({
          top: termwindow_.scrollHeight,
          behavior: "smooth"
        })
    }
  })
  // End typing
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});







