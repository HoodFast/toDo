import {TodolistType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: TodolistType[], action: tsarType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todolistId1)
        case 'ADD-TODOLIST':
            let newId = v1()
            let newTodo: TodolistType = {id: newId, title: action.payload.newTodolistTitle, filter: 'all'}
            return [...state, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id===action.payload.id? {...el,title:action.payload.title} :el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=>el.id===action.payload.id? {...el,filter:action.payload.filter} :el)
        default:
            return state
    }
}

type tsarType = removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeTodoListFilterACType

type removeTodoListACType = ReturnType<typeof removeTodoList>
type addTodoListACType = ReturnType<typeof addTodoList>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitle>
type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilter>

export const removeTodoList = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST', payload: {todolistId1}
    } as const
}

export const addTodoList = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST', payload: {newTodolistTitle}
    } as const
}

export const changeTodoListTitle = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}
    } as const
}

export const changeTodoListFilter = (id:string, filter:string)=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}
    }as const
}