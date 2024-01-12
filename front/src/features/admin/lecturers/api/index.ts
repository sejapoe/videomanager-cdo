import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse, RequestParams} from "../../../../api";
import {CreateLecturerReqDto, RenameLecturerReqDto, UserResDto} from "../../../../api/Api.ts";
import {Lecturer, mapLecturer} from "../model";
import {mapPage, Page} from "../../../common/model";

export const lecturerKeys = {
    lecturers: {
        root: ['lecturers'],
        byId: (id: number) => [...lecturerKeys.lecturers.root, id],
        byFilter: (filter: LecturersFilter) => [...lecturerKeys.lecturers.root, filter]
    },

    mutation: {
        create: () => [...lecturerKeys.lecturers.root, 'create'],
        rename: () => [...lecturerKeys.lecturers.root, 'rename'],
        resetPassword: () => [...lecturerKeys.lecturers.root, 'reset_password'],
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

    name?: string;
    email?: string;
    enabled?: boolean[];

    sorting?: string;
    direction?: "ASC" | "DESC";
}

export const useLecturers = (filter: LecturersFilter,
                             params?: RequestParams,
                             options?: UseQueryOptions<Page<Lecturer>, GenericErrorModel, Page<Lecturer>, unknown[]>) =>
    useQuery<Page<Lecturer>, GenericErrorModel, Page<Lecturer>, unknown[]>(
        lecturerKeys.lecturers.byFilter(filter),
        async ({signal}) => {
            const response = await api.getLecturers(filter,
                {
                    signal,
                    ...params
                })

            return mapPage(response.data as any, mapLecturer)
        },
        options
    )

type UseResetPasswordMutation = UseMutationOptions<
    HttpResponse<void, unknown>,
    GenericErrorModel,
    number
>

type UseResetPasswordOptions = Omit<UseResetPasswordMutation, 'mutationFn' | 'mutationKey'>

export const useResetPasswordLecturer = (options?: UseResetPasswordOptions) =>
    useMutation(
        lecturerKeys.mutation.resetPassword(),
        (id: number) => {
            return api.resetPassword(id)
        },
        options
    )

type UserRenameLecturerMutation = UseMutationOptions<
    HttpResponse<UserResDto, unknown>,
    GenericErrorModel,
    RenameLecturerReqDto
>

type UserRenameLecturerOptions = Omit<UserRenameLecturerMutation, 'mutationFn' | 'mutationKey'>

export const useRenameLecturer = (options?: UserRenameLecturerOptions) =>
    useMutation(
        lecturerKeys.mutation.rename(),
        (dto: RenameLecturerReqDto) => {
            return api.renameUser(dto)
        },
        options
    )

export const useLecturer = (id: number, params?: RequestParams) =>
    useQuery<Lecturer, GenericErrorModel, Lecturer, unknown[]>(
        lecturerKeys.lecturers.byId(id),
        async ({signal}) => {
            const response = await api.getUserById(id,
                {
                    signal,
                    ...params
                })

            return mapLecturer(response.data)
        },
    )