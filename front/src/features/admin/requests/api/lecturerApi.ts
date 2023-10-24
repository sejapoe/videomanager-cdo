import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse, RequestParams} from "../../../../api";
import {CreateLecturerReqDto, UserResDto} from "../../../../api/Api.ts";

export const lecturerKeys = {
    lecturers: {
        root: ['lecturers']
    },

    lecturer: {
        root: ['lecturer']
    },

    mutation: {
        create: () => [...lecturerKeys.lecturer.root, 'create']
    }
}

type UseCreateLecturerMutation = UseMutationOptions<
    HttpResponse<void, unknown>,
    GenericErrorModel,
    CreateLecturerReqDto,
    unknown
>

type UseCreateLecturerOptions = Omit<UseCreateLecturerMutation, 'mutationFn' | 'mutationKey'>

export const useCreateLecturer = (options?: UseCreateLecturerOptions) =>
    useMutation({
        mutationKey: lecturerKeys.mutation.create(),
        mutationFn: (createLecturer: CreateLecturerReqDto) => {
            return api.createLecturer(createLecturer)
        },
        ...options
    } as UseCreateLecturerOptions)


export interface Lecturer {
    id: number;
    email: string;
    fullName: string;
}

export function mapLecturer(userDto: UserResDto): Lecturer {
    return userDto;
}


export const useLecturers = (params?: RequestParams) =>
    useQuery<Lecturer[], GenericErrorModel, Lecturer[], string[]>({
        queryKey: lecturerKeys.lecturers.root,
        queryFn: async ({signal}) => {
            const response = await api.getAllLecturers({
                signal,
                ...params
            })

            return response.data.map(mapLecturer)
        }
    })