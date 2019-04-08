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
					    :before-generate = "onDownloadCSVStart"
					    :before-finish = "onDownloadCSVDone"
					    type		= "csv"
					    name    = "In-Network-Transactions.csv">
					    Download
					</download-excel>
					<download-excel
					    v-if    ="transaction_type == 2"
					    class   = "dl-csv"
					    :data   = "out_transactions"
					    :fields = "out_csv_fields"
					    :before-generate = "onDownloadCSVStart"
					    :before-finish = "onDownloadCSVDone"
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
							<th v-if="activity_results.lite_plan && activity_results.wallet_status">MEDICINE & TREATMENT</th>
							<th v-if="activity_results.lite_plan && activity_results.wallet_status">CONSULTATION</th>
							<th>Payment Type</th>
							<th>Member</th>
							<th></th>
						</tr>
					</thead>
					<tbody v-for="list in in_transactions">
						<tr v-on:click="toggleTransactionDrop( list )">
							<td>
								<span>{{ list.date_of_transaction }}</span>
							</td>
							<td>
								<span>{{ list.clinic_type_and_service }}</span>
							</td>
							<td>
								<span>{{ list.clinic_name }}</span>
							</td>
							<td>
								<span>S$ {{ list.amount }}</span>
							</td>
							<td v-if="activity_results.lite_plan && activity_results.wallet_status">
								S$ <span>{{ list.procedure_cost }}</span>
							</td>
							<td v-if="activity_results.lite_plan && activity_results.wallet_status">
								S$ <span>{{ list.consultation }}</span>
							</td>
							<td>
								<span>{{ list.payment_type }}</span>
							</td>
							<td>
								<span>{{ list.member }}</span>
							</td>
							<td class="chevron-container">
								<a><img class="chevron-right" :src="'../assets/img/002-arrow.png'"></a>
							</td>
						</tr>
						<!-- <transition name="fade"> -->
							<tr v-if="list.showDrop == true" class="in-network-subtr">
								<td v-bind:colspan="activity_results.lite_plan && activity_results.wallet_status ? 9 : 7" class="in-network-subtr-wrapper">
									<div class="in-network-details">
										<div class="in-network-subtr-col-1">
											<div class="member-image-container">
												<img :src="list.clinic_image">
												<label>{{ list.clinic_name }}</label>
											</div>
											<div class="service-box">
												<img :src="list.clinic_type_image">
												<label v-if="list.clinic_type == 'general_practitioner'">General Practitioner</label>
												<label v-if="list.clinic_type == 'dental_care'">Dental Care</label>
												<label v-if="list.clinic_type == 'tcm'">Traditional Chinese Medicine</label>
												<label v-if="list.clinic_type == 'health_screening'">Health Screening</label>
												<label v-if="list.clinic_type == 'wellness'">Wellness</label>
												<label v-if="list.clinic_type == 'health_specialist'">Health Specialist</label>
											</div>	
										</div>
										<div class="in-network-subtr-col-2">
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Date</label>
												</div>
												<div class="desc-wrapper">
													<span>{{ list.date_of_transaction }}</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Transaction #</label>
												</div>
												<div class="desc-wrapper">
													<span>{{ list.transaction_id }}</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Item/Service</label>
												</div>
												<div class="desc-wrapper">
													<span>{{ list.clinic_type_and_service }}</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Total Amount</label>
													<div v-if="list.lite_plan && activity_results.wallet_status" class="procedure-indicator" v-bind:class="list.service_credits && list.transaction_type == 'credits' ? 'blue' : 'green'">
														<span v-if="!list.service_credits && list.transaction_type == 'cash' || list.service_credits && list.transaction_type == 'cash'">Cash</span>
														<span v-if="list.service_credits && list.transaction_type == 'credits'">Credits</span>
													</div>
													<div v-if="list.lite_plan && activity_results.wallet_status" class="separator"></div>
													<div v-if="list.lite_plan && ( list.consultation_credits || list.service_credits ) && activity_results.wallet_status" class="consultation-indicator blue" >
														<span v-if="list.consultation_credits || list.service_credits">Credits</span>
														<span v-if="!list.consultation_credits && !list.service_credits">Cash</span>
													</div>
												</div>
												<div class="desc-wrapper">
													<span>S$ {{ list.amount }}</span>
													<span v-if="list.lite_plan && activity_results.wallet_status" class="lite-plan-box">{{ list.procedure }}</span>
													<span v-if="list.lite_plan && activity_results.wallet_status">S$ {{ list.procedure_cost }}</span>
													<span v-if="list.lite_plan && activity_results.wallet_status" class="lite-plan-box2">Consultation</span>
													<span v-if="list.lite_plan && activity_results.wallet_status">S$ {{ list.consultation }}</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Payment Type</label>
												</div>
												<div class="desc-wrapper">
													<span>{{ list.payment_type }}</span>
												</div>
											</div>
											<div class="trans-row">
												<div class="label-wrapper">
													<label>Member</label>
												</div>
												<div class="desc-wrapper">
													<span>{{ list.member }}</span>
												</div>
											</div>
										</div>
										<div class="in-network-subtr-col-3">
											<button class="btn-in-network btn-upload-receipt">Upload Receipt
												<input type="file" v-on:change="uploadInNetworkReceipt( list, $event.target.files )">
												<!-- <span v-if="list.uploading"><i class="fa fa-circle-o-notch fa-spin"></i></span> -->
											</button>
											<button :disabled="!list.transaction_files || list.transaction_files.length == 0" class="btn-in-network btn-download-receipt" v-on:click="downloadReceipt(list.transaction_files)">Download Receipt</button>

											<p v-if="list.upload_err" class="text-error">{{ list.upload_err_message }}</p>
											<div class="trans-receipts-wrapper">
												<div class="click_box_wrapper" v-on:click="showPreview(img)" v-for="img in list.transaction_files">
													<a href="javascript:void(0)">
														<div class="click_box">
															<span class="oi" data-glyph="plus"aria-hidden="true"></span>
														</div>
														<img v-if="img.type == 'image' || img.file_type == 'image'" :src="img.file" >
														<img v-if="img.type == 'excel' || img.file_type == 'excel'" :src="'../assets/e-claim/img/new-assets/Receipt-doc-xls.png'" >
														<img v-if="img.type == 'pdf' || img.file_type == 'pdf'" :src="'../assets/e-claim/img/new-assets/Receipt-pdf.png'">
													</a>
												</div>
											</div>

											<button v-if="list.payment_type == 'Mednefits Credits'" class="btn-in-network btn-e-receipt" v-on:click="downloadMednefitsReceipt(list.trans_id)">Mednefits E-Receipt</button>
										</div>
									</div>
								</td>
							</tr>
						<!-- </transition> -->
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
					<tbody v-for="list in out_transactions">
						<tr v-on:click="toggleTransactionDrop( list )">
							<td class="status-box-container">
								<label v-if="list.status == 0" class="status-box pending" >Pending</label>
								<label v-if="list.status == 1" class="status-box approved" >Approved</label>
								<label v-if="list.status == 2" class="status-box rejected" >Rejected</label>
							</td>
							<td>
								<span>{{ list.claim_date }}</span>
							</td>
							<td>
								<span>{{ list.service }}</span>
							</td>
							<td>
								<span>{{ list.merchant }}</span>
							</td>
							<td>
								<span>S$ {{ list.amount }}</span>
							</td>
							<td>
								<span>{{ list.member }}</span>
							</td>
							<td class="chevron-container">
								<a><img class="chevron-right" :src="'../assets/img/002-arrow.png'"></a>
							</td>
						</tr>
						<tr v-if="list.showDrop == true" class="out-network-subtr">
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

		<div class="preview-box">
			<div class="img-container">
				<a href="javascript:void(0)" id="hidePreview" v-on:click="hidePreview()">
					<span class="oi" data-glyph="x"aria-hidden="true"></span>
				</a>

				<img hidden>

				<iframe id="src-view-data" src hidden>
				</iframe>
			</div>
		</div>
	</div>
</template>

<script>
	import activity from '@/components/activity'
	export default activity
</script>