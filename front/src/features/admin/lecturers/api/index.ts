import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse, RequestParams} from "../../../../api";
import {CreateLecturerReqDto, UserResDto} from "../../../../api/Api.ts";
import {adminKey} from "../../api";
import {Lecturer, mapLecturer} from "../model";
import {mapPage, Page} from "../../../common/model";

export const lecturerKeys = {
    lecturers: {
        root: [...adminKey, 'lecturers'],
        byFilter: (filter: LecturersFilter) => [...lecturerKeys.lecturers.root, filter]
    },

    mutation: {
        create: () => [...lecturerKeys.lecturers.root, 'create']
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

export type LecturersFilter = {
    page?: number;
    size?: number;
    enabled?: boolean;
    sorting?: string;
    direction?: "ASC" | "DESC";
}

export const useLecturers = (filter: LecturersFilter, params?: RequestParams) =>
    useQuery<Page<Lecturer>, GenericErrorModel, Page<Lecturer>, unknown[]>(
        lecturerKeys.lecturers.byFilter(filter),
        async ({signal}) => {
            const response = await api.getLecturers(filter,
                {
                    signal,
                    ...params
                })

            return mapPage(response.data as any, mapLecturer)
        }
    )