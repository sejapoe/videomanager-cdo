import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {mapPage, Page} from "../../../common/model";
import {ArchiveEntry, mapArchiveEntry} from "../model";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {ArchiveEntryResDto, CreateArchiveEntryReqDto} from "../../../../api/Api.ts";

export const archiveKeys = {
    archive: {
        root: ['archive'],
        byId: (id: number) => [...archiveKeys.archive.root, id],
        byFilter: (filter: ArchiveFilter) => [...archiveKeys.archive.root, filter]
    },

    mutation: {
        create: () => [...archiveKeys.archive.root, 'create']
    }
}

type UseCreateRequestMutation = UseMutationOptions<
    HttpResponse<ArchiveEntryResDto, unknown>,
    GenericErrorModel,
    CreateArchiveEntryReqDto
>

type UseCreateRequestOptions = Omit<UseCreateRequestMutation, 'mutationFn' | 'mutationKey'>

export const useCreateArchiveEntry = (options?: UseCreateRequestOptions) =>
    useMutation(
        archiveKeys.mutation.create(),
        (dto: CreateArchiveEntryReqDto) => {
            return api.createArchive(dto)
        },
        options
    )

export type ArchiveFilter = {
    page?: number;
    size?: number;

    name?: string;
    user?: number[];
    institute?: number[];
    department?: number[];

    sorting?: string;
    direction?: "ASC" | "DESC";
}

export const useArchiveEntries = (filter: ArchiveFilter) =>
    useQuery<Page<ArchiveEntry>, GenericErrorModel, Page<ArchiveEntry>, unknown[]>(
        archiveKeys.archive.byFilter(filter),
        async ({signal}) => {
            const response = await api.getAllArchiveEntries(filter, {
                signal
            })

            return mapPage(response.data as any, mapArchiveEntry)
        }
    )

export const useArchiveEntry = (id: number) =>
    useQuery<ArchiveEntry, GenericErrorModel, ArchiveEntry, unknown[]>(
        archiveKeys.archive.byId(id),
        async ({signal}) => {
            const response = await api.getArchive(id, {
                signal
            })

            return mapArchiveEntry(response.data)
        }
    )