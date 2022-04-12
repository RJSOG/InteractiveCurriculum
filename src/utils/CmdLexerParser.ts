import CommandCaller from "./CommandCaller";

export type Token = {
    value: string,
    len: number,
    type: string
}

export type Command = {
    name: string,
    args: string[],
    flags: string[]
}

export default class CmdLexerParser {
    private _input: string;
    private _tokenBuff: Token[];
    private _CmdExecutionList: Command[]
    private _CommandCallerInstance: CommandCaller;
    private _separator: string;
    private _cmdList: string[];
    private _operatorList: string[];

    constructor(input: string){
        this._CmdExecutionList = [];
        this._CommandCallerInstance = CommandCaller.getInstance();
        this._input = input;
        this._tokenBuff = [];
        this._separator = " ";
        this._cmdList = this._CommandCallerInstance.cmdList;
        this._operatorList = ['&&', '||'];
        this.tokenize();
        this.parseTokenBuff();
        this._CommandCallerInstance.execute(this.CmdExecutionList);
    }

    public tokenize(){
        const tempTokenBuff = this._input.split(this._separator);
        for(let i = 0; i < tempTokenBuff.length; i++){
            let token = this.defineToken(tempTokenBuff[i]);
            this._tokenBuff.push(token);
        }
    }

    private getTokenType(token: string): string {
        let typeDict: any = {
            "-" : "flag",
            "/" : "arg",
            "\\" : "arg",
            "'" : "arg",
            "\"" : "arg",
        }
        if(typeDict.hasOwnProperty(token[0])){
            return typeDict[token[0]];
        }else if(this._operatorList.includes(token)){
            return "operator";
        }else {
            return ((this.isCmd(token)) ? "cmd" : "unknown");
        }
    }

    private isCmd(token: string): boolean {
        return this._cmdList.includes(token);
    }

    private defineToken(token: string): Token {
        return {
            value: token,
            len: token.length,
            type: this.getTokenType(token)
        }
    }

    public parseTokenBuff(): void {
        let boolfirstCmd: boolean = true;
        while(this._tokenBuff.length > 0 && this._tokenBuff[0].type !== "unknown"){
            let token = this._tokenBuff.shift();
            if(token?.type !== "unknown" && token?.type !== undefined){
                if(boolfirstCmd){
                    this._CmdExecutionList.push(this.getDefautCmd());
                    boolfirstCmd = false;
                }
                this.tokenMapper(token);
            }
        }
    }

    private tokenMapper(token: Token): void {
        const mapper: any = {
            'cmd': this.mapCmd,
            'flag': this.mapFlag,
            'arg': this.mapArg,
            'operator': this.mapOperator
        };
        mapper[token.type](token);
    }

    private mapCmd = (token: Token): void => {
        this._CmdExecutionList[this._CmdExecutionList.length-1].name = token.value;
    }

    private mapFlag = (token: Token): void => {
        this._CmdExecutionList[this._CmdExecutionList.length-1].flags.push(token.value);
    }

    private mapArg = (token: Token): void => {
        this._CmdExecutionList[this._CmdExecutionList.length-1].args.push(token.value);
    }

    private mapOperator = (token: Token): void => {
        const operatorType = this.defineOperatorType(token.value);
        if(operatorType !== "unknown"){
            if(operatorType === 'and'){
                this._CmdExecutionList.push(this.getDefautCmd());
            }
        }
    }

    private defineOperatorType(operator: string): string {
        const operatorType: any = {
            "&&" : "and",
            "||" : "or"
        }
        return (operatorType.hasOwnProperty(operator)) ? operatorType[operator] : "unknown";
    }

    private getDefautCmd(): Command {
        return {
            name: "",
            args: [],
            flags: []
        }
    }

    public get CmdExecutionList(): Command[] {
        return this._CmdExecutionList;
    }

}   