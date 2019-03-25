<script>
	import axios from 'axios'
	import moment from 'moment'

	var eclaim = {
		data() {
			return {
				step_active : 1,
				eclaim_data : {
					spending_type : 'medical',
					hour : parseInt(moment().format('hh')),
					minute : parseInt(moment().format('mm')),
					daytime : 'AM',
				},
				uploadOptions : {
					headers : {},
					url : axios.defaults.serverUrl + "/employee/save/e_claim_receipt",
				},
				isNextBtnDisabled : false,
				claimTypesArr: [],
				claimMembers: [],
				uploading_files : [],
				uploading_files_ctr : 0,
				uploaded_files : [],
				file : {},
				formats: {
	        input: ['MMMM DD, YYYY'], 
	        data: ['MMMM DD, YYYY']
	      },
	      isTimeDayShow : false,
	      isTimeSelectorShow : false,
			}
		},
		created() {
			this.getClaimTypes();
			this.getClaimMembers();
		},
		methods: {
			isNumber: function(evt) {
	      evt = (evt) ? evt : window.event;
	      var charCode = (evt.which) ? evt.which : evt.keyCode;
	      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
	        evt.preventDefault();
	      } else {
	        return true;
	      }
	    },
			uploadReceipts( data ){
	    	// this.$parent.showLoading();
	    	data[0].uploading = 20;
	    	this.uploading_files.push( data[0] );
	    	let formData = new FormData();
	    	formData.append('file', data[0]);
	    	this.$refs.receiptUploader.value = null;
	    	this.isNextBtnDisabled = true;
				axios.post( 
					axios.defaults.serverUrl + "/employee/save/e_claim_receipt", 
					formData, 
					{ headers: { 'Content-Type': 'multipart/form-data' } })
					.then(res => {
						// console.log( res );
						if( res.data.receipt != null && res.data.status == true ){
							this.uploaded_files.push(res.data.receipt);
							this.uploading_files[this.uploading_files_ctr].uploading = 100;
							$('.uploads-box .upload-wrapper:nth-child(' + (this.uploading_files_ctr + 1) + ') .progress-bar').css('width', '100%');
						}else{
							this.uploading_files[this.uploading_files_ctr].uploading = 60;
							this.uploading_files[this.uploading_files_ctr].error = true;
							this.uploading_files[this.uploading_files_ctr].error_text = res.data.message;
							$('.uploads-box .upload-wrapper:nth-child(' + (this.uploading_files_ctr + 1) + ') .progress-bar').css('width', '60%');
						}
						this.isNextBtnDisabled = false;
						this.uploading_files_ctr+=1;
						this.$forceUpdate();
						// this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			getClaimTypes( ){
	    	this.$parent.showLoading();
				axios.get( axios.defaults.serverUrl + "/employee/get_health_partner_lists?type=" + this.eclaim_data.spending_type )
					.then(res => {
						// console.log( res );
						this.claimTypesArr = res.data;
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			getClaimMembers( ){
				axios.get( axios.defaults.serverUrl + "/employee/get_members/" + this.$parent.user_id )
					.then(res => {
						// console.log( res );
						this.claimMembers = res.data;
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			toggleTimeDayDrop( ){
				this.isTimeSelectorShow = false;
				if( this.isTimeDayShow == false ){
					this.isTimeDayShow = true;
				}else{
					this.isTimeDayShow = false;
				}
			},
			toggleTimePickerDrop( ){
				if( this.eclaim_data.visit_date ){
					this.isTimeDayShow = false;
					if( this.isTimeSelectorShow == false ){
						this.isTimeSelectorShow = true;
					}else{
						this.isTimeSelectorShow = false;
					}
				}else{
					this.isTimeSelectorShow = false;
				}
			},
			removeReceipt( index ){
				this.uploading_files.splice( index, 1 );
				this.uploaded_files.splice( index, 1 );
			},
			hideTimeDayDrop( ){
				this.isTimeDayShow = false;
			},
			hideTimeDrop( ){
				this.isTimeSelectorShow = false;
			},
			setEclaimSpendingType( opt ){
				this.eclaim_data.spending_type = opt;
			},
			selectDaytime( opt ){
				var temp = this.eclaim_data.daytime;
				this.eclaim_data.daytime = opt;
				if( !this.checkVisitTime( "" ) ){
					this.eclaim_data.daytime = temp;
					this.setVisitTime();
				}
			},
			addHour(){
				if( this.checkVisitTime( "hours" ) ){
					if( this.eclaim_data.hour < 12 ){
						this.eclaim_data.hour++;
					}else{
						this.eclaim_data.hour = 1;
					}	
					this.setVisitTime();
				}
			},
			deductHour(){
				if( this.checkVisitTime( "hours" ) ){
					if( this.eclaim_data.hour > 1 ){
						this.eclaim_data.hour--;
					}else{
						this.eclaim_data.hour = 12;
					}	
					this.setVisitTime();
				}
			},
			addMinute(){
				if( this.checkVisitTime( "minutes" ) ){
					if( this.eclaim_data.minute < 12 ){
						this.eclaim_data.minute++;
					}else{
						this.eclaim_data.minute = 1;
					}	
					this.setVisitTime();
				}
			},
			deductMinute(){
				if( this.checkVisitTime( "minutes" ) ){
					if( this.eclaim_data.minute > 1 ){
						this.eclaim_data.minute--;
					}else{
						this.eclaim_data.minute = 12;
					}	
					this.setVisitTime();
				}
			},
			visitTimeChanged( value ){
				if( value ){
					var temp_val = value.split(':');
					this.eclaim_data.hour = parseInt(temp_val[0]);
					if( temp_val[1] ){
						this.eclaim_data.minute = parseInt(temp_val[1]);
					}else{
						this.eclaim_data.minute = 0;
					}
					this.setVisitTime();
				}
			},
			setVisitTime() {
				var hour = "" + (( this.eclaim_data.hour < 10 ) ? 0 : "") + this.eclaim_data.hour + ":" + (( this.eclaim_data.minute < 10 ) ? 0 : "") + this.eclaim_data.minute;
				this.eclaim_data.visit_time = hour;
			},
			checkVisitTime( type ) {
				var visit_date = moment( this.eclaim_data.visit_date ).format( 'MM/DD/YYYY' );
				var selected_time = moment( visit_date + " " + this.eclaim_data.hour + ":" + this.eclaim_data.minute + " " + this.eclaim_data.daytime, 'MM/DD/YYYY hh:mm A' ).format( 'MM/DD/YYYY hh:mm A' );
				var curr_time = type == "" ? moment().format( 'MM/DD/YYYY hh:mm A' ) : moment().subtract( 1, type ).format( 'MM/DD/YYYY hh:mm A' );
				if( moment( selected_time ).isSameOrBefore( moment( curr_time ) ) ){
					return true;
				}else{
					this.$parent.swal( 'Error!', 'Selected visit time exceeds.', 'error' );
					return false;
				}
			},
			checkEclaimDetails( data ){
				if( !data.claim_type ){
					this.$parent.swal( 'Error!', 'Claim Type is required.', 'error' );
					return false;
				}
				if( !data.provider ){
					this.$parent.swal( 'Error!', 'Provider is required.', 'error' );
					return false;
				}
				if( !data.visit_date ){
					this.$parent.swal( 'Error!', 'Visit date is required.', 'error' );
					return false;
				}
				if( !data.visit_time ){
					this.$parent.swal( 'Error!', 'Visit time is required.', 'error' );
					return false;
				}
				if( !data.amount ){
					this.$parent.swal( 'Error!', 'Claim amount is required.', 'error' );
					return false;
				}
				if( !data.member ){
					this.$parent.swal( 'Error!', 'Member is required.', 'error' );
					return false;
				}
 
				return true;
			},
			nextBtnEclaim(){
				if( this.step_active == 1 ){
					if( this.checkEclaimDetails( this.eclaim_data ) == true ){
						this.eclaim_data.visit_date = moment().format('MMMM DD, YYYY');
						this.step_active = 2;
					}
				}else if( this.step_active == 2 ){
					this.step_active = 3;
				}else if( this.step_active == 3 ){
					this.step_active = 4;
				}
			},
			backBtnEclaim(){
				if( this.step_active == 2 ){
					this.step_active = 1;
				}else if( this.step_active == 3 ){
					this.step_active = 2;
				}else if( this.step_active == 4 ){
					this.step_active = 3;
				}
			},
			submitEclaim(){
				var data = {
					user_id: this.eclaim_data.member.user_id,
					service: this.eclaim_data.claim_type,
					merchant: this.eclaim_data.provider,
					amount: this.eclaim_data.amount,
					date: moment(this.eclaim_data.visit_date).format('YYYY-MM-DD'),
					time: this.eclaim_data.visit_time + '' + this.eclaim_data.daytime,
					receipts: this.uploaded_files,
					emp_id: this.$parent.user_id,
				}
				console.log( data );
				this.$parent.showLoading();
				if( this.eclaim_data.spending_type == 'medical' ){
					axios.post( axios.defaults.serverUrl + "/employee/create/e_claim", data)
						.then(res => {
							console.log( res );
							this.$parent.hideLoading();
							if( res.data.status ){
								this.$parent.swal( 'Success!', res.data.message, 'success' );
								this.nextBtnEclaim();
							}else{
								this.$parent.swal( 'Error!', res.data.message, 'error' );
							}
						})
						.catch(err => {
							console.log( err );
							this.$parent.hideLoading();
						});
				}else{
					axios.post( axios.defaults.serverUrl + "/employee/create/e_claim_wellness", data)
						.then(res => {
							console.log( res );
							this.$parent.hideLoading();
							if( res.data.status ){
								this.$parent.swal( 'Success!', res.data.message, 'success' );
								this.nextBtnEclaim();
							}else{
								this.$parent.swal( 'Error!', res.data.message, 'error' );
							}
						})
						.catch(err => {
							console.log( err );
							this.$parent.hideLoading();
						});
				}
				
			}
    }
	}

	export default eclaim
</script>