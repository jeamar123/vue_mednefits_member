<template>
	<div class="eclaim-container">
		
		<div class="eclaim-header">
			<p class="submit-out-claim-text">Submit an Out-of-Network Claim</p>
			<p class="sub-out-claim-text">If you went to an out-of-network service that are covered by your company, you may submit a clam here and get reimbursed.</p>
		</div>

		<div class="eclaim-body-container">
			<div class="eclaim-form-wrapper">
				<div v-if="step_active == 1">
					<div class="form-div">
						<label>
							Spending Account<span>*</span>
						</label>	
						<div class="eclaim-input-wrapper">
							<button class="btn btn-medical" style="margin-right: 5px;" v-bind:class="{ active: eclaim_data.spending_type == 'medical' }" v-on:click="setEclaimSpendingType('medical')">Medical</button>
							<button class="btn btn-wellness" v-bind:class="{ active: eclaim_data.spending_type == 'wellness' }" v-on:click="setEclaimSpendingType('wellness')">Wellness</button>
						</div>
					</div>
					<div class="form-div">
			  		<label>
			  			Claim Type<span>*</span>
			  		</label>
			  		<div class="eclaim-input-wrapper">
			  			<select v-model="eclaim_data.claim_type">
				  			<option></option>
				  			<option v-for="list in claimTypesArr">{{ list.name }}</option>
				  		</select>
			  		</div>
			  	</div>
			  	<div class="form-div">
			  		<label>
			  			Provider<span>*</span>
			  		</label>
			  		<div class="eclaim-input-wrapper">
			  			<input type="text" placeholder="Mednefits Pte Ltd" v-model="eclaim_data.provider">
			  		</div>
			  	</div>
			  	<div class="form-div">
			  		<label>
			  			Visit Date<span>*</span>
			  		</label>
			  		<div class="eclaim-input-wrapper with-right-icon">
			  			<v-date-picker 
	        			mode='single' 
	        			popoverDirection="top" 
	        			:formats="formats"
	        			:max-date='new Date()'
	        			v-model='eclaim_data.visit_date' 
	        			:input-props='{ class: "", placeholder: "", readonly: false }'
	        		>
						  </v-date-picker>
			  			<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Date.png'" class="icon-right">
			  		</div>
			  	</div>
			  	<div class="form-div">
			  		<label>
			  			Visit Time<span>*</span>
			  		</label>
			  		<div class="eclaim-input-wrapper with-left-icon visit-time-input" v-click-outside="hideTimeDrop" v-bind:class="{ disableClick: !eclaim_data.visit_date }">
			  			<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Time.png'" class="icon-left">
			  			<input type="text" v-model="eclaim_data.visit_time" :disabled="!eclaim_data.visit_date" v-on:blur="visitTimeChanged( eclaim_data.visit_time )">
			  			<div class="visit-time-opt-wrapper">
			  				<div class="drop-time-btn" v-on:click="isTimeSelectorShow = true">
			  					<span class="oi" data-glyph="caret-bottom" aria-hidden="true"></span>
			  				</div>
			  				<div class="drop-day-btn" v-on:click="toggleTimeDayDrop()" v-click-outside="hideTimeDayDrop">
			  					<span class="day-value">{{ eclaim_data.daytime }}</span>
			  					<span class="oi" data-glyph="caret-bottom" aria-hidden="true"></span>

			  					<div v-if="isTimeDayShow" class="drop-day-wrapper">
			  						<div class="day" v-on:click="selectDaytime('AM')">AM</div>
			  						<div class="day" v-on:click="selectDaytime('PM')">PM</div>
			  					</div>
			  				</div>
			  			</div>

			  			<div v-if="isTimeSelectorShow" class="visit-time-wrapper">
			  				<div class="visit-time-selection">
				  				<div class="hour-wrapper">
				  					<div class="arrow" v-on:click="addHour()">
				  						<span class="oi" data-glyph="chevron-top" aria-hidden="true"></span>
				  					</div>
				  					<div class="hour-time">
				  						{{ eclaim_data.hour < 10 ? '0' : '' }}<span>{{ eclaim_data.hour }}</span>
				  					</div>
				  					<div class="arrow" v-on:click="deductHour()">
				  						<span class="oi" data-glyph="chevron-bottom" aria-hidden="true"></span>
				  					</div>
				  				</div>
				  				<div class="time-middle">
				  					<span>:</span>
				  				</div>
				  				<div class="minute-wrapper">
				  					<div class="arrow" v-on:click="addMinute()">
				  						<span class="oi" data-glyph="chevron-top" aria-hidden="true"></span>
				  					</div>
				  					<div class="minute-time">
				  						{{ eclaim_data.minute < 10 ? '0' : '' }}<span>{{ eclaim_data.minute }}</span>
				  					</div>
				  					<div class="arrow" v-on:click="deductMinute()">
				  						<span class="oi" data-glyph="chevron-bottom" aria-hidden="true"></span>
				  					</div>
				  				</div>
			  				</div>
			  			</div>
			  		</div>
			  	</div>
			  	<div class="form-div">
			  		<label>
			  			Claim Amount<span>*</span>
			  		</label>
			  		<div class="eclaim-input-wrapper with-right-icon">
			  			<input type="text" placeholder="Price" v-model="eclaim_data.amount">
			  			<span class="icon-right dollar-sign">S$</span>
			  		</div>
			  	</div>
			  	<div class="form-div">
			  		<label>
			  			Member<span>*</span>
			  		</label>
			  		<div class="eclaim-input-wrapper">
			  			<select v-model="eclaim_data.member">
				  			<option></option>
				  			<option v-bind:value="list" v-for="list in claimMembers">{{ list.name }}</option>
				  		</select>
			  		</div>
			  	</div>

			  	<div class="form-div justify-content-end">
			  		<button class="btn btn-next" v-on:click="nextBtnEclaim()">Next</button>
			  	</div>
		  	</div>
		  	<div v-if="step_active == 2">

          <div class="drop-box">
          	<input ref="receiptUploader" type="file" v-on:change="uploadReceipts($event.target.files);">
            <img :src="'../assets/img/Upload-Receipt.png'" style="width: 45px;">
            <h5 class="drop-file-text">Drop your file here!</h5>
            <p class="or-text">or</p>
            <p class="select-file-text">Select a file</p>
          </div>

		  		<p class="uploaded-text">Uploaded</p>
					<div class="uploads-box">
						<div class="upload-wrapper" v-for="(img,index) in uploading_files">
							<div class="img-wrapper">
								<img v-if="img.type == 'image/png' || img.type == 'image/jpeg'" :src="'../assets/img/file-types/Receipt-png.png'" style="width: 30px;">
								<img v-if="img.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" :src="'../assets/img/file-types/Receipt-doc-xls.png'" style="width: 30px;">
								<img v-if="img.type == 'application/pdf'" :src="'../assets/img/file-types/Receipt-pdf.png'" style="width: 30px;">
								<img v-if="img.type != 'image/png' && img.type != 'image/jpeg' && img.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && img.type != 'application/pdf'" :src="'../assets/img/file-types/Receipt-png.png'" style="width: 30px;">
							</div>
							<div class="upload-details">
								<h5>
									<label>
										<span>{{ !img.name ? '' : img.name.length < 13 ? img.name : img.name.substring(0,13) + "..."}}</span>
									</label> 
									<span class="file-size"><span>{{ img.size / 1000 }}</span>mb</span> 
									<a href="javascript:void(0)" class="close-upload" v-on:click="removeReceipt(index)">
										<span class="oi" data-glyph="x" aria-hidden="true"></span>
									</a>
								</h5>
								<div class="progress-wrapper">
									<!-- <div class="progress-bar" v-bind:class="{'progress-error' : img.error == true}" style="width: {{img.uploading}}%"></div> -->
									<div class="progress-bar" v-bind:class="{'progress-error' : img.error == true}" style="width: 0%;"></div>
								</div>
								<p v-if="img.uploading < 100 && !img.error" class="upload-status">Uploading...</p>
								<p v-if="img.uploading == 100 && !img.error" class="upload-status text-success">Completed</p>
								<p v-if="img.error == true" class="upload-status text-error">{{ img.error_text }}</p>
							</div>
						</div>
					</div>
					<div class="form-div justify-content-end">
			  		<button class="btn btn-next" v-on:click="backBtnEclaim()">Back</button>
			  		<button class="btn btn-next" v-on:click="nextBtnEclaim()" :disabled="isNextBtnDisabled || uploaded_files.length == 0">Next</button>
			  	</div>
		  	</div>
		  	<div v-if="step_active == 3">
		  		<div class="eclaim-summary-container">
		  			<div class="summary">
		  				<div class="label">
		  					<p>Spending Account<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>{{ eclaim_data.spending_type }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Claim Type<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>{{ eclaim_data.claim_type }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Provider<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>{{ eclaim_data.provider }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Visit Date<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>{{ eclaim_data.visit_date }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Visit Time<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>{{ eclaim_data.visit_time }}{{ eclaim_data.daytime }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Claim Amount<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>S${{ eclaim_data.amount }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Member<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<p>{{ eclaim_data.member.name }}</p>
		  				</div>
		  			</div>
		  			<div class="summary">
		  				<div class="label">
		  					<p>Receipt<span>*</span></p>
		  				</div>
		  				<div class="value">
		  					<div class="receipt-imgs">
						    	<div v-for="img in uploaded_files" class="receipt">
						    		<!-- <img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Date.png'"> -->
						    		<img v-if="img.receipt_type == 'image'" :src="img.receipt_file" style="">
						    		<img v-if="img.receipt_type == 'pdf'" :src="'../assets/e-claim/img/new-assets/Receipt-pdf.png'" style="">
						    		<img v-if="img.receipt_type == 'xls'" :src="'../assets/e-claim/img/new-assets/Receipt-doc-xls.png'" style="">
						    	</div>
						    </div>
		  				</div>
		  			</div>

		  			<div class="form-div justify-content-end">
				  		<!-- <button class="btn btn-next">Back</button> -->
				  		<button class="btn btn-next" v-on:click="submitEclaim()">Submit</button>
				  	</div>
		  		</div>
		  	</div>
		  	<div v-if="step_active == 4">
		  		<div class="eclaim-success-wrapper">
						<img :src="'../assets/img/Thank-you.png'" style="width: 80px;">
						<h5>Thank you!</h5>
						<p>Your claim has been successfully submitted.<br>Our team will be processing your claim,<br>for claim status updates go to Activity.</p>
					</div>
					<div class="form-div justify-content-end">
		  			<router-link tag="button" class="btn btn-next" to="/app/dashboard">Home</router-link>
			  	</div>
		  	</div>
			</div>
			<div class="eclaim-steps-wrapper">
				<div id="eclaim-steps">
					<div class="step-wrapper" v-bind:class="{'active' : step_active >= 1}">
						<div class="circle-wrapper">
							<div class="circle">
								<img :src="'../assets/img/eclaim-steps/01-Enter-Claim-Details.png'">
							</div>
						</div>

						<div class="step-details">
							<h5 ng-class="{'color-black2':step_active == 1}"><span class="step-num">01</span> Enter Claim Details</h5>
							<p>Tell us more about your claim. Do make sure the Item/Service is part of your company approved parameter.</p>
						</div>
					</div>

					<div class="step-wrapper one" v-bind:class="{'active' : step_active >= 2}">
						<div class="circle-wrapper">
							<div class="circle">
								<img v-if="step_active < 2" :src="'../assets/img/eclaim-steps/02-Receipt-Verification-(Grey).png'" style="width: 40px;">
								<img v-if="step_active >= 2" :src="'../assets/img/eclaim-steps/02-Receipt-Verification-(Blue).png'" style="width: 40px;">
							</div>
						</div>

						<div class="step-details">
							<h5><span class="step-num">02</span> Receipt Verification</h5>
							<p>Snap a photo of your physical receipt given by the merchant for claim reimbursement.</p>
						</div>
					</div>

					<div class="step-wrapper two" v-bind:class="{'active':step_active >= 3}">
						<div class="circle-wrapper">
							<div class="circle">
								<img v-if="step_active < 3" :src="'../assets/img/eclaim-steps/03-Claim-Submitted-(Grey).png'" style="width: 40px;">
								<img v-if="step_active >= 3" :src="'../assets/img/eclaim-steps/03-Claim-Submitted-(Blue).png'" style="width: 40px;">
							</div>
						</div>

						<div class="step-details">
							<h5><span class="step-num">03</span> Claim Submitted</h5>
							<p>Track your claim status under Activity.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import eclaim from '@/components/eclaim'
	export default eclaim
</script>
