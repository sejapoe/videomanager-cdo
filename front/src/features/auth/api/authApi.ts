import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, UserDto} from "../../../api";
import {addUser, Role} from "../authModel.ts";

export interface User {
    email: string;
    token: string;
    fullName: string;
    role: Role
}

function mapUser(userDto: UserDto): User {
    return userDto;
}

export const authKeys = {
    session: {
        root: ['session'],
        currentUser: () => [...authKeys.session.root, 'currentUser'],
    },

    activation: {
        root: ['activation'],
    },

    mutation: {
        login: () => [...authKeys.session.root, 'login'],
        create: () => [...authKeys.session.root, 'create'],
        activate: () => [...authKeys.activation.root, 'activate']
    }
}

type UseCurrentUserQuery = UseQueryOptions<
    User,
    GenericErrorModel,
    User,
    string[]
>;
type UseCurrentUserOptions = Omit<UseCurrentUserQuery, 'queryKey' | 'queryFn'>;

export const useCurrentUser = (options?: UseCurrentUserOptions) => useQuery({
    queryKey: authKeys.session.currentUser(),
    queryFn: async () => {
        const response = await api.getUser();

        const user = mapUser(response.data);

        addUser(user);

        return user;
    },
    ...options
})