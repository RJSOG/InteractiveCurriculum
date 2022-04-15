import { CmdObject } from "../RenderCommand";
import { Command } from "../CmdLexerParser";
import { RenderCommand } from "../RenderCommand";

export default class CommandTemplate {
    private _command: Command
    private _result: string;
    private _description: string;
    private _RenderCommandInstance: RenderCommand;

    constructor(cmd: Command) {
        this._command = cmd;
        this._result = "";
        this._description = "";
        this._RenderCommandInstance = RenderCommand.getInstance();
    }

    public toCmdObject(): CmdObject {
        return {
            type: 'cmd',
            command: this._command,
            result: this._result
        };
    }

    public run(): void {}

    public get result(): string {
        return this._result;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get command(): Command {
        return this._command;
    }

    public set command(value: Command) {
        this._command = value;
    }

    public set result(value: string) {
        this._result = value;
    }

    public get RenderCommandInstance(): RenderCommand {
        return this._RenderCommandInstance;
    }
}