import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse, RequestParams} from "../../../../api";
import {CreateLecturerReqDto, UserResDto} from "../../../../api/Api.ts";
import {adminKey} from "../../api";
import {Lecturer, mapLecturer} from "../model";

export const lecturerKeys = {
    lecturers: {
        root: [...adminKey, 'lecturers']
    },

    lecturer: {
        root: [...adminKey, 'lecturer']
    },

    mutation: {
        create: () => [...lecturerKeys.lecturer.root, 'create']
    }
}

type UseCreateLecturerMutation = UseMutationOptions<
    HttpResponse<UserResDto, unknown>,
    GenericErrorModel,
    CreateLecturerReqDto
>

type UseCreateLecturerOptions = Omit<UseCreateLecturerMutation, 'mutationFn' | 'mutationKey'>

export const useCreateLecturer = (options?: UseCreateLecturerOptions) =>
    useMutation(
        lecturerKeys.mutation.create(),
        (createLecturer: CreateLecturerReqDto) => {
            return api.createLecturer(createLecturer)
        },
        options
    )


export const useLecturers = (params?: RequestParams) =>
    useQuery<Lecturer[], GenericErrorModel, Lecturer[], unknown[]>(
        lecturerKeys.lecturers.root,
        async ({signal}) => {
            const response = await api.getAllLecturers({
                signal,
                ...params
            })

            return response.data.map(mapLecturer)
        }
    )