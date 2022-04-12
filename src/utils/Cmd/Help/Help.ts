import CommandTemplate from "../CommandTemplate";
import { Command } from "../../CmdLexerParser";

export default class CmdHelp extends CommandTemplate {
    constructor(cmd: Command) {
        super(cmd);
        this.description = "help command";
    }
    
    public run(): void {
        this.helpText();
        this.RenderCommandInstance.addItemCmdList(this.toCmdObject());
    }

    public helpText(): void {
        this.result = "--------Help--------\n";
        this.result += "ls - list files and folders\n";
        this.result += "cd - change directory\n";
        this.result += "help - show this help\n";
        this.result += "wget - download file\n";
        this.result += "exit - exit from terminal";
    }
}   
