import {InstituteResDto, InstituteWithDepartmentsResDto, RequestParams} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {Institute, InstituteWithDepartments} from "../../../common/institutes/model";


export function mapInstitute(instituteDto: InstituteResDto): Institute {
    return instituteDto;
}

export function mapInstituteWithDepartments(instituteDto: InstituteWithDepartmentsResDto): InstituteWithDepartments {
    return instituteDto
}

export const instituteKeys = {
    institutes: {
        root: ['institutes'],
    },

    institute: {
        root: ['institute']
    },

    mutation: {
        create: () => [...instituteKeys.institutes.root, 'create'],
        delete: () => [...instituteKeys.institutes.root, 'delete'],
        update: () => [...instituteKeys.institutes.root, 'update'],
    }
}

export const useInstitutes = (params?: RequestParams) =>
    useQuery<InstituteWithDepartments[], GenericErrorModel, InstituteWithDepartments[], string[]>({
        queryKey: instituteKeys.institute.root,
        queryFn: async ({signal}) => {
            const response = await api.getAllInstitutes({
                signal,
                ...params
            });

            return response.data.map(mapInstituteWithDepartments)
        }
    })
