export interface CmdObject {
    command: string;
    result: string;
}

export interface Observer {
    getUpdate: (cmd: CmdObject) => void;
}

export class RenderCommand {
    private static instance: RenderCommand;
    private _renderCmdList: CmdObject[];
    private observers = new Set<Observer>();

    private constructor() {
        this._renderCmdList = [];
    }

    public static getInstance(): RenderCommand {
        if(!RenderCommand.instance) {
            RenderCommand.instance = new RenderCommand();
        }
        return RenderCommand.instance;
    }

    public addItemCmdList(object: CmdObject) {
        this._renderCmdList.push(object);
    }

    public getLastCmd() {
        return this._renderCmdList[-1];
    }

    subscribe(observer: Observer){
        this.observers.add(observer);
    }

    unsubscribe(observer: Observer){
        this.observers.delete(observer);
    }

    notify(cmd: CmdObject){
        this.observers.forEach(observer => observer.update(cmd));
    }
}