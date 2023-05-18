
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../app-reducer";
import {ResponseType} from "../api/todolist-API";

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}


//example
export type ErrorsType = {
    field: string
    message: string
}

export const handleServerNetworkError = (error: AxiosError<ErrorsType>, dispatch: Dispatch) => {

    dispatch(setAppErrorAC(error.message ? error.message : 'Some error'))
    dispatch(setAppStatusAC('failed'))
}