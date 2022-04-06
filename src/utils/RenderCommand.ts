export interface CmdObjectEvent {
    detail: {
        command: string;
        result: string;
    }
}

export interface CmdObject {
        command: string;
        result: string;
}

export interface Observer {
    getUpdate: (cmd: CmdObject) => void;
}

export class RenderCommand extends EventTarget{
    private static instance: RenderCommand;
    private _renderCmdList: CmdObject[];

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
    
    public addItemCmdList(object: CmdObject): void {
        this._renderCmdList.push(object);
        this.dispatchEvent(
            new CustomEvent('newCmd', this.castCmdObject(object))
        );
    }

    public castCmdObject(cmd: CmdObject): CmdObjectEvent {
        return {'detail': cmd};
    }

    public getLastCmd(): CmdObject{
        return this._renderCmdList[-1];
    }
}