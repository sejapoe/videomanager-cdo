import {RequestParams, UserResDto} from "../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../api";
import {authKeys} from "./authApi.ts";

export interface User {
    id: number;
    fullName: string;
    email: string;
}

export function mapUser(userDto: UserResDto): User {
    return userDto;
}

export const useActivation = (uuid: string, params?: RequestParams) =>
    useQuery<User, GenericErrorModel, User, string[]>({
        queryKey: authKeys.activation.root,
        queryFn: async ({signal}) => {
            console.log(uuid)

            const response = await api.getActivation(uuid, {
                signal,
                ...params
            })

            console.log(response)

            return mapUser(response.data)
        }
    })
