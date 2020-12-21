class commands_ {
    constructor() {
        
    }

    test(){
        return "hello";
    }
    clear(){
        termwindow_.textContent = "";
    }
     echo(args){
        let str = args.join(" ");
        termwindow.append(str + "\n");
    }
    help(){
        commands.forEach(element => {
            termwindow.append(element.name + " - " + element.description + "\n");
        });
    }
     exit(){
        window.close();
    }
    whoami(){
        termwindow.append("Command not available\n");
    }
    kill(){
        termwindow.append("Command not available\n")
    }
    whatis(args) {
        commands.forEach(element => {
            if (args == element.name){
                termwindow.append(element.name + " - " + element.description + "\n");
            }
        })
    }
}
exports.CMDS = new commands_()