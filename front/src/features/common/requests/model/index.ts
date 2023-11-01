import {Lecturer} from "../../../admin/lecturers/api";
import {Department, Institute} from "../../institutes/model";
import {Correction} from "../../corrections/model";

export type RequestStatus = "DENIED" | "CREATED" | "WIP" | "COMPLETE";

export type Request = {
    id: number;
    name: string;
    lecturer: Lecturer;
    institute: Institute;
    department: Department;
    linkToMoodle: string;
    status: RequestStatus;
}

export type FullRequest = Request & {
    corrections: Correction[]
}