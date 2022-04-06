type Token = {
    token: string,
    len: number,
    type: string
}

export default class CmdLexer {
    private _input: string;
    private _tokenBuff: Token[];
    private _separator: string;

    constructor(input: string){
        this._input = input;
        this._tokenBuff = [];
        this._separator = " ";
        this.tokenize(); 
    }

    private tokenize(){
        const tempTokenBuff = this._input.split(this._separator);
        for(let i = 0; i < tempTokenBuff.length; i++){
            let token = tempTokenBuff[i];
            this._tokenBuff.push(this.defineToken(token));
        }
        console.log(this._tokenBuff); 
    }

    private getTokenType(token: string): string {
        let tokenType: string;
        let typeDict: any = {
            "-" : "flag",
            "--" : "flag",
            "/" : "arg",
            "\\" : "arg",
            "'" : "arg",
            "\"" : "arg",
        }
        return (typeDict.hasOwnProperty(token[0])) ? typeDict[token[0]] : "cmd";
    }

    private defineToken(token: string,): Token {
        let tokenType: string;
        return {
            token: token,
            len: token.length,
            type: this.getTokenType(token)
        }
    }
}   