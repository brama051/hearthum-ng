export interface PagedResponse<T> {
    content: T[];
    first: number;
    last: number;
    number: number;
    numberOfElements: number;
    size: number;
    sort: string;
    totalElements: number;
    totalPages: number;
}
