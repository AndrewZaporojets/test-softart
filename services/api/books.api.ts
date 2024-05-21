import { ServerArrayResponse } from '~/types/response'
import { BooksApi } from "~/types/books.api"
import { BooksItem } from "~/types/books.item"

export default {
    async getBooks (params?: BooksApi.RequestDTO) {
        return await $http.$get('/api/v1/books', { params }) as ServerArrayResponse<BooksItem>
    }
}