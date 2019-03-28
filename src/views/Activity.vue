<template>
	<div class="activity-container">
		<div class="activity-header-navigation">
			<div>Select a timeframe</div>
			<a class="year-selector active">This year</a>
			<a class="year-selector">Last year</a>
			<a class="year-selector">Custom</a>
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
				<button class="btn-network btn-out-network">Out-of-network Transactions</button>
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
		<div id="in-network-table">
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
							<th></th>
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
							<td class="chevron-container">
								<a><img class="chevron-right" :src="'../assets/img/002-arrow.png'"></a>
							</td>
						</tr>
						<tr class="in-network-subtr">
							<td colspan="7" class="in-network-subtr-wrapper">
								<div class="in-network-details">
									<div class="in-network-subtr-col-1">
										<div class="member-image-container">
											<img src="https://res.cloudinary.com/dzh9uhsqr/image/upload/v1549795986/up0ebkyrragfte9bany7.jpg">
											<label>Stackgecko GP</label>
										</div>
										<div class="service-box">
											<img :src="'../assets/img/coverage/General-Practitioner.png'">
											<label>General Practitioner</label>
										</div>	
									</div>
									<div class="in-network-subtr-col-2">
										<div class="trans-row">
											<div class="label-wrapper">
												<label>Date</label>
											</div>
											<div class="desc-wrapper">
												<span>02 March 2019, 12:44am</span>
											</div>
										</div>
										<div class="trans-row">
											<div class="label-wrapper">
												<label>Transaction #</label>
											</div>
											<div class="desc-wrapper">
												<span>STA000846</span>
											</div>
										</div>
										<div class="trans-row">
											<div class="label-wrapper">
												<label>Item/Service</label>
											</div>
											<div class="desc-wrapper">
												<span>Genral Practitioner - Consultation and Sample Service</span>
											</div>
										</div>
										<div class="trans-row">
											<div class="label-wrapper">
												<label>Total Amount</label>
											</div>
											<div class="desc-wrapper">
												<span>S$ 0.01</span>
											</div>
										</div>
										<div class="trans-row">
											<div class="label-wrapper">
												<label>Payment Type</label>
											</div>
											<div class="desc-wrapper">
												<span>Mednefits Credits</span>
											</div>
										</div>
										<div class="trans-row">
											<div class="label-wrapper">
												<label>Member</label>
											</div>
											<div class="desc-wrapper">
												<span>Allan Cheam Alzula</span>
											</div>
										</div>
									</div>
									<div class="in-network-subtr-col-3">
										<button class="btn-in-network btn-upload-receipt">Upload Receipt</button>
										<button class="btn-in-network btn-download-receipt disabled">Download Receipt</button>
										<button class="btn-in-network btn-e-receipt">Mednefits E-Receipt</button>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div id="out-network-table">
			<div class="transaction-table-container">
				
			</div>
		</div>
	</div>
</template>

<script>
	import activity from '@/components/activity'
	export default activity
</script>
