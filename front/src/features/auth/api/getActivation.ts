import {RequestParams, UserResDto} from "../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../api";
import {authKeys} from "./authApi.ts";
import {User} from "../../common/users/model";

export function mapUser(userDto: UserResDto): User {
    return userDto;
}

export const useActivation = (uuid: string, params?: RequestParams) =>
    useQuery<User, GenericErrorModel, User, unknown[]>(
        authKeys.activation.root,
        async ({signal}) => {
            const response = await api.getActivation(uuid, {
                signal,
                ...params
            })

            return mapUser(response.data)
        }
    )
