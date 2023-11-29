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
    RenameDepartmentReqDto,
    RenameInstituteReqDto,
} from "../../../../api/Api.ts";
import {institutesKeys} from "../../../common/institutes/api";
import {Department, Institute} from "../../../common/institutes/model";

export const adminInstitutesKeys = {
    mutation: {
        create: () => [...institutesKeys.institutes.root, 'create'],
        createMultiple: () => [...institutesKeys.institutes.root, 'createMultiple'],
        delete: () => [...institutesKeys.institutes.root, 'delete'],
        rename: () => [...institutesKeys.institutes.root, 'rename'],

        createDepartment: () => [...institutesKeys.departments.root(), 'create'],
        deleteDepartment: () => [...institutesKeys.departments.root(), 'delete'],
        renameDepartment: () => [...institutesKeys.departments.root(), 'rename'],
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

type UseDeleteDepartmentMutation = UseMutationOptions<HttpResponse<void>, GenericErrorModel, DeleteDepartmentReqDto>

type UseDeleteDepartmentOptions = Omit<UseDeleteDepartmentMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteDepartment = (options?: UseDeleteDepartmentOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.deleteDepartment(),
        (dto) => {
            return api.deleteDepartment(dto);
        },
        options
    )

type UseRenameDepartmentMutation = UseMutationOptions<HttpResponse<Department>, GenericErrorModel, RenameDepartmentReqDto>

type UseRenameDepartmentOptions = Omit<UseRenameDepartmentMutation, 'mutationFn' | 'mutationKey'>

export const useRenameDepartment = (options?: UseRenameDepartmentOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.renameDepartment(),
        (dto) => {
            return api.renameDepartment(dto);
        },
        options
    )

type UseRenameInstituteMutation = UseMutationOptions<HttpResponse<Institute>, GenericErrorModel, RenameInstituteReqDto>

type UseRenameInstituteOptions = Omit<UseRenameInstituteMutation, 'mutationFn' | 'mutationKey'>

export const useRenameInstitute = (options?: UseRenameInstituteOptions) =>
    useMutation(
        adminInstitutesKeys.mutation.rename(),
        (dto) => {
            return api.renameInstitute(dto);
        },
        options
    )