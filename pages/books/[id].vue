<script setup lang="ts">
import { useBooksStore } from "~/store/books"
import type { BooksItem } from "~/types/books.item"
import { formattedDate } from "~/helpers/formatDate"

const router = useRouter()

const route = useRoute()
const isbn = route.params.id

const booksStore = useBooksStore()
const { booksViewedState } = storeToRefs(booksStore)

const currentBook = computed<BooksItem>(() => {
	return booksViewedState.value?.data.find(book => book.isbn === isbn)
})
</script>

<template>
	<div class="book-page container">
		<div class="book-page__back" @click="router.back()">
			Back to all Books
		</div>
		<h4 class="book-page__title">
			{{ currentBook.title }}
		</h4>
		<img class="book-page__img" :src="`https://picsum.photos/seed/${currentBook.isbn}/480/640`" alt="Preview"/>
		<div class="book-page__info">
			<div class="book-page__info-author">{{ currentBook.author }}</div>
			<div class="book-page__info-genre">{{ currentBook.genre }}</div>
			<div class="book-page__info-date">
				{{ formattedDate(currentBook.published, { day: '2-digit', month: '2-digit' }).replace('/', '.') }}
			</div>
		</div>
		<div class="book-page__description">
			{{ currentBook.description }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.book-page {
	&__back {
		cursor: pointer;
		user-select: none;
	}

	&__title {
		margin: scaleSize($scale, 40) scaleSize($scale, 0);
	}

	&__img {
		width: 100%;
		object-fit: cover;
		max-height: scaleSize($scale, 640);

		@include adaptive($mobile) {
			max-height: scaleSize($mobileScale, 300);
		}
	}

	&__info {
		display: flex;
		gap: scaleSize($scale, 20);
		margin-top: scaleSize($scale, 30);
		align-items: center;

		@include adaptive($mobile) {
			gap: scaleSize($mobileScale, 20);
			margin-top: scaleSize($mobileScale, 15);
		}
	}

	&__description {
		margin-top: scaleSize($scale, 30);

		@include adaptive($mobile) {
			margin-top: scaleSize($mobileScale, 15);
		}
	}
}
</style>