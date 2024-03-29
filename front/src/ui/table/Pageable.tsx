import clsx, {ClassValue} from "clsx";
import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

enum Direction {
    ASC = "ASC",
    DESC = "DESC"
}

type SortState = {
    sorting: string;
    direction: Direction;
}

type PageState = {
    page: number;
    size: number;
}

type StateDefinition = {
    sort: SortState
    page: PageState
}

enum ActionTypes {
    SelectSort,
    PrevPage,
    NextPage,
    SelectPage,
    SelectPageSize,
}

type Actions =
    | { type: ActionTypes.SelectSort, sort: SortState }
    | { type: ActionTypes.PrevPage }
    | { type: ActionTypes.NextPage }
    | { type: ActionTypes.SelectPageSize, size: number }
    | { type: ActionTypes.SelectPage, number: number }

const reducers: {
    [P in ActionTypes]: (
        state: StateDefinition,
        action: Extract<Actions, { type: P }>
    ) => StateDefinition
} = {
    [ActionTypes.SelectSort](state, {sort}) {
        return {
            ...state,
            sort
        }
    },
    [ActionTypes.SelectPageSize](state, {size}) {
        return {
            ...state,
            page: {
                ...state.page,
                size
            }
        }
    },
    [ActionTypes.PrevPage](state) {
        return {
            ...state,
            page: {
                ...state.page,
                page: state.page.page - 1
            }
        }
    },
    [ActionTypes.NextPage](state) {
        return {
            ...state,
            page: {
                ...state.page,
                page: state.page.page + 1
            }
        }
    },
    [ActionTypes.SelectPage](state, {number}) {
        return {
            ...state,
            page: {
                ...state.page,
                page: number
            }
        }
    },
}

const SortableContext = createContext<[StateDefinition, Dispatch<Actions>] | null>(null)
SortableContext.displayName = "SortableContext"

const useMenuContext = (component: string) => {
    const context = useContext(SortableContext)
    if (context == null) {
        throw new Error(`<${component} /> is missing a parent <Pageable /> component.`)
    }
    return context
}

const stateReducer = (state: StateDefinition, action: Actions) => {
    return reducers[action.type](state, action as any)
}

// ====================================================================================
// ====================================================================================
// ====================================================================================


type SortButtonProps = {
    className?: ClassValue
    field: string;
}

const SortButton: React.FC<SortButtonProps> = ({field, className}) => {
    const [state, dispatch] = useMenuContext("Pageable.SortButton")

    const handleClick = () => {
        dispatch({
            type: ActionTypes.SelectSort,
            sort: {
                sorting: field,
                direction: state.sort.sorting !== field ? Direction.ASC :
                    state.sort.direction == Direction.ASC ? Direction.DESC : Direction.ASC
            }
        })
    }

    return <FontAwesomeIcon icon={
        state.sort.sorting === field
            ? state.sort.direction === Direction.ASC
                ? solid("sort-down")
                : solid("sort-up")
            : solid("sort")
    } onClick={handleClick} className={clsx("cursor-pointer", className)}/>
}


// ==========================

type PaginationMethods = {
    page: number;
    pageSize: number;
    prev: () => void;
    next: () => void;
    selectPageSize: (size: number) => void;
    selectPage: (number: number) => void;
}

type FixPageProps = {
    totalPages: number
}

const FixPage: React.FC<FixPageProps> = ({totalPages}) => {
    const [{page}, dispatch] = useMenuContext("Pageable.FixPage")

    if (totalPages == 0 && page.page != 0) {
        dispatch({
            type: ActionTypes.SelectPage,
            number: 0,
        })
    }

    if (totalPages != 0 && page.page >= totalPages) {
        dispatch({
            type: ActionTypes.SelectPage,
            number: totalPages - 1,
        })
    }

    return null
}

type PaginationProps = {
    children: (methods: PaginationMethods) => React.ReactNode
}

const Pagination: React.FC<PaginationProps> = ({children}) => {
    const [{page}, dispatch] = useMenuContext("Pageable.Pagination");

    return children({
        page: page.page,
        pageSize: page.size,
        prev: () => dispatch({type: ActionTypes.PrevPage}),
        next: () => dispatch({type: ActionTypes.NextPage}),
        selectPageSize: (size) => dispatch({type: ActionTypes.SelectPageSize, size}),
        selectPage: (number) => dispatch({type: ActionTypes.SelectPage, number})
    })
}


type SortableProps = {
    defaultPageSize: number;
    children: (state: StateDefinition) => React.ReactNode
}

const Pageable: React.FC<SortableProps> =
    ({defaultPageSize, children}) => {
        const reducerBag = useReducer(stateReducer,
            {
                sort: {
                    sorting: "id",
                    direction: Direction.ASC
                },
                page: {
                    page: 0,
                    size: defaultPageSize
                }
            })

        return <SortableContext.Provider value={reducerBag}>
            {children(reducerBag[0])}
        </SortableContext.Provider>
    }

export default Object.assign(Pageable, {SortButton, Pagination, FixPage})