<script lang="ts" setup>

const props = withDefaults(defineProps<{
	prefix?: string,
	name?: string,
	color?: string,
	size?: 'big' | 'medium' | 'small' | 'xsmall' | ''
}>(), {
	prefix: 'icon',
	name: '',
	color: '#171717',
	size: ''
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template lang="pug">
	svg.ui-svg(:class="`ui-svg_${size}`")
		use(:href="symbolId" :fill="color")
</template>

<style scoped lang="scss">
.ui-svg {
	@each $size, $height in
			(big, 24),
			(medium, 20),
			(small, 16),
			(xsmall, 12){
		&#{'_' + $size} {
			height: scaleSize($scale, $height);
			width: scaleSize($scale, $height);

			@include breakpoint(pad down) {
				height: scaleSize($mobileScale, $height);
				width: scaleSize($mobileScale, $height);
			}
		}
	}
}
</style>
