import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTasksAC, changeTaskAC, removeTaskAC, statusChangeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {TodolistRedux} from "./TodolistWithRedax";


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

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTasksAC(todolistId, title))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(statusChangeTaskAC(todolistId, id, isDone))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskAC(todolistId, id, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodoListFilter(todolistId, value))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodoList(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodoListTitle(id, title))
    }

    function addTodolist(title: string) {
        dispatch(addTodoList(title))
    }


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
                            // let allTodolistTasks = tasks[tl.id];
                            // let tasksForTodolist = allTodolistTasks;

                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            // }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    {/*<Todolist*/}
                                    {/*    key={tl.id}*/}
                                    {/*    id={tl.id}*/}
                                    {/*    title={tl.title}*/}
                                    {/*    tasks={tasksForTodolist}*/}
                                    {/*    removeTask={removeTask}*/}
                                    {/*    changeFilter={changeFilter}*/}
                                    {/*    addTask={addTask}*/}
                                    {/*    changeTaskStatus={changeStatus}*/}
                                    {/*    filter={tl.filter}*/}
                                    {/*    removeTodolist={removeTodolist}*/}
                                    {/*    changeTaskTitle={changeTaskTitle}*/}
                                    {/*    changeTodolistTitle={changeTodolistTitle}*/}
                                    {/*/>*/}
                                    <TodolistRedux id={tl.id} title={tl.title} filter={tl.filter}

                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

