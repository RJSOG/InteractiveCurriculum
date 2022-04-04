export default class CmdParser {
    private _cmdSplit: Array<string>;
    private _cmd: string;
    private _cmdArgs: Array<string>;
    
    constructor(cmd: string) {
        this._cmd = '';
        this._cmdArgs = [];
        this._cmdSplit = cmd.split(' ');
        this.setCmd();
        this.setCmdArgs();
    }

    setCmd() {
        this._cmd = this._cmdSplit[0];
    }

    setCmdArgs() {
        this._cmdArgs = this._cmdSplit.slice(1);
    }

    getCmd() {
        return this._cmd;
    }

    getArgs() {
        return this._cmdArgs;
    }
}