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
    linkToVideo: string;
    status: RequestStatus;
    unreadCount: number;
}

export type FullRequest = Omit<Request, 'unreadCount'> & {
    corrections: Correction[]
}