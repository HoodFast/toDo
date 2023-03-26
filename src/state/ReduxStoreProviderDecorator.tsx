import React from "react";
import {rootReducerType, store} from "./store";
import {Provider} from "react-redux";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists:todolistsReducer
})

const initialGlobalState = {
    todoLists:[
        {id: '1', title: "What to learn", filter: "all"},
        {id: '2', title: "What to buy", filter: "all"}
    ],
    tasks:{
        ['1']: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        ['2']: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
}

export const storyBookStore= legacy_createStore(rootReducer,initialGlobalState as rootReducerType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}