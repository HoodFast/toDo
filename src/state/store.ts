import {combineReducers,legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";


export type rootReducerType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
        todoLists: todolistsReducer,
        tasks: tasksReducer
    })

export const store = legacy_createStore(rootReducers);