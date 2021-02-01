var shell = require('shelljs');

//#region Command Functions
function cd(arg){
    shell.cd(arg[0]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}

function clear(){
    termwindow_.textContent = "";
}
//#endregion

//#region Commands
const commands = [
    {
    "name": "cd",
    "function": cd,
    "description": "Change to given directory. If no directory is given returns to current directory"
},{
    "name": "clear",
    "function": clear,
    "description": "Clears the terminal"
},];
//#endregion


exports.cmdlist = commands;