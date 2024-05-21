<script setup lang="ts">
import { useBooksStore } from "~/store/books"
import { storeToRefs } from "pinia"
import { computed } from 'vue'
import type { BooksItem } from "~/types/books.item"

const booksStore = useBooksStore()

const { booksViewedState } = storeToRefs(booksStore)

const booksViewed = computed<BooksItem[]>(() => {
	return booksViewedState.value?.shownPages ?? []
})

const booksPagination = computed(() => {
	return booksViewedState.value?.pagination
})

const toggleLike = (book: BooksItem) => {
	const foundBook = booksViewed.value.find(activeBook => activeBook.isbn === book.isbn)
	if (foundBook) {
		foundBook.isLiked = !foundBook.isLiked
	}
}

const deleteCard = (bookToDelete: BooksItem) => {
	if (booksViewedState.value) {
		booksViewedState.value.data = booksViewedState.value.data.filter(book => bookToDelete.isbn !== book.isbn)
		booksViewedState.value.updateBooksList(0, 9)
		booksViewedState.value.total = booksViewedState.value.data.length
	}
}

const toggleFilterLikedBooks = () => {
	booksViewedState.value && (
		booksViewedState.value.showLikedBooks = !booksViewedState.value.showLikedBooks,
			booksViewedState.value.updateBooksList(0, 9)
	)
}
</script>


<template lang="pug">
	div.book-list
		h4.book-list__title
			| List of all available books
		div.book-list__filter
			button.book-list__filter-btn(class=['btn'] @click="toggleFilterLikedBooks")
				| Show liked books
		div.book-list__items
			book-card(
				v-for="book in booksViewed"
				:key="book.isbn"
				:book="book"
				@toggle-like="toggleLike(book)"
				@delete-card="deleteCard(book)"
				class="book-list__item"
			)
		ui-pagination.book-list__pagination(
			v-if="booksPagination && booksPagination.pageCount > 1 && !booksViewedState.showLikedBooks"
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

	&__filter {
		margin: scaleSize($scale, 20) 0;

		@include adaptive($mobile) {
			margin: scaleSize($mobileScale, 15) 0;
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