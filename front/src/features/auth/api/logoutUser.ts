import {deleteToken} from "../authModel.ts";
import {QueryClient} from "@tanstack/react-query";
import {sessionKeys} from "./authApi.ts";

export function logout(queryClient: QueryClient) {
    deleteToken();
    queryClient.removeQueries(sessionKeys.session.currentUser());
}