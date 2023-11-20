import {UserResDto} from "../../../../api/Api.ts";

export interface Lecturer {
    id: number;
    email: string;
    fullName: string;
    enabled: boolean;
}

export function mapLecturer(userDto: UserResDto): Lecturer {
    return userDto;
}