import axios from "axios";
import {ServerResponseType} from "./todolist-API";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '1078d21f-e502-4df3-adb0-f8556c144721'
    }
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type dataType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export const enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export const tasksAPI = {

    getTasks(ToDoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${ToDoListId}/tasks`)
    },
    createTask(ToDoListId: string, title: string) {
        return instance.post<ServerResponseType<TaskType>>(`todo-lists/${ToDoListId}/tasks`, {title})
    },
    updateTask(ToDoListId: string, taskId: string, data: dataType) {
        return instance.put<ServerResponseType<TaskType>>(`todo-lists/${ToDoListId}/tasks/${taskId}`, {...data})
    },
    deleteTask(ToDoListId: string, taskId: string) {
        return instance.delete<ServerResponseType>(`todo-lists/${ToDoListId}/tasks/${taskId}`)
    }
}


