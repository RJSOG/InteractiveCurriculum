import CommandTemplate from "../Cmd/CommandTemplate";
import CmdHelp from "../Cmd/Help";
import CmdClear from "../Cmd/Clear";
import { Command } from "./CmdLexerParser";

export default class CommandCaller {
    private static instance: CommandCaller;
    private _cmdList: string[];

    constructor() {
        this._cmdList = ['ls','cd', 'help', 'wget', 'exit', 'clear'];
    }

    public static getInstance(): CommandCaller {
        if(!CommandCaller.instance) {
            CommandCaller.instance = new CommandCaller();
        }
        return CommandCaller.instance;
    }

    public execute(cmdExecutionList: Command[]): void {
        if(cmdExecutionList.length !== 0){
            while(cmdExecutionList.length !== 0){
                const cmd = cmdExecutionList.shift();
                if(cmd !== undefined){
                    const runningCmd = this.commandMapper(cmd);
                    if(runningCmd !== null) runningCmd.run();
                }
            }
        }
    }

    public get cmdList(): string[] {
        return this._cmdList;
    }

    private commandMapper(cmd: Command): CommandTemplate | null{
        const mapper: any = {
            'help': new CmdHelp(cmd),
            'clear': new CmdClear(cmd),
        }
        if(mapper[cmd.name] !== undefined){
            return mapper[cmd.name];
        };
        return null;
    }
}