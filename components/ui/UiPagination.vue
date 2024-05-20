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
<template>
	<ul class="list ui-pagination">
		<li v-for="(pageNum, i) in pageNums" :key="i" class="ui-pagination__item">
			<button
				v-if="Number.isInteger(pageNum)"

				class="ui-pagination__btn"
				:class="{'ui-pagination__btn--active' : pageNum === page}"
				:disabled="isDisabled"
				@click="clickBtnPage(pageNum)"
			>
				{{ pageNum }}
			</button>
			<button
				v-else
				class="ui-pagination__btn"
			>
				{{ pageNum }}
			</button>
		</li>
	</ul>
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

	&__btn {
		display: inline-block;
		background-color: $black;
		border-color: transparent;
		border-radius: 8px;
		color: $white;
		padding: 10px;
		min-width: scaleSize($scale, 36);
		@include breakpoint(pad down) {
			min-width: scaleSize($mobileScale, 36);
		}

		&--active {
			border-color: $white !important;
		}
	}
}
</style>