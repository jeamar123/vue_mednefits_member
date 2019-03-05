<template>
	<div class="eclaim-container">
		
		<div class="eclaim-header">
			<p class="submit-out-claim-text">Submit an Out-of-Network Claim</p>
			<p class="sub-out-claim-text">If you went to an out-of-network service that are covered by your company, you may submit a clam here and get reimbursed.</p>
		</div>

		<div class="eclaim-body-container">
			<div class="eclaim-form-wrapper">
				<div class="form-div">
					<label>
						Claim Type<span>*</span>
					</label>	
					<div class="spending-buttons-container">
						<button class="btn btn-medical">Medical</button>
						<button class="btn btn-wellness">Wellness</button>
					</div>
				</div>
				<div class="form-div">
		  		<label>
		  			Claim Type<span>*</span>
		  		</label>
		  		<select>
		  			<option>1</option>
		  			<option>2</option>
		  			<option>3</option>
		  		</select>
		  	</div>
		  	<div class="form-div">
		  		<label>
		  			Provider<span>*</span>
		  		</label>
		  		<input type="text" placeholder="Mednefits Pte Ltd">
		  	</div>
		  	<div class="form-div">
		  		<label>
		  			Provider<span>*</span>
		  		</label>
		  		<input type="text" placeholder="Mednefits Pte Ltd">
		  	</div>
		  	<div class="form-div">
		  		<label>
		  			Provider<span>*</span>
		  		</label>
		  		<input type="text" placeholder="Mednefits Pte Ltd">
		  	</div>
		  	<div class="form-div">
		  		<label>
		  			Provider<span>*</span>
		  		</label>
		  		<input type="text" placeholder="Mednefits Pte Ltd">
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
