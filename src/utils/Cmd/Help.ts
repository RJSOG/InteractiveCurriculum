import CommandTemplate from "./CommandTemplate";
import { Command } from "../ShellModel/CmdLexerParser";

export default class CmdHelp extends CommandTemplate {
    constructor(cmd: Command) {
        super(cmd);
        this.description = "Show this help";
        this.name = "help";
    }

    public run(): void {
        this.helpText();
        this.RenderCommandInstance.addItemCmdList(this.toCmdObject());
    }
    
    private readDescription(): void {
        const allCmd = this.importAllCmd();
        this.result += this.formatDescription(this.name, this.description) + "\n";
        allCmd.forEach((cmd: any) => {
            this.result += this.formatDescription(cmd.name, cmd.description) + "\n";
        });
    }

    private importAllCmd(): any[] {
        const wget = require("./Wget").default;
        const clear = require("./Clear").default;
        return [new wget(), new clear()];
    }

    private formatDescription(cmdName: string, description: string): string {
        return `${cmdName} - ${description}`;
    }

    private helpText(): void {
        this.result = "--------Help--------\n";
        this.result += "Available commands:\n";
        this.readDescription();
    }
}   
