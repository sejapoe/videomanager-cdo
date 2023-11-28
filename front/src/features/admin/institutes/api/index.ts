import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {
    CreateDepartmentReqDto,
    CreateInstituteReqDto,
    CreateInstitutesWithDepartmentsReqDto,
    DepartmentResDto,
    InstituteWithDepartmentsResDto,
} from "../../../../api/Api.ts";
import {institutesKeys} from "../../../common/institutes/api";

export const adminInstitutesKeys = {
    mutation: {
        create: () => [...institutesKeys.institutes.root, 'create'],
        createDepartment: () => [...institutesKeys.institutes.root, 'createDepartment'],
        createMultiple: () => [...institutesKeys.institutes.root, 'createMultiple'],
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