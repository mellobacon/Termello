var shell = require('shelljs');
shell.config.execPath = shell.which('node').toString()

//#region Command Functions
function brackeys(){
    const str = 
        `
        ######  ######     #     #####  #    # ####### #     #  #####  
        #     # #     #   # #   #     # #   #  #        #   #  #     # 
        #     # #     #  #   #  #       #  #   #         # #   #       
        ######  ######  #     # #       ###    #####      #     #####  
        #     # #   #   ####### #       #  #   #          #          # 
        #     # #    #  #     # #     # #   #  #          #    #     # 
        ######  #     # #     #  #####  #    # #######    #     #####  `
    termwindow.append(str + "\n")
}
function touch(arg){
    termwindow.append(shell.touch(arg[0], arg[1], arg[2]))
}
function test(arg){
    termwindow.append(shell.test(arg[0], arg[1]));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function sort(arg){
    termwindow.append(arg[0], arg[1], arg[2]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function mv(arg){
    termwindow.append(shell.mv(arg[0], arg[1]));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function grep(arg){
    termwindow.append(shell.grep(arg[0],arg[1], arg[2]));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function find(arg){
    termwindow.append(shell.find(arg[0]));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function cp(arg){
    shell.cp(arg[0],arg[1],arg[2]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function cat(arg){
    termwindow.append(shell.cat(arg[0], arg[1]));
}
function rm(arg){
    shell.rm(arg[0], arg[1]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function mkdir(arg){
    shell.mkdir(arg[0], arg[1]);
    termwindow.append("\n");
}
function pwd(){
    termwindow.append(shell.pwd() + "\n");
}
function cd(arg){
    shell.cd(arg[0]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function ls(arg){
    console.log(arg);
    if (arg === undefined){
        arg[1] = shell.pwd();
    }
    if (arg[0] === "-l"){
        arg[0] = "";
    }
    shell.ls(arg[0], arg[1]).forEach(element => {
        element.split(",");
        termwindow.append(element + "\n");
    })
}
function clear(){
    termwindow_.textContent = "";
}
function echo(arg){
    termwindow.append(shell.echo(arg[0], arg[1]))
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
//#endregion

//#region Commands
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
}, {
    "name": "pwd",
    "function": pwd,
    "description": "Returns current directory"
}, {
    "name": "cd",
    "function": cd,
    "description": "Change to given directory. If no directory is given returns to current directory"
}, {
    "name": "ls",
    "function": ls,
    "description": "Lists files in current directory"
}, {
    "name": "mkdir",
    "function": mkdir,
    "description": "Makes a new directory"
}, {
    "name": "rm",
    "function": rm,
    "description": "Remove a directory"
}, {
    "name": "cp",
    "function": cp,
    "description": "Copys files"
}, {
    "name": "cat",
    "function": cat,
    "description": "Opens files"
}, {
    "name": "find",
    "function": find,
    "description": "Lists files via directory"
}, {
    "name": "test",
    "function": test,
    "description": "Evaluates expression using the available primaries and returns corresponding boolean value"
}, {
    "name": "touch",
    "function": touch,
    "description": "Create a file"
}, {
    "name": "sort",
    "function": sort,
    "description": "Returns sorted files"
}, {
    "name": "mv",
    "function": mv,
    "description": "Move a file to destination"
}, {
    "name": "grep",
    "function": grep,
    "description": "Search for a file"
}, {
    "name": "brackeys",
    "function": brackeys,
    "description": "In honor of the big bracks :)"
}];
//#endregion


exports.cmdlist = commands;