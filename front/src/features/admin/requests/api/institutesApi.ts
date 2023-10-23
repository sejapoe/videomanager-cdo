import {InstituteResDto, RequestParams} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";

export interface Department {
    id: number;
    name: string;
}

export interface Institute {
    id: number;
    name: string;
    departments: Department[];
}


export function mapInstitute(instituteDto: InstituteResDto): Institute {
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
    useQuery<Institute[], GenericErrorModel, Institute[], string[]>({
        queryKey: instituteKeys.institute.root,
        queryFn: async ({signal}) => {
            const response = await api.getAllInstitutes({
                signal,
                ...params
            });

            return response.data.map(mapInstitute)
        }
    })
