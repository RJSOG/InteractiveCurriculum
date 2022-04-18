import { ICmdObject, RenderCommand } from "./RenderCommand";

export default class ShellErrorHandler {
    private static instance: ShellErrorHandler;
    private _RenderCommandInstance: RenderCommand;
    private _errorList: Error[];
    
    constructor(){
        this._errorList = [];
        this._RenderCommandInstance = RenderCommand.getInstance();
    }

    public static getInstance(): ShellErrorHandler {
        if(!ShellErrorHandler.instance) {
            ShellErrorHandler.instance = new ShellErrorHandler();
        }
        return ShellErrorHandler.instance;
    }

    public get errorList(): Error[] {
        return this._errorList;
    }
    
    public addError(error: Error): void {
        this._errorList.push(error);
    }

    public handleError = (errorType: string, value: string): Error => {
        const ErrorMapper: any = {
            'UnknownCommand': this.CustomError('UnknownCommandError', 'Command "' + value + '" not found'),
            'SyntaxError': this.CustomError('SyntaxError', '"' + value + '" O_o Syntax error, learn to type and try again'),
            'UnknownFlag':this.CustomError('UnknownFlagError', 'Flag "' + value + '" is unknown, type -h for help'),
            'UnknownArgs': this.CustomError('UnknownArgsError', 'Option "' + value + '", type -h for help'),
        }
        let error = ErrorMapper[errorType];
        if(error === undefined){
            error = this.CustomError('UnknownError', 'Unknown error - '+ value);
        }
        this.addError(error);
        this.renderError(value);
        return error;
    }

    private CustomError = (name: string, message: string, ): Error => {
        return {
            name: name,
            message: message
        }
    }

    public renderError(tokenValue: string): void {
        this._RenderCommandInstance.addItemCmdList(this.errorToCmdObject(this._errorList[this._errorList.length - 1], tokenValue));
    }

    public errorToCmdObject(error: Error, tokenValue: string): ICmdObject {
        return {
            type: 'error',
            command: {
                name: tokenValue,
                args: [],
                flags: []
            },
            result: error.message
        }
    }
}   