import { noop, UseOffsetPaginationOptions, UseOffsetPaginationReturn } from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import { UnwrapNestedRefs } from 'vue-demi'

export type useOffsetPaginationWithUtilitiesReturn = UseOffsetPaginationReturn & {
	loadMore: () => void
}

export type UseOffsetPaginationReturnValue = UnwrapNestedRefs<UseOffsetPaginationReturn>

export const useOffsetPaginationWithUtilities = (options: UseOffsetPaginationOptions & {
	onLoadMore?: (returnValue: UseOffsetPaginationReturnValue) => unknown
}): useOffsetPaginationWithUtilitiesReturn => {
	const {
		total = Number.POSITIVE_INFINITY,
		pageSize = 10,
		page = 1,
		onPageChange = noop,
		onPageSizeChange = noop,
		onPageCountChange = noop,
		onLoadMore = noop
	} = options

	const currentPageSize = useClamp(pageSize, 1, Number.POSITIVE_INFINITY)

	const pageCount = computed(() => Math.max(
		1,
		Math.ceil((toValue(total)) / toValue(currentPageSize))
	))

	const currentPage = useClamp(page, 1, pageCount)

	const isFirstPage = computed(() => currentPage.value === 1)
	const isLastPage = computed(() => currentPage.value === pageCount.value)

	if (isRef(page)) { syncRef(page, currentPage) }

	if (isRef(pageSize)) { syncRef(pageSize, currentPageSize) }

	function prev () {
		currentPage.value--
	}

	function next () {
		currentPage.value++
	}

	function loadMore () {
		ignoreUpdates(() => {
			currentPage.value++
		})
		onLoadMore(reactive(returnValue))
	}

	const returnValue = {
		currentPage,
		currentPageSize,
		pageCount,
		isFirstPage,
		isLastPage,
		prev,
		next,
		loadMore
	}

	const { ignoreUpdates } = watchIgnorable(currentPage, () => {
		onPageChange(reactive(returnValue))
	})

	watch(currentPageSize, () => {
		onPageSizeChange(reactive(returnValue))
	})

	watch(pageCount, () => {
		onPageCountChange(reactive(returnValue))
	})

	return returnValue
}
