<script setup lang="ts">
import { useBooksStore } from "~/store/books"
import { storeToRefs } from "pinia"
import type { BooksItem } from "~/types/books.item"

const booksStore = useBooksStore()

const { booksViewedState } = storeToRefs(booksStore)

const booksViewed = computed<BooksItem[]>(() => {
	return booksViewedState.value?.data ?? []
})

const booksPagination = computed(() => {
	return booksViewedState.value?.pagination
})
</script>

<template lang="pug">
	div.book-list
		h4.book-list__title
			| List of all available books
		div.book-list__items
			book-card(
				v-for="book in booksViewed"
				:key="book.isbn"
				:book="book"
				class="book-list__item"
			)
		ui-pagination.book-list__pagination(
			v-if="booksPagination && booksPagination.pageCount > 1"
			:current-page="booksPagination.currentPage"
			:pages="booksPagination.pageCount"
			@on-page-click="booksPagination.currentPage = $event"
		)
</template>

<style scoped lang="scss">
.book-list {
	&__items {
		display: flex;
		flex-wrap: wrap;
		gap: scaleSize($scale, 30);
		margin-top: scaleSize($scale, 30);

		@include adaptive($mobile) {
			gap: scaleSize($mobileScale, 30);
			margin-top: scaleSize($mobileScale, 15);
		}
	}

	&__item {
		width: calc(33.333% - scaleSize($scale, 20));

		@include adaptive($pad-pro) {
			width: calc(50% - scaleSize($scale, 15));
		}

		@include adaptive($mobile) {
			width: 100%;
		}
	}

	&__pagination {
		width: 100%;
		@include in-center();
	}
}
</style>