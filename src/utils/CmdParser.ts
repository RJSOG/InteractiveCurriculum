import CmdLexer from "./CmdLexer";

export default class CmdParser {
    private _lexer: CmdLexer;

    constructor(lexer: CmdLexer) {
        this._lexer = lexer;
    }

    public parse(): void {
        
    }
}