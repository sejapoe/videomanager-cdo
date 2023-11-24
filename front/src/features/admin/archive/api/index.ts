import {useQuery} from "@tanstack/react-query";
import {mapPage, Page} from "../../../common/model";
import {ArchiveEntry, mapArchiveEntry} from "../model";
import api, {GenericErrorModel} from "../../../../api";

export const archiveKeys = {
    archive: {
        root: ['archive'],
        byFilter: (filter: ArchiveFilter) => [...archiveKeys.archive.root, filter]
    }
}

export type ArchiveFilter = {
    page?: number;
    size?: number;

    user?: number;
    institute?: number;
    department?: number;

    sorting?: string;
    direction?: "ASC" | "DESC";
}


export const useArchiveEntries = (filter: ArchiveFilter) =>
    useQuery<Page<ArchiveEntry>, GenericErrorModel, Page<ArchiveEntry>, unknown[]>(
        archiveKeys.archive.byFilter(filter),
        async () => {
            const response = await api.getAllArchiveEntries(filter)

            return mapPage(response.data as any, mapArchiveEntry)
        }
    )