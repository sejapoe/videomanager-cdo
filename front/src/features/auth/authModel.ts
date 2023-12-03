import {createStore, StateCreator, useStore} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {apiProvider} from "../../api";
import {User} from "../common/users/model";

type StoredUser = {
    info: User
    accessToken: string
    refreshToken: string
};

type SessionState = {
    user: StoredUser | null;
    addUser: (user: StoredUser) => void;
    deleteUser: () => void;
}

const createSessionSlice: StateCreator<
    SessionState,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    SessionState
> = (set) => ({
    user: null,
    addUser: (user) => {
        set({user}, false, 'session/addUser')
        apiProvider.setSecurityData(user.accessToken)
    },
    deleteUser: () => {
        set({user: null}, false, 'session/deleteUser')
        apiProvider.setSecurityData(null)
    }
})

export const sessionStore = createStore<SessionState>()(
    persist(
        devtools(
            (...a) => ({...createSessionSlice(...a)}),
            {name: 'Session Store'},
        ),
        {
            name: 'session',
            onRehydrateStorage: () => (state) => {
                if (state?.user) {
                    const {user} = state;
                    apiProvider.setSecurityData(user ? user.accessToken : null)
                }
            }
        }
    )
)

export const useAuth = () => useStore(sessionStore, (state) => !!state.user?.accessToken);

export const useCurrentUser = () => useStore(sessionStore, (state) => state.user);

export const addUser = (user: StoredUser) => sessionStore.getState().addUser(user);

export const deleteToken = () => sessionStore.getState().deleteUser();