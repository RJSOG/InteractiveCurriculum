import React, { FunctionComponent, useEffect } from "react";
import CmdParser from "../utils/CmdParser";
import InputHandler from "../utils/InputHandler";
import {RenderCommand, Observer, CmdObject} from "../utils/RenderCommand";
import '../style/ShellView.css'; 

type inputState = {
    isDone: boolean,
    value: string
}

type inputChange = {
    name: string, 
    value: string
}

const RenderCommandInstance = RenderCommand.getInstance();
const InputHandlerInstance = InputHandler.getInstance();

const ShellView: FunctionComponent = () => {
    const [input, setInput] = React.useState<inputState>({isDone: false, value: ""});
    const [cmdArr, setCmdArr] = React.useState<CmdObject[]>([]);

    const newCmdHandler = (e: Event) => {
        const EventResult = (e as CustomEvent).detail;
        if(EventResult != null) setCmdArr(cmdArr.concat(EventResult as CmdObject));
    };

    RenderCommandInstance.addEventListener('newCmd', newCmdHandler)

    useEffect(() => {
        if(input.isDone){
            renderNewCmd(input.value);
            setInput({isDone: false, value: ""});
            InputHandlerInstance.newInput(input.value);
        }  
    }, [input]);
    const renderNewCmd = (cmd: string) => {
        const renderDiv = document.getElementById('render');
        const str = fakeShellLine() + cmd;
        
        renderDiv?.append(str);
        renderDiv?.appendChild(document.createElement('br'));
    }

    const fakeShellLine = () => {
        const user = "user";
        const dir = "/home/user";
        const host = "localhost";
        return user+'@'+host+':'+dir+'$ ';
    }

    const onInputChange = (e: React.ChangeEvent<inputChange>) => {
        setInput({...input, value: e.target.value});
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setInput({...input, isDone: true});
        }
    }

    return (
        <div id='shell'>
            <div className="terminal space shadow">
                <div className="top">
                    <div className="btns">
                        <span className="circle red"></span>
                        <span className="circle yellow"></span>
                        <span className="circle green"></span>
                    </div>
                    <div className="title">bash -- 70x32</div>  
                        <pre id='render' className="render">
                            {
                                cmdArr.map((cmd: CmdObject, index: number) => {
                                    return <div key={index}>{cmd.result}</div>
                                })
                            }   
                        </pre>
                        <pre id='renderInput' className="render">
                            {fakeShellLine()}
                            <input id='input' onChange={onInputChange} onKeyDown={onEnterPress} value={input.value}></input>
                        </pre>                    
                    </div>
            </div>
        </div>
    );
}

export default ShellView;



