<template>
	<div class="activity-container">
		Activity Page
		<vue-slider 
		  class="range-slider"
			v-model="range_values" 
      :marks="range_marks"
      :enableCross="false"
      :min="1"
      :max="12"
      :tooltip="'none'"
     >
      
    </vue-slider>
	</div>
</template>

<script>
	import activity from '@/components/activity'
	export default activity
</script>
