import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {mapPage, Page} from "../../../common/model";
import {ArchiveEntry, mapArchiveEntry} from "../model";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {ArchiveEntryResDto, CreateArchiveEntryReqDto, UpdateArchiveEntryReqDto} from "../../../../api/Api.ts";

export const archiveKeys = {
    archive: {
        root: ['archive'],
        byId: (id: number) => [...archiveKeys.archive.root, id],
        byFilter: (filter: ArchiveFilter) => [...archiveKeys.archive.root, filter]
    },

    mutation: {
        create: () => [...archiveKeys.archive.root, 'create'],
        edit: () => [...archiveKeys.archive.root, 'edit'],
        delete: () => [...archiveKeys.archive.root, 'delete'],
    }
}

type UseCreateArchiveEntryMutation = UseMutationOptions<
    HttpResponse<ArchiveEntryResDto, unknown>,
    GenericErrorModel,
    CreateArchiveEntryReqDto
>

type UseCreateArchiveEntryOptions = Omit<UseCreateArchiveEntryMutation, 'mutationFn' | 'mutationKey'>

export const useCreateArchiveEntry = (options?: UseCreateArchiveEntryOptions) =>
    useMutation(
        archiveKeys.mutation.create(),
        (dto: CreateArchiveEntryReqDto) => {
            return api.createArchive(dto)
        },
        options
    )

type UseEditArchiveEntryMutation = UseMutationOptions<
    HttpResponse<ArchiveEntryResDto, unknown>,
    GenericErrorModel,
    UpdateArchiveEntryReqDto
>

type UseEditArchiveEntryOptions = Omit<UseEditArchiveEntryMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateArchiveEntry = (options?: UseEditArchiveEntryOptions) =>
    useMutation(
        archiveKeys.mutation.create(),
        (dto: UpdateArchiveEntryReqDto) => {
            return api.updateArchiveEntry(dto)
        },
        options
    )

type UseDeleteArchiveEntryMutation = UseMutationOptions<
    HttpResponse<void>,
    GenericErrorModel,
    number
>

type UseDeleteArchiveEntryOptions = Omit<UseDeleteArchiveEntryMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteArchiveEntry = (options?: UseDeleteArchiveEntryOptions) =>
    useMutation(
        archiveKeys.mutation.create(),
        (id: number) => {
            return api.deleteArchiveEntry(id)
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