<template>
	<div class="activity-container">
		<div class="activity-header-navigation">
			<div>Select a timeframe</div>
			<!-- <a class="year-selector" v-bind:class="{'active' : date_selector_type == 1}" v-on:click="setDateSelector(1)">This year</a>
			<a class="year-selector" v-bind:class="{'active' : date_selector_type == 2}" v-on:click="setDateSelector(2)">Last year</a>
			<a class="year-selector" v-bind:class="{'active' : date_selector_type == 3}" v-on:click="setDateSelector(3)">Custom</a> -->
		</div>

		<!-- <div class="activity-slider-container">
			<vue-slider class="range-slider" v-model="range_values" :marks="range_marks" :enableCross="true" :min="1" :max="12" :tooltip="'none'" @drag-start="() => inDragging = true" @drag-end="() => inDragging = false" :dragEnd="sliderDragged( range_values )"></vue-slider>
		</div> -->
		<div class="date-picker-container">
			<div class="btn-picker">
				<v-date-picker 
    			mode='single' 
    			popoverDirection="bottom" 
    			popoverVisibility="hover"
    			:formats="formats"
    			v-model='start_date' 
    			:input-props='{ class: "", placeholder: "", readonly: true }'
    		>
			  </v-date-picker>
			  <img :src="'../assets/img/calendar.png'">
			  <span class="oi caret" data-glyph="caret-bottom" aria-hidden="true"></span>
			</div>
			<div class="date-arrow">
				<img :src="'../assets/img/right-arrow.png'">
			</div>
			<div class="btn-picker">
				<v-date-picker 
    			mode='single' 
    			popoverDirection="bottom" 
    			popoverVisibility="hover"
    			:formats="formats"
    			v-model='end_date' 
    			:input-props='{ class: "", placeholder: "", readonly: true }'
    		>
			  </v-date-picker>
			  <img :src="'../assets/img/calendar.png'">
			  <span class="oi caret" data-glyph="caret-bottom" aria-hidden="true"></span>
			</div>
			<div class="date-apply-btn">
				<button class="btn btn-apply" v-on:click="getActivityData()">Apply</button>
			</div>
		</div>

		<div class="benefit-dollars-container">
			<div class="spending-account-wrapper">
				<h5>Spending Account</h5>
				<div class="spending-type-container">
					<button class="btn-spending btn-medical" v-bind:class="{'active' : spending_type_selected == 'medical'}" v-on:click="changeSpendingType('medical')">Medical</button>
					<button class="btn-spending btn-wellness" v-bind:class="{'active' : spending_type_selected == 'wellness'}" v-on:click="changeSpendingType('wellness')">Wellness</button>
				</div>
			</div>
			<div class="spending-account-details-container">
				<div class="spending-details-col-1">
					<div class="amount-text-wrapper">
						<h4>
							S$ <span>{{ (activity_results.total_allocation) ? activity_results.total_allocation : '0.00' }}</span>
						</h4>
						<div>Total Allocation</div>
					</div>
					<div class="amount-text-wrapper">
						<h4>
							S$ <span>{{ (activity_results.balance) ? activity_results.balance : '0.00' }}</span>
						</h4>
						<div>Balance</div>
					</div>	
				</div>
				<div class="spending-details-col-2">
					<div class="amount-text-wrapper">
						<h4>
							S$ <span>{{ (activity_results.total_spent) ? activity_results.total_spent : '0.00' }}</span>
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
								S$ <span>{{ (activity_results.in_network_spent) ? activity_results.in_network_spent : '0.00' }}</span>
							</h5>
							<div>In-network</div>
						</div>
						<div class="out-network-box">
							<h5>
								S$ <span>{{ (activity_results.e_claim_spent) ? activity_results.e_claim_spent : '0.00' }}</span>
							</h5>
							<div>Out-of-network</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="transactions-wrapper">
			<div class="total-transactions-container">{{ activity_results.total_in_network_transactions }} Total Transactions</div>
			<div class="in-out-btn-container">
				<button class="btn-network btn-in-network" v-bind:class="{'active' : transaction_type == 1}" v-on:click="selectTransactionType(1)">In-network Transactions</button>
				<button class="btn-network btn-out-network" v-bind:class="{'active' : transaction_type == 2}" v-on:click="selectTransactionType(2)">Out-of-network Transactions</button>
			</div>
			<div class="spent-download-container">
				<div class="download-container">
					<download-excel
							v-if    ="transaction_type == 1"
					    class   = "dl-csv"
					    :data   = "in_transactions"
					    :fields = "in_csv_fields"
					    type		= "csv"
					    name    = "In-Network-Transactions.csv">
					    Download
					</download-excel>
					<download-excel
					    v-if    ="transaction_type == 2"
					    class   = "dl-csv"
					    :data   = "out_transactions"
					    :fields = "out_csv_fields"
					    type		= "csv"
					    name    = "E-Claim-Transactions.csv">
					    Download
					</download-excel>
					<img :src="'../assets/img/coverage/Download.png'">
				</div>
				<div class="total-spent-container">
					Total Spent <span>S$ {{ activity_results.total_in_network_spent }}</span>
				</div>
			</div>
		</div>
		<div id="in-network-table" v-if="transaction_type == 1">
			<div class="in-network transaction-table-container">
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
		<div id="out-network-table" v-if="transaction_type == 2">
			<div class="out-network transaction-table-container">
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Claim Date</th>
							<th>Item/Service</th>
							<th>Provider</th>
							<th>Total Amount</th>
							<th>Member</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="status-box-container">
								<label class="status-box pending">Pending</label>
							</td>
							<td>
								<span>05 March 2019 12:44 AM</span>
							</td>
							<td>
								<span>Health Screening</span>
							</td>
							<td>
								<span>Mednefits</span>
							</td>
							<td>
								<span>S$ 1.00</span>
							</td>
							<td>
								<span>Allan Cheam Alzula</span>
							</td>
							<td class="chevron-container">
								<a><img class="chevron-right" :src="'../assets/img/002-arrow.png'"></a>
							</td>
						</tr>
						<tr class="out-network-subtr">
							<td colspan="7" class="out-network-subtr-wrapper">
								<div class="out-network-details">
									<div class="out-network-subtr-col-1">
										<div class="status-box-left">
											<span class="status-box-title">Pending</span>
											<div class="status-box-date">
												Claim Date: <span>05 March 2019 12:44 AM</span>
											</div>	
										</div>
									</div>
									<div class="out-network-subtr-col-2">
										<div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Claim Date</label>
												</div>
												<div class="desc-wrapper">
													<span>05 March 2019 12:44 AM</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Visit Date</label>
												</div>
												<div class="desc-wrapper">
													<span>05 March 2019 12:40 AM</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Transaction #</label>
												</div>
												<div class="desc-wrapper">
													<span>MNF000292</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Claim Type</label>
												</div>
												<div class="desc-wrapper">
													<span>Health Screening</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Provider</label>
												</div>
												<div class="desc-wrapper">
													<span>Mednefits</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Total Amount</label>
												</div>
												<div class="desc-wrapper">
													<span>S$ 1.00</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Spending Account</label>
												</div>
												<div class="desc-wrapper">
													<span>Medical</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Type</label>
												</div>
												<div class="desc-wrapper">
													<span>E-Claim</span>
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
									</div>
									<div class="out-network-subtr-col-3">
										<div>
											<button class="btn-in-network btn-upload-receipt disabled">Upload Receipt</button>
											<button class="btn-in-network btn-download-receipt">Download Receipt</button>
										</div>
										<div class="trans-receipts-wrapper">
											<div class="click-box-wrapper">
												<div class="click-box">
													<img :src="'https://res.cloudinary.com/dzh9uhsqr/image/upload/v1554040985/buba5pvuwatfwhpzbu1c.jpg'">
												</div>
											</div>
										</div>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import activity from '@/components/activity'
	export default activity
</script>