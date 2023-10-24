import {deleteToken} from "../authModel.ts";
import {QueryClient} from "@tanstack/react-query";
import {authKeys} from "./authApi.ts";

export function logout(queryClient: QueryClient) {
    deleteToken();
    queryClient.removeQueries(authKeys.session.currentUser());
}