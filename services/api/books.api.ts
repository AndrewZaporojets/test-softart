import { ServerResponse } from '~/types/response'
import { BooksApi } from "~/types/books.api"

export default {
    async getBooks (params?: BooksApi.RequestDTO) {
        return await $http.$get('/api/v1/books', { params }) as ServerResponse<BooksApi.ResponseDTO[]>
    }
}