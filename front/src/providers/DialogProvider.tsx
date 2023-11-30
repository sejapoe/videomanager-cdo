import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {DialogWrapper} from "../ui/dialog/DialogWrapper.tsx";

type StateDefinition = {
    open: boolean;
    title: string;
    children: React.ReactNode
}

enum ActionTypes {
    Open,
    Close
}

type Actions =
    | { type: ActionTypes.Open, children: React.ReactNode, title: string }
    | { type: ActionTypes.Close }

const reducers: {
    [P in ActionTypes]: (
        state: StateDefinition,
        action: Extract<Actions, { type: P }>
    ) => StateDefinition
} = {
    [ActionTypes.Close]: () => ({
        children: null,
        title: "",
        open: false
    }),
    [ActionTypes.Open]: (_, {children, title}) => ({
        children,
        title,
        open: true
    })
}

const stateReducer = (state: StateDefinition, action: Actions) => {
    return reducers[action.type](state, action as any)
}

const DialogProviderContext = createContext<[StateDefinition, Dispatch<Actions>] | null>(null)
DialogProviderContext.displayName = "DialogProviderContext"

const useDialogContext = (component: string) => {
    const context = useContext(DialogProviderContext)
    if (context == null) {
        throw new Error(`<${component} /> is missing a parent <DialogProviderContext /> component.`)
    }
    return context
}

// ===================================

type UseDialogProps = {
    children?: (close: () => void) => React.ReactNode;
    title?: string
}

type UseDialogReturn = (props?: {
    children?: (close: () => void) => React.ReactNode,
    title?: string
}) => void

export const useDialog = ({children, title}: UseDialogProps): UseDialogReturn => {
    const [_, dispatch] = useDialogContext("UseDialog")

    return (props) => {
        dispatch({
            type: ActionTypes.Open,
            children: (children || props?.children || (() => null))(() => {
                dispatch({type: ActionTypes.Close})
            }),
            title: title || props?.title || "Диалоговое окно"
        })
    }
}

type DialogProviderProps = {
    children: React.ReactNode
}

export const DialogProvider = ({children}: DialogProviderProps) => {
    const reducerBag = useReducer(stateReducer, {
        open: false,
        title: "",
        children: null
    })
    const [{open, children: dialogChildren, title}, dispatch] = reducerBag
    return <DialogProviderContext.Provider value={reducerBag}>
        <DialogWrapper
            isOpen={open}
            close={() => {
                dispatch({type: ActionTypes.Close})
            }}
            title={title}
        >
            {dialogChildren}
        </DialogWrapper>
        {children}
    </DialogProviderContext.Provider>
}