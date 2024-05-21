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
        _seed: null
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
        const shownPages = ref<BooksItem[]>([])
        const showLikedBooks = ref(false)
        const response = await fetchRequestsBooks(computedRequestsParams.value)

        data.value = response.data
        total.value = data.value.length

        const updateBooksList = (start: number, end: number) => {
            shownPages.value = data.value
            if (showLikedBooks.value) {
                shownPages.value = shownPages.value.filter(book => book.isLiked)
            } else {
                shownPages.value = shownPages.value.slice(start, end)
                while (shownPages.value.length < perPage.value && end < response.data.length) {
                    end++
                }
            }

        }

        const pagination = useOffsetPaginationWithUtilities({
            pageSize: perPage.value,
            total: computed(() => total.value),
            onPageChange: async (options) => {
                const start = (options.currentPage - 1) * options.currentPageSize
                const end = start + options.currentPageSize
                updateBooksList(start, end)
            }
        })

        updateBooksList(0, perPage.value)

        return {
            pagination,
            data,
            total,
            shownPages,
            updateBooksList,
            showLikedBooks
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
