import { Command } from "./CmdLexerParser";

export interface ICmdObjectEvent {
    detail: {
        command: Command;
        result: string;
    }
}

export interface ICmdObject {
    type: string;
    command: Command;
            result: string;
}

export class RenderCommand extends EventTarget{
    private static instance: RenderCommand;
    private _renderCmdList: ICmdObject[];

    private constructor() {
        super();
        this._renderCmdList = [];    
    }   

    public static getInstance(): RenderCommand {
        if(!RenderCommand.instance) {
            RenderCommand.instance = new RenderCommand();
        }
        return RenderCommand.instance;
    }
    
    public addItemCmdList(object: ICmdObject): void {
        this._renderCmdList.push(object);
        this.dispatchEvent(
            new CustomEvent('newCmd', this.castCmdObject(object))
        );
    }

    public castCmdObject(cmd: ICmdObject): ICmdObjectEvent {
        return {'detail': cmd};
    }

    public getLastCmd(): ICmdObject{
        return this._renderCmdList[-1];
    }

    public clearCmdList(): void {
        this._renderCmdList = [];
        this.dispatchEvent(
            new CustomEvent('clearCmdList')
        )
    }
}