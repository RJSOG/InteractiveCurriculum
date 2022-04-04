import React, { FunctionComponent, useEffect } from "react";
import CmdParser from "../utils/CmdParser";
import InputHandler from "../utils/InputHandler";
import {RenderCommand, Observer, CmdObject} from "../utils/RenderCommand"; 

type inputState = {
    isDone: boolean,
    value:string
}

export interface ShellViewProps extends Observer {}

type inputChange = {
    name: string, 
    value:string
}

const ShellView: FunctionComponent<ShellViewProps> = () => {
    const [input, setInput] = React.useState<inputState>({isDone: false, value: ""});
    const renderCommand = RenderCommand.getInstance();
    renderCommand.subscribe(ShellView);

    useEffect(() => {
        if(input.isDone){
            document.getElementById('render')?.append(input.value);
;            setInput({isDone: false, value: ""});
        }  
    }, [input]);

    const onInputChange = (e: React.ChangeEvent<inputChange>) => {
        setInput({...input, value: e.target.value});
    }

    const getUpdate = (cmd: CmdObject) => {
        console.log("new update");
        console.log('cmd: ', cmd);
    }

    const handleRender = () => {

    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setInput({...input, isDone: true});
        }
    }

    return (
        <div>
            <div id='render'>
                {handleRender}
            </div>
            <div id='input'>
                <input onChange={onInputChange} onKeyDown={onEnterPress} value={input.value}></input>
            </div>
        </div>
    );
}

export default ShellView;



