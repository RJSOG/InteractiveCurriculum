import CommandTemplate from "./CommandTemplate";
import { Command } from "../ShellModel/CmdLexerParser";

export default class CmdClear extends CommandTemplate {
    constructor(cmd: Command) {
        super(cmd);
        this.description = "Clear shell view";
        this.name = "clear";
    }

    public run(): void {
        this.RenderCommandInstance.clearCmdList();
    }
}