import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initState: TodolistType[] = [
    // {id: '1', title: "What to learn", filter: "all"},
    // {id: '2', title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state=initState, action: tsarType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newId = action.payload.id
            let newTodo: TodolistType = {id: newId, title: action.payload.newTodolistTitle, filter: 'all'}
            return [newTodo,...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id===action.payload.id? {...el,title:action.payload.title} :el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=>el.id===action.payload.id? {...el,filter:action.payload.filter} :el)
        default:
            return state
    }
}

type tsarType = removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeTodoListFilterACType

export type removeTodoListACType = ReturnType<typeof removeTodoList>
export type addTodoListACType = ReturnType<typeof addTodoList>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitle>
type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilter>

export const removeTodoList = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST', payload: {todolistId}
    } as const
}

export const addTodoList = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST', payload: {id:v1(),newTodolistTitle}
    } as const
}

export const changeTodoListTitle = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}
    } as const
}

export const changeTodoListFilter = (id:string, filter:FilterValuesType)=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}
    }as const
}