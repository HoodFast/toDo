import React, {memo} from 'react';
import {SuperCheckBox} from "./SuperCheckBox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodolistWithRedax";

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}


export const Task = memo((
    {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask
    }: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id)

    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue );
    }
    return (
        <div className={task.isDone ? "is-done" : ""}>
            <SuperCheckBox isDone={task.isDone} callback={(value) => changeTaskStatus(task.id, value)}/>

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})

