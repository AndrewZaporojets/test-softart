import { BooksItem } from "~/types/books.item"
import { ServerArrayResponse } from "~/types/response"

export namespace BooksApi {
    export type RequestDTO = {
        _quantity: number,
        _locale: string,
        _seed: number | null
    }

    export type ResponseDTO = ServerArrayResponse<BooksItem>
}
