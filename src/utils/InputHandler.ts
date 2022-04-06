import CmdLexer from "./CmdLexer";
import CmdParser from "./CmdParser";

export default class InputHandler {
    private static instance: InputHandler;
    private _inputBuffer: string[];
    private _lexerInstance: CmdLexer;
    private _parserInstance: CmdParser;

    constructor(){
        this._lexerInstance = <CmdLexer>{};
        this._parserInstance = <CmdParser>{};
        this._inputBuffer = [];
    }

    public static getInstance(): InputHandler {
        if(!InputHandler.instance) {
            InputHandler.instance = new InputHandler();
        }
        return InputHandler.instance;
    }

    public newInput(input: string): void {
        if(input == null) return;       
        this._inputBuffer.push(input);
        this.commandExecution();     
    }

    private commandExecution(): void {
        this._lexerInstance = new CmdLexer(this._inputBuffer[this._inputBuffer.length - 1]);
        this._parserInstance = new CmdParser(this._lexerInstance);
    }
}