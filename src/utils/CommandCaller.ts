import CommandTemplate from "./Cmd/CommandTemplate";
import CmdHelp from "./Cmd/Help/Help";
import { Command } from "./CmdLexerParser";

export default class CommandCaller {
    private static instance: CommandCaller;
    private _cmdList: string[];

    constructor() {
        this._cmdList = ['ls','cd', 'help', 'wget', 'exit'];
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
                    runningCmd.run();
                }
            }
        }
    }

    public get cmdList(): string[] {
        return this._cmdList;
    }

    private commandMapper(cmd: Command): CommandTemplate {
        const mapper: any = {
            'help': new CmdHelp(cmd),
        }
        return mapper[cmd.name];
    }
}