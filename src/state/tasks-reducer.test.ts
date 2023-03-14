import {v1} from "uuid";
import {addTasksAC, changeTaskAC, removeTaskAC, statusChangeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../App";
import {addTodoList, todolistsReducer} from "./todolists-reducer";

test('remove task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()

    const initState = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId1, title: "Milk", isDone: true},
            {id: taskId2, title: "React Book", isDone: true}
        ]
    }

    const result = tasksReducer(initState, removeTaskAC(todolistId1, taskId1))

    expect(result[todolistId1].length).toBe(1)
})

test('add task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()

    const initState = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId1, title: "Milk", isDone: true},
            {id: taskId2, title: "React Book", isDone: true}
        ]
    }

    const newTitleTask = 'NewTitle'

    const result = tasksReducer(initState, addTasksAC(todolistId1, newTitleTask))

    expect(result[todolistId1].length).toBe(3)
    expect(result[todolistId1][2].title).toBe(newTitleTask)
    expect(result[todolistId2].length).toBe(2)
})

test('change task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()

    const initState = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId1, title: "Milk", isDone: true},
            {id: taskId2, title: "React Book", isDone: true}
        ]
    }

    const newTitleTask = 'ChangeTitle'

    const result = tasksReducer(initState, changeTaskAC(todolistId1, taskId1, newTitleTask))


    expect(result[todolistId1][0].title).toBe(newTitleTask)
    expect(result[todolistId1][1].title).toBe("JS")

})

test('change status task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()

    const initState = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId1, title: "Milk", isDone: true},
            {id: taskId2, title: "React Book", isDone: true}
        ]
    }

    const result = tasksReducer(initState, statusChangeTaskAC(todolistId1, taskId1, false))

    expect(result[todolistId1][0].isDone).toBeFalsy()
    expect(result[todolistId1][1].isDone).toBeTruthy()
})

test('add todo list', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const initState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId1, title: "Milk", isDone: true},
            {id: taskId2, title: "React Book", isDone: true}
        ]
    }
    const newTitle = 'newTitle'
    const action = addTodoList(newTitle)

    const addTodo = todolistsReducer(startState, action)
    const addTasks = tasksReducer(initState, action)

    const keys = Object.keys(addTasks)
    const addId = keys[0]
    expect(addTodo[0].id).toBe(addId)
    expect(addTasks[addId]).toEqual([])
})