import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {SuperCheckBox} from "./SuperCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {addTasksAC, changeTaskAC, removeTaskAC, statusChangeTaskAC} from "./state/tasks-reducer";
import {changeTodoListFilter, changeTodoListTitle, removeTodoList} from "./state/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistRedux(props: PropsType) {

    let tasks = useSelector<rootReducerType, TaskType[]>(state => state.tasks[props.id])

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }



    const dispatch = useDispatch()
    const addTask = useCallback((title: string) => {
        dispatch(addTasksAC(props.id, title))
    },[props.id])

    const removeTodolist = () => {
        dispatch(removeTodoList(props.id))
    }
    const changeTodolistTitle = () => {
        dispatch(changeTodoListTitle(props.id, props.title))
    }

    const onAllClickHandler = () => dispatch(changeTodoListFilter(props.id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodoListFilter(props.id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodoListFilter(props.id, "completed"))
    const changeStatus = (ID: string, value: boolean) => {
        dispatch(statusChangeTaskAC(props.id, ID, value))
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(props.id,t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(statusChangeTaskAC(props.id, t.id, newIsDoneValue))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskAC(props.id, t.id, newValue))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckBox isDone={t.isDone} callback={(value) => changeStatus(t.id, value)}/>

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>

    </div>
}


