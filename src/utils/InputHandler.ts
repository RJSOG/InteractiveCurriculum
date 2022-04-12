import CmdLexerParser from "./CmdLexerParser";

export default class InputHandler {
    private static instance: InputHandler;
    private _inputBuffer: string[];

    constructor(){
        this._inputBuffer = [];
    }

    public static getInstance(): InputHandler {
        if(!InputHandler.instance) {
            InputHandler.instance = new InputHandler();
        }
        return InputHandler.instance;
    }

    public handleInput(input: string): void {
        if(input == null) return;       
        this._inputBuffer.push(input);
        new CmdLexerParser(input);
    }
}