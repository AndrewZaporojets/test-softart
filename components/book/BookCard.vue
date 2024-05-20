<script setup lang="ts">
import type { BooksItem } from "~/types/books.item"
import { formattedDate } from "~/helpers/formatDate"

const props = withDefaults(defineProps<{
	book: BooksItem;
}>(), {
	book: () => ({} as BooksItem)
})

// К сожалению с данного апи возвращает битые картинки, в связи с чем внизу небольшой костыль
</script>

<template lang="pug">
	div.book-card
		nuxt-link.book-card__link(:to="`/books/${props.book.isbn}`")
		img.book-card__img(:src="`https://picsum.photos/seed/${book.isbn}/480/640`" alt="Preview")
		div.book-card__date
			| {{ formattedDate(props.book.published, { day: '2-digit', month: '2-digit' }).replace('/', '.') }}
		h5.book-card__title
			| {{ book.title }}
</template>

<style scoped lang="scss">
.book-card {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: scaleSize($scale, 12);
	height: scaleSize($scale, 420);
	padding: scaleSize($scale, 20);
	border-radius: scaleSize($scale, 8);
	overflow: hidden;
	text-decoration: none;
	color: $white;

	@include adaptive($mobile) {
		gap: scaleSize($mobileScale, 8);
		height: scaleSize($mobileScale, 340);
		padding: scaleSize($mobileScale, 15);
		border-radius: scaleSize($mobileScale, 8);
	}

	&__link {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0;
	}

	&__img {
		z-index: -1;
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(.68)
	}

	&__title {
		@include textRestrictions(1);
	}

	&__date {
		font-size: scaleSize($scale, 20);

		@include adaptive($mobile) {
			font-size: scaleSize($mobileScale, 17);
		}
	}
}
</style>