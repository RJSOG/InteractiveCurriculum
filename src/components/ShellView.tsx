import React, { FunctionComponent, useEffect } from "react";
import InputHandler from "../utils/ShellModel/InputHandler";
import {RenderCommand, ICmdObject} from "../utils/ShellModel/RenderCommand";
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
const defaultWidth = 768;
const defaultHeight = 95;
const user = "user";
const dir = "/home/user";
const host = "localhost";

const ShellView: FunctionComponent = () => {
    const [input, setInput] = React.useState<inputState>({isDone: false, value: ""});
    const [cmdArr, setCmdArr] = React.useState<JSX.Element[]>([]);
    const [shellWidth, setShellWidth] = React.useState<number>(defaultWidth);
    const [shellHeight, setShellHeight] = React.useState<number>(defaultHeight);

    const newCmdHandler = (e: Event) => {
        const EventResult = (e as CustomEvent).detail;
        if(EventResult != null) addHTMLElementToCmdArr(EventResult);
    };

    const addHTMLElementToCmdArr = (obj: ICmdObject) => {
        const element: JSX.Element = renderNewCmd(obj);
        setCmdArr([...cmdArr, element]);
    }

    const renderNewCmd = (cmd: ICmdObject) => {
        console.log(cmd)
        return (
            <div key={cmdArr.length-1}>
                <span>
                    {shellLine()}
                    {cmd.command.name}
                </span><br/>
                <p style={(cmd.type === 'error') ? {color: 'red'} : {}}>{cmd.result}</p>
            </div>
        )
    }
    
    const clearCmdHandler = (e: Event) => {
        setCmdArr([]);
    }

    RenderCommandInstance.addEventListener('newCmd', newCmdHandler);
    RenderCommandInstance.addEventListener('clearCmdList',  clearCmdHandler);

    useEffect(() => {
        if(input.isDone){
            // renderNewCmd(input.value);
            setInput({isDone: false, value: ""});
            updateWidthandHeight();
            InputHandlerInstance.handleInput(input.value);
        }  
    }, [input]);

    const getUserLine = () => {
        return user+'@'+host+':'+dir+'$ ';
    }

    const shellLine = () => {
        return (
            <p id='fakeSys' style={{display: "inline"}}>{getUserLine()}</p>
        )
    }


    const onInputChange = (e: React.ChangeEvent<inputChange>) => {
        setInput({...input, value: e.target.value});
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setInput({...input, isDone: true});
        }
    }

    const updateWidthandHeight = () => {
        const shellDiv = document.getElementById('shell');
        const shellDivHeight = shellDiv?.clientHeight;  
        const shellDivWidth = shellDiv?.clientWidth;
        setShellWidth(shellDivWidth!);
        setShellHeight(shellDivHeight!);
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
                    <div className="title">bash -- {shellWidth}x{shellHeight}</div>  
                        <pre id='render' className="render">
                            <div id="divResult">
                            {
                                cmdArr.map((cmd: JSX.Element, index: number) => {
                                    return cmd;
                                })
                            }     
                            </div>  
                        </pre>
                        <pre id='renderInput' className="render">
                            {shellLine()}
                            <input id='input' onChange={onInputChange} onKeyDown={onEnterPress} value={input.value}></input>
                        </pre>                    
                    </div>
            </div>
        </div>
    );
}

export default ShellView;



