<script lang="ts" setup>
import { ref } from '#imports'

const emit = defineEmits(['on-page-click'])

const props = withDefaults(defineProps<{
	currentPage: number,
	pages: number,
	isDisabled?: boolean
}>(), {
	currentPage: 1,
	pages: 0,
	isDisabled: false
})

const currentPage = computed(() => props.currentPage)
const pages = computed(() => props.pages)

const page = ref(0)
syncRef(page, currentPage)

const clickBtnPage = (item) => {
	page.value = item

	emit('on-page-click', item)
}

const pageNums = computed(() => {
	const result = []
	const last_page = pages.value
	const onSides = 0
	const current_page = currentPage.value
	for (let i = 1; i <= last_page; i++) {
		const offset = (i === 1 || last_page) ? onSides + 1 : onSides
		if (i === 1 || (current_page - offset <= i && current_page + offset >= i) ||
			i === current_page || i === last_page) {
			result.push(i)
		} else if (i === current_page - (offset + 1) || i === current_page + (offset + 1)) {
			result.push('...')
		}
	}
	return result
})
</script>
<template lang="pug">
	ul.list.ui-pagination
		li.ui-pagination__item(v-for="(pageNum, i) in pageNums" :key="i")
			button.ui-pagination__btn(
				class=['btn']
				v-if="Number.isInteger(pageNum)"
				:class="{ 'ui-pagination__btn--active': pageNum === page }"
				:disabled="isDisabled"
				@click="clickBtnPage(pageNum)"
			)
				| {{ pageNum }}
			button.ui-pagination__btn(v-else)
				| {{ pageNum }}
</template>

<style lang="scss">
@import "assets/scss/core";

.ui-pagination {
	display: flex;
	align-items: center;
	width: fit-content;
	flex-wrap: wrap;
	gap: scaleSize($scale, 6);
	@include breakpoint(pad down) {
		gap: scaleSize($mobileScale, 6);
	}

	&__item {
		list-style-type: none;
	}
}
</style>