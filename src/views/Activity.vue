<template>
	<div class="activity-container">
		<div class="activity-header-navigation">
			<div>Select a timeframe</div>
			<a class="year-selector active">This year</a>
			<a class="year-selector">Last year</a>
			<a class="year-selector">Custom</a>
		</div>

		<div class="activity-slider-container">
			<vue-slider class="range-slider" v-model="range_values" :marks="range_marks" :enableCross="true" :min="1" :max="12" :tooltip="'none'" @drag-start="() => inDragging = true" @drag-end="() => inDragging = false" :dragEnd="sliderDragged( range_values )"></vue-slider>
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
					<div class="progress-wrapper">
						<div class="progress-bar"></div>
					</div>
					<div class="in-out-network-container">
						<div class="in-network-box">
							<h5>
								S$ <span>00.00</span>
							</h5>
							<div>In-network</div>
						</div>
						<div class="out-network-box">
							<h5>
								S$ <span>00.00</span>
							</h5>
							<div>Out-of-network</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="transactions-wrapper">
			<div class="total-transactions-container">Total Transactions</div>
			<div class="in-out-btn-container">
				<button class="btn-network btn-in-network active">In-network Transactions</button>
				<button class="btn-network btn-out-network">Out-network Transactions</button>
			</div>
			<div class="spent-download-container">
				<div class="download-container">
					<span>Download</span>
					<img :src="'../assets/img/coverage/Download.png'">
				</div>
				<div class="total-spent-container">
					Total Spent <span>S$</span>
				</div>
			</div>
		</div>
		<div class="transaction-table-container">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Item/Service</th>
						<th>Provider</th>
						<th>Total Amount</th>
						<th>Payment Type</th>
						<th>Member</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<span>25 March 2019, 01:20pm</span>
						</td>
						<td>
							<span>General Practitioner - Consultation</span>
						</td>
						<td>
							<span>Stackgecko GP</span>
						</td>
						<td>
							<span>S$ 0.05</span>
						</td>
						<td>
							<span>Mednefits Credits</span>
						</td>
						<td>
							<span>Allan Cheam Alzula</span>
						</td>
						<td>
							<a><i class="fa fa-angle-down"></i></a>
						</td>
					</tr>
					<tr>
						<td>
							<div></div>
							<div></div>
							<div></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import activity from '@/components/activity'
	export default activity
</script>
