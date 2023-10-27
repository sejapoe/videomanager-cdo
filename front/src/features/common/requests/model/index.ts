import {Lecturer} from "../../../admin/requests/api/lecturerApi.ts";
import {Department, Institute} from "../../institutes/model";

export type RequestStatus = "DENIED" | "CREATED" | "WIP" | "COMPLETE";

export interface Request {
    id: number;
    name: string;
    lecturer: Lecturer;
    institute: Institute;
    department: Department;
    linkToMoodle: string;
    status: RequestStatus;
}