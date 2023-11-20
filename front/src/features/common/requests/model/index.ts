import {Department, Institute} from "../../institutes/model";
import {Correction} from "../../corrections/model";
import {Lecturer} from "../../../admin/lecturers/model";

export type RequestStatus = "DENIED" | "CREATED" | "WIP" | "COMPLETE";

export type Request = {
    id: number;
    name: string;
    lecturer: Lecturer;
    institute: Institute;
    department: Department;
    linkToMoodle: string;
    status: RequestStatus;
    isUnread: boolean;
}

export type FullRequest = Request & {
    corrections: Correction[]
}