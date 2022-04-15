import CommandTemplate from "../CommandTemplate";
import { Command } from "../../CmdLexerParser";

export default class CmdWget extends CommandTemplate {
    constructor(cmd: Command) {
        super(cmd);
        this.description = "wget command";
    }

    public run(): void {
        this.getRequest();
        this.RenderCommandInstance.addItemCmdList(this.toCmdObject());
    }

    public getRequest(): void {
        this.result = "wget command";
    }   
}           