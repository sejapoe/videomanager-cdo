import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {
    CreateDepartmentReqDto,
    CreateInstituteReqDto,
    CreateInstitutesWithDepartmentsReqDto,
    DeleteDepartmentReqDto,
    DeleteInstituteReqDto,
    DepartmentResDto,
    InstituteWithDepartmentsResDto,
    ProblemDetailDto,
} from "../../../../api/Api.ts";
import {institutesKeys} from "../../../common/institutes/api";

export const adminInstitutesKeys = {
    mutation: {
        create: () => [...institutesKeys.institutes.root, 'create'],
        createDepartment: () => [...institutesKeys.institutes.root, 'createDepartment'],
        createMultiple: () => [...institutesKeys.institutes.root, 'createMultiple'],
        delete: () => [...institutesKeys.institutes.root, 'delete'],
        deleteDepartment: () => [...institutesKeys.institutes.root, 'deleteDepartment'],
    }
}

type UseCreateInstituteMutation = UseMutationOptions<
    HttpResponse<InstituteWithDepartmentsResDto, unknown>,
    GenericErrorModel,
    CreateInstituteReqDto
>

type UseCreateInstituteOptions = Omit<UseCreateInstituteMutation, 'mutationFn' | 'mutationKey'>

export const useCreateInstitute = (options?: UseCreateInstituteOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.create(),
        (createInstitute: CreateInstituteReqDto) => {
            return api.createInstitute(createInstitute)
        },
        options
    )

type UseCreateDepartmentMutation = UseMutationOptions<
    HttpResponse<DepartmentResDto, unknown>,
    GenericErrorModel,
    CreateDepartmentReqDto
>

type UseCreateDepartmentOptions = Omit<UseCreateDepartmentMutation, 'mutationFn' | 'mutationKey'>

export const useCreateDepartment = (options?: UseCreateDepartmentOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.createDepartment(),
        (createDepartment: CreateDepartmentReqDto) => {
            return api.createDepartment(createDepartment)
        },
        options
    )

type UseCreateInstitutesMutation = UseMutationOptions<
    HttpResponse<InstituteWithDepartmentsResDto[], unknown>,
    GenericErrorModel,
    CreateInstitutesWithDepartmentsReqDto
>

type UseCreateInstitutesOptions = Omit<UseCreateInstitutesMutation, 'mutationFn' | 'mutationKey'>

export const useCreateInstitutes = (options?: UseCreateInstitutesOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.createMultiple(),
        (createInstitutes: CreateInstitutesWithDepartmentsReqDto) => {
            return api.createInstitutes(createInstitutes)
        },
        options
    )

type UseDeleteInstituteMutation = UseMutationOptions<HttpResponse<void>, HttpResponse<unknown, ProblemDetailDto & {
    departmentIds: number[]
}>, DeleteInstituteReqDto>

type UseDeleteInstituteOptions = Omit<UseDeleteInstituteMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteInstitute = (options?: UseDeleteInstituteOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.delete(),
        (dto) => {
            return api.deleteInstitute(dto);
        },
        options
    )

type UseDeleteDepartmentMutation = UseMutationOptions<HttpResponse<void>, HttpResponse<unknown, ProblemDetailDto>, DeleteDepartmentReqDto>

type UseDeleteDepartmentOptions = Omit<UseDeleteDepartmentMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteDepartment = (options?: UseDeleteDepartmentOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.deleteDepartment(),
        (dto) => {
            return api.deleteDepartment(dto);
        },
        options
    )