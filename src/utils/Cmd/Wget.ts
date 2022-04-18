import CommandTemplate from "./CommandTemplate";
import { Command } from "../ShellModel/CmdLexerParser";

export default class CmdWget extends CommandTemplate {
    constructor(cmd: Command) {
        super(cmd);
        this.description = "Download file over Internet";
        this.name = "wget";
    }

    public run(): void {
        this.getRequest();
        this.RenderCommandInstance.addItemCmdList(this.toCmdObject());
    }

    public getRequest(): void {
        this.result = "wget command";
    }
    
}           