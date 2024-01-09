export type Department = {
    id: number;
    name: string;
    shortName?: string;
}

export type Institute = {
    id: number;
    name: string;
}

export type InstituteWithDepartments = Institute & {
    departments: Department[];
}