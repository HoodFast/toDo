const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'

export type StatusType= 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: StatusType
    error: string | null
}

const InitialState: InitialStateType = {
    status: 'idle',
    error: null
}
export const appReducer = (state = InitialState, action: ActionsTypeApp):InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state,error:action.error}
        default:
            return state
    }

}

export type ActionsTypeApp = setErrorACType |setStatusACType

type setErrorACType=ReturnType<typeof setAppErrorAC>
type setStatusACType=ReturnType<typeof setAppStatusAC>

export const setAppErrorAC=(error:string|null)=>{
    return {type:APP_SET_ERROR,error}as const
}
export const setAppStatusAC=(status:StatusType)=>{
    return {type:APP_SET_STATUS,status}as const
}