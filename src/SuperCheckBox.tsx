import React, {ChangeEvent} from "react";
type PropsType ={
    isDone:boolean
    callback: (value:boolean)=>void
}

export const SuperCheckBox = (props:PropsType) => {
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=> {
        props.callback(e.currentTarget.checked)
    }
    return <input type='checkbox' checked={props.isDone} onChange={onChangeHandler} />
}