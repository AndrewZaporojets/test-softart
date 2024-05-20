import { defineStore } from "pinia"
import { useLazyAsyncData } from "#app"
import { computed, ref } from "#imports"
import { BooksApi } from "~/types/books.api"
import booksApi from "~/services/api/books.api";
import type { BooksItem } from "~/types/books.item"

export const useBooksStore = defineStore('booksStore', () => {
    const requestParams = ref<BooksApi.RequestDTO>({
        _quantity: 20,
        _locale: 'en_US',
    })

    const computedRequestsParams = computed<BooksApi.RequestDTO>(() => {
        return { ...requestParams.value }
    })

    const fetchRequestsBooks = async (params: BooksApi.RequestDTO): Promise<BooksApi.ResponseDTO> => {
        try {
            return await booksApi.getBooks(params)
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    const setupRequestsListState = async () => {
        const data = ref<BooksItem[]>([])
        const perPage = ref(9)
        const total = ref(0)

        const response = await fetchRequestsBooks(computedRequestsParams.value)
        total.value = response.total
        data.value = response.data.slice(0, perPage.value)

        const pagination = useOffsetPaginationWithUtilities({
            pageSize: 9,
            total: total.value,
            onPageChange: async (options) => {
                const start = (options.currentPage - 1) * options.currentPageSize
                const end = start + options.currentPageSize
                data.value = response.data.slice(start, end)
            }
        })

        return {
            pagination,
            data
        }
    }

    const { data: booksViewedState, refresh: booksRefresh } = useLazyAsyncData(
        'books-list', setupRequestsListState, { watch: [computedRequestsParams.value], server: false })

    return {
        booksViewedState,
        booksRefresh,
        requestParams
    }
})
