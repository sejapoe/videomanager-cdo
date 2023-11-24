import {Lecturer} from "../../lecturers/model";
import {Department, Institute} from "../../../common/institutes/model";
import {ArchiveEntryResDto} from "../../../../api/Api.ts";

export type ArchiveEntry = {
    id: number;
    name: string;
    lecturer: Lecturer;
    institute: Institute;
    department: Department;
    linkToMoodle: string;
    linkToVideo: string;
}

export const mapArchiveEntry = (dto: ArchiveEntryResDto): ArchiveEntry => dto;