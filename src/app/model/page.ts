import { People } from "./people"

export interface Page {
    content: People[],
    pageable: {
        sort: {
            unsorted: boolean,
            empty: boolean,
            sorted: boolean
        },
        offset: number,
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    first: boolean,
    size: number,
    number: number,
    numberOfElements: number,
    sort: {
        unsorted: boolean,
        empty: boolean,
        sorted: boolean
    },
    empty: boolean
}