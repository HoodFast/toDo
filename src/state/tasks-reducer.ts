import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {tasksAPI} from "../api/task-API";

const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK = 'CHANGE-TASK'
const STATUS_CHANGE_TASK = 'STATUS-CHANGE-TASK'
const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'


const initState:TasksStateType  = {
    // ['1']: [
    //     {id: v1(), title: "HTML&CSS", isDone: false},
    //     {id: v1(), title: "JS", isDone: true}
    // ],
    // ['2']: [
    //     {id: v1(), title: "Milk", isDone: false},
    //     {id: v1(), title: "React Book", isDone: true}
    // ]
}

export const tasksReducer = (state=initState, action: tsarType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:

            const newTask = {id: v1(), title: action.payload.value, isDone: true}
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]}
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        case CHANGE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.value
                } : el)
            }
        case STATUS_CHANGE_TASK:
            const newIsDone = action.payload.isDone
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el =>
                    el.id === action.payload.taskId ? {...el, isDone: newIsDone} : el
                )
            }
        case ADD_TODOLIST:
            return {[action.payload.id]: [], ...state}
        case REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
        default:
            return state
    }
}


type tsarType = addTasksACType | removeTaskACType | changeTaskACType |
    statusChangeTaskACType | addTodoListACType | removeTodoListACType

type addTasksACType = ReturnType<typeof addTasksAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskACType = ReturnType<typeof changeTaskAC>
type statusChangeTaskACType = ReturnType<typeof statusChangeTaskAC>


export const addTasksAC = (todolistId: string, value: string) => {
    return {type: ADD_TASK, payload: {todolistId, value}} as const
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: REMOVE_TASK, payload: {todoListId, taskId}} as const
}

export const changeTaskAC = (todolistId: string, taskId: string, value: string) => {
    return {type: CHANGE_TASK, payload: {todolistId, taskId, value}} as const
}

export const statusChangeTaskAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: STATUS_CHANGE_TASK, payload: {todolistId, taskId, isDone}} as const
}



//--------------------------------------------------------
export const removeTaskTC = (todolistId:string,id:string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, id).then(() => dispatch(removeTaskAC(id, todolistId)))

    }
}

export const addTaskTC = (todolistId:string,title:string)=>{
    return (dispatch:Dispatch)=>{

        tasksAPI.createTask(todolistId,title).then((res)=> {

            // dispatch(addTaskAC(res.data.data.item))
        })

    }
}