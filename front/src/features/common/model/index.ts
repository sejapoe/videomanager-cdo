import {PageableObjectDto} from "../../../api/Api.ts";

export type Page<T> = {
    totalPages: number;
    totalElements: number;
    pageable: PageableObjectDto;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    content: T[]
}

export const mapPage = <T, R, >(dto: Page<T>, mapper: (t: T) => R): Page<R> => ({
    ...dto,
    content: dto.content.map(mapper)
})