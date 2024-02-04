import {Lecturer} from "../../lecturers/model";
import {Department, Institute} from "../../../common/institutes/model";
import {ArchiveEntryResDto} from "../../../../api/Api.ts";
import {ShortRequest} from "../../../common/requests/model";

export type ArchiveEntry = {
    id: number;
    name: string;
    lecturer: Lecturer;
    institute: Institute;
    department: Department;
    linkToMoodle: string;
    linkToVideo: string;
    request?: ShortRequest
    description?: string;
}

export const mapArchiveEntry = (dto: ArchiveEntryResDto): ArchiveEntry => dto;