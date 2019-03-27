<template>
	<div class="activity-container">
		<div class="activity-header-navigation">
			<div>Select a timeframe</div>
			<div class="year-selector">This year</div>
			<div class="year-selector">Last year</div>
			<div class="year-selector">Custom</div>
		</div>
		
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
