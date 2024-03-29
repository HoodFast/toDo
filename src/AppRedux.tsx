import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
} from "./state/todolists-reducer";
import {addTasksAC, changeTaskAC, removeTaskAC, statusChangeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";



export type FilterValuesType = "all" | "active" | "completed";



export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<rootReducerType, TodolistType[]>(state=> state.todoLists)
    // const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)

    const addTask=useCallback((title: string, todolistId: string)=> {
        dispatch(addTasksAC(todolistId, title))
    },[dispatch])
    //
    // const removeTask=useCallback((id: string, todolistId: string)=> {
    //     dispatch(removeTaskAC(todolistId, id))
    // },[])
    //
    // const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string)=> {
    //     dispatch(statusChangeTaskAC(todolistId, id, isDone))
    // },[])
    //
    // const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
    //     dispatch(changeTaskAC(todolistId, id, newTitle))
    // },[])

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=> {
        dispatch(changeTodoListFilter(todolistId, value))
    },[])

    const removeTodolist=useCallback((id: string)=> {
        dispatch(removeTodoList(id))
    },[])

    const changeTodolistTitle=useCallback((id: string, title: string)=> {
        dispatch(changeTodoListTitle(id, title))
    },[])

    const addTodolist= useCallback((title: string) =>{
        dispatch(addTodoList(title))
    },[dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {


                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={tasks[tl.id]}
                                        // removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        // changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        // changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                    {/*<TodolistRedux id={tl.id} title={tl.title} filter={tl.filter}/>*/}
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

