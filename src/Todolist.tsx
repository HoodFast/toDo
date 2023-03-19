import React, { memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";

import {ButtonsFilter} from "./ButtonsFilter";

import {TaskRedux} from "./TaskRedux";
import {useSelector} from "react-redux";
import {rootReducerType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    let tasks = useSelector<rootReducerType, TaskType[]>(state => state.tasks[props.id])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.id, props.addTask])


    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter]);
    // const changeStatus = (ID: string, value: boolean) => {
    //     props.changeTaskStatus(ID, value, props.id);
    // }




    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    // const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    // const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean,) => {
    //     props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    // }, [props.changeTaskStatus, props.id])
    // const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
    //     props.changeTaskTitle(taskId, newValue, props.id);
    // }, [props.changeTaskTitle, props.id])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ButtonsFilter title={'All'} colorB={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'}
                       callback={onAllClickHandler}/>
        <ButtonsFilter title={'active'} colorB={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                       callback={onActiveClickHandler}/>
        <ButtonsFilter title={'completed'} colorB={'secondary'}
                       variant={props.filter === 'completed' ? 'outlined' : 'text'} callback={onCompletedClickHandler}/>
        {/*<div>*/}
        {/*    <Button variant={props.filter === 'all' ? 'outlined' : 'text'}*/}
        {/*            onClick={onAllClickHandler}*/}
        {/*            color={'inherit'}*/}
        {/*    >All*/}
        {/*    </Button>*/}
        {/*    <Button variant={props.filter === 'active' ? 'outlined' : 'text'}*/}
        {/*            onClick={onActiveClickHandler}*/}
        {/*            color={'primary'}>Active*/}
        {/*    </Button>*/}
        {/*    <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}*/}
        {/*            onClick={onCompletedClickHandler}*/}
        {/*            color={'secondary'}>Completed*/}
        {/*    </Button>*/}
        {/*</div>*/}
        <div>
            {
                tasks.map((t, index) => {
                    return <TaskRedux key={index} taskId={t.id} todoListId={props.id}/>
                })
            }
        </div>
    </div>
})


