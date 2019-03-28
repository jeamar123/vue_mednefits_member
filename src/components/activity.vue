<script>
	import axios from 'axios'
	import moment from 'moment'


	var activity = {
		data() {
			return {
				range_values : [ 1, moment( ).format('M') ],
				range_marks : { '1' : 'JAN', '2' : 'FEB', '3' : 'MAR', '4' : 'APR', '5' : 'MAY', '6' : 'JUN', '7' : 'JUL', '8' : 'AUG', '9' : 'SEP', '10' : 'OCT', '11' : 'NOV', '12' : 'DEC', },
				inDragging : false,
				user_details : {},
				activity_results : {},
				spending_type_selected : 'medical',
				current_year : moment( ).format('YYYY'),
				start_month : moment( ).startOf('month').format('MM'),
				end_month : moment( ).endOf('month').format('MM'),
				date_selector_type : 1,
			}
		},
		created() {
			this.getDetails();
			console.log( this.range_values );
		},
		methods: {
			getDetails( ){
	    	this.$parent.showLoading();
				axios.get( axios.defaults.serverUrl + "/employee/get/user_details/" + this.$parent.user_id)
					.then(res => {
						// console.log( res );
						this.user_details = res.data.data;
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			getActivityData( ){
	    	this.$parent.showLoading();
	    	var data = {
	    		spending_type : this.spending_type_selected,
	    		start : moment( this.start_month + " " + this.current_year,'MM YYYY' ).startOf('month').format('YYYY-MM-DD'),
	    		end : moment( this.end_month + " " + this.current_year,'MM YYYY' ).endOf('month').format('YYYY-MM-DD'),
	    	}
				axios.post( axios.defaults.serverUrl + "/employee/search_eclaim_activity/" + this.$parent.user_id, data)
					.then(res => {
						// console.log( res );
						this.activity_results = res.data;
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			uploadInNetworkReceipt( list ){
				if( !list.transaction_files ){
					list.transaction_files = [];
				}
				list.uploading = true;
				var data = {
					file : list.upload, 
					transaction_id : list.transaction_id
				}
				this.$parent.showLoading();
				axios.post( axios.defaults.serverUrl + "/employee/create/transaction_receipt/" + this.$parent.user_id, data)
					.then(res => {
						// console.log( res );
						list.uploading = false;
						if( res.data.status == true ){
							list.transaction_files.push( res.data.receipt );
							list.upload_err = false;
						}else{
							list.upload_err = true;
							list.upload_err_message = res.data.message;
						}
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						list.uploading = false;
						list.upload_err = true;
						list.upload_err_message = 'Something went wrong. Please check your internet connection.';
						this.$parent.hideLoading();
					});
			},
			uploadOutNetworkReceipt( list ){
				if( !list.files ){
					list.files = [];
				}
				list.uploading = true;
				var data = {
					file : list.upload, 
					e_claim_id : list.transaction_id
				}
				this.$parent.showLoading();
				axios.post( axios.defaults.serverUrl + "/employee/create/e_claim_receipt/" + this.$parent.user_id, data)
					.then(res => {
						// console.log( res );
						list.uploading = false;
						if( res.data.status == true ){
							res.data.receipt.file = res.data.receipt.doc_file;
							list.files.push( res.data.receipt );
							list.upload_err = false;
						}else{
							list.upload_err = true;
							list.upload_err_message = res.data.message;
						}
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						list.uploading = false;
						list.upload_err = true;
						list.upload_err_message = 'Something went wrong. Please check your internet connection.';
						this.$parent.hideLoading();
					});
			},
			setFirstEndDate( firstMonth, lastMonth ){
				this.start_month = moment( firstMonth + " " + this.current_year,'MM YYYY' ).startOf('month').format('MM');
				this.end_month   = moment( lastMonth + " " + this.current_year,'MM YYYY' ).endOf('month').format('MM');
			},
			changeSpendingType( opt ){
				this.spending_type_selected = opt;
				this.getActivityData( );
			},
			sliderDragged( value ){
				if( !this.inDragging ){
					this.setFirstEndDate( value[0], value[1] );
					this.getActivityData( );
				}
			},
			setDateSelector( opt ){
				this.date_selector = opt;
				if( opt == 1 ){
					this.current_year = moment().format('YYYY');
				}else{
					this.current_year = moment().subtract(1,'years').format('YYYY');
				}
				this.getActivityData();
			}
    }
	}

	export default activity
</script>