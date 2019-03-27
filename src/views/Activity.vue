<template>
	<div class="activity-container">
		<div class="activity-header-navigation">
			<div>Select a timeframe</div>
			<div class="year-selector">This year</div>
			<div class="year-selector">Last year</div>
			<div class="year-selector">Custom</div>
		</div>

		<div class="activity-slider-container">
			<vue-slider class="range-slider" v-model="range_values" :marks="range_marks" :enableCross="false" :min="1" :max="12" :tooltip="'none'"></vue-slider>
		</div>

		<div class="benefit-dollars-container">
			<div class="spending-account-wrapper">
				<h5>Spending Account</h5>
				<div class="spending-type-container">
					<button class="btn-spending btn-medical active">Medical</button>
					<button class="btn-spending btn-wellness">Wellness</button>
				</div>
			</div>
			<div class="spending-account-details-container">
				<div class="spending-details-col-1">
					<div class="amount-text-wrapper">
						<h4>
							S$ <span>4200.00</span>
						</h4>
						<div>Total Allocation</div>
					</div>
					<div class="amount-text-wrapper">
						<h4>
							S$ <span>4649.43</span>
						</h4>
						<div>Balance</div>
					</div>	
				</div>
				<div class="spending-details-col-2">
					<div class="amount-text-wrapper">
						<h4>
							S$ <span>1550.57</span>
						</h4>
						<div>Spent</div>
					</div>
				</div>
				<div class="spending-details-col-3">
					<h5>Spending Breakdown</h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import activity from '@/components/activity'
	export default activity
</script>
