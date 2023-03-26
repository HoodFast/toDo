import React, {memo, useCallback} from 'react';
import {SuperCheckBox} from "./SuperCheckBox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodolistWithRedax";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {changeTaskAC, removeTaskAC, statusChangeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    taskId: string
    todoListId: string
}


export const TaskRedux = memo((
    {
        taskId,
        todoListId
    }: TaskPropsType) => {

    let [task] = useSelector<rootReducerType, TaskType[]>(state => state.tasks[todoListId].filter(t => t.id === taskId))
    const dispatch = useDispatch()
    // const onClickHandler = () => removeTask(task.id)
    //
    // const onTitleChangeHandler = (newValue: string) => {
    //     changeTaskTitle(task.id, newValue);
    // }

    const removeTask = () => dispatch(removeTaskAC(todoListId, taskId))
    const changeTaskStatus = ( isDone: boolean,) => {
        dispatch(statusChangeTaskAC(todoListId, taskId, isDone))
    }
    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(changeTaskAC(todoListId, taskId, newValue))
    },[todoListId])

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <SuperCheckBox isDone={task.isDone} callback={(value) => changeTaskStatus(value)}/>

            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

