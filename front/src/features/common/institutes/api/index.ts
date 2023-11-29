import {InstituteResDto, InstituteWithDepartmentsResDto, RequestParams} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {Institute, InstituteWithDepartments} from "../model";


export function mapInstitute(instituteDto: InstituteResDto): Institute {
    return instituteDto;
}

export function mapInstituteWithDepartments(instituteDto: InstituteWithDepartmentsResDto): InstituteWithDepartments {
    return instituteDto
}

export const institutesKeys = {
    institutes: {
        root: ['institutes'],
    },

    departments: {
        root: () => [...institutesKeys.institutes.root, 'departments'],
    },

    mutation: {
        create: () => [...institutesKeys.institutes.root, 'create'],
        delete: () => [...institutesKeys.institutes.root, 'delete'],
        update: () => [...institutesKeys.institutes.root, 'update'],
    }
}

export const useInstitutes = (params?: RequestParams) =>
    useQuery<InstituteWithDepartments[], GenericErrorModel, InstituteWithDepartments[], unknown[]>(
        institutesKeys.institutes.root,
        async ({signal}) => {
            const response = await api.getAllInstitutes({
                signal,
                ...params
            });

            return response.data.map(mapInstituteWithDepartments)
        }
    )
