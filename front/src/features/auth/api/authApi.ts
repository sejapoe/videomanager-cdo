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

export const sessionKeys = {
    session: {
        root: ['session'],
        currentUser: () => [...sessionKeys.session.root, 'currentUser'],
    },

    mutation: {
        login: () => [...sessionKeys.session.root, 'login'],
        create: () => [...sessionKeys.session.root, 'create'],
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
    queryKey: sessionKeys.session.currentUser(),
    queryFn: async () => {
        const response = await api.getUser();

        const user = mapUser(response.data);

        addUser(user);

        return user;
    },
    ...options
})