import { ICmdObject } from "../ShellModel/RenderCommand";
import { Command } from "../ShellModel/CmdLexerParser";
import { RenderCommand } from "../ShellModel/RenderCommand";

export default class CommandTemplate {
    private _command: Command
    private _result: string;
    private _description: string;
    private _name: string;
    private _RenderCommandInstance: RenderCommand;

    constructor(cmd: Command) {
        this._command = cmd;
        this._result = "";
        this._description = "";
        this._name = "";
        this._RenderCommandInstance = RenderCommand.getInstance();
    }

    public toCmdObject(): ICmdObject {
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

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get RenderCommandInstance(): RenderCommand {
        return this._RenderCommandInstance;
    }
}