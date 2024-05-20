import type { BooksItem } from "~/types/books.item"

export namespace BooksApi {
    export type RequestDTO = {
        _quantity: number,
        _locale: string,
        _seed: number | null
    }

    export type ResponseDTO = ServerArrayResponse<BooksItem.DTO>
}
