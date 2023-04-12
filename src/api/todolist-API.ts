import {instance} from "./task-API";




export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ServerResponseType<D={}> = {
    resultCode: number
    messages: string[]
    data: D
}


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '1078d21f-e502-4df3-adb0-f8556c144721'
    }
}




export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists/', settings)
    },
    createTodolist(title: string) {
        return instance.post<ServerResponseType<{item: TodolistType}>>('todo-lists/', {title})
    },
    deleteTodolist(ToDoListId: string) {
        return instance.delete<ServerResponseType>(`todo-lists/${ToDoListId}`)
    },
    updateTodolist(ToDoListId: string, title: string) {
        return instance.put<ServerResponseType>(`todo-lists/${ToDoListId}`, {title})
    }
}


