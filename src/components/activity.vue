<script>
	import axios from 'axios'
	import moment from 'moment'


	var activity = {
		data() {
			return {
				range_marks : { '1' : 'JAN', '2' : 'FEB', '3' : 'MAR', '4' : 'APR', '5' : 'MAY', '6' : 'JUN', '7' : 'JUL', '8' : 'AUG', '9' : 'SEP', '10' : 'OCT', '11' : 'NOV', '12' : 'DEC', },
				in_csv_fields : { 'DATE': 'date_of_transaction', 'TRANSACTION NO': 'transaction_id', 'PAYMENT TYPE': 'payment_type', 'ITEM/SERVICE': 'clinic_type_and_service', 'PROVIDER': 'clinic_name', 'TOTAL AMOUNT': 'amount', 'MEMBER': 'member', 'REFUNDED': 'refund_text' },
				out_csv_fields : { 'CLAIM DATE': 'claim_date', 'ITEM/SERVICE': 'service', 'PROVIDER': 'merchant', 'TOTAL AMOUNT': 'amount', 'MEMBER': 'member' },
				range_values : [ 1, moment( ).format('M') ],
				current_year : moment( ).format('YYYY'),
				start_date : new Date(moment().startOf('year')),
				end_date : new Date(moment().endOf('month')),
				formats: {
	        input: ['MM/DD/YYYY'], 
	        data: ['YYYY-MM-DD']
	      },
				inDragging : false,
				user_details : {},
				activity_results : {},
				spending_type_selected : 'medical',
				date_selector_type : 1,
	      in_transactions : [],
	      out_transactions : [],
	      transaction_type : 1,
			}
		},
		created() {
			this.getDetails();
			this.getActivityData( );
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
	    		start : moment(this.start_date).format('YYYY-MM-DD'),
	    		end : moment(this.end_date).format('YYYY-MM-DD'),
	    	}
				axios.post( axios.defaults.serverUrl + "/employee/search_eclaim_activity/" + this.$parent.user_id, data)
					.then(res => {
						// console.log( res );
						this.activity_results = res.data;
						if( parseInt(this.activity_results.total_allocation) > 0 ){
							if( this.activity_results.total_allocation.indexOf(",") >= 0 ){
								this.activity_results.total_allocation = this.activity_results.total_allocation.replace(",", "");
							}
							this.in_transactions = res.data.in_network_transactions;
							this.out_transactions = res.data.e_claim;
							this.spent_total = this.activity_results.total_spent;

							this.in_transactions.map(function(value, key) {
						    value.showDrop = false;
						  });
						  this.out_transactions.map(function(value, key) {
						    value.showDrop = false;
						  });

							if( this.spent_total.indexOf(",") >= 0 ){
								this.spent_total = this.spent_total.replace(",", "");
							}
							if( this.spent_total > 0 ){
								this.spent_in_network = this.activity_results.in_network_spent;
								if( this.spent_in_network.indexOf(",") >= 0 ){
									this.spent_in_network = this.spent_in_network.replace(",", "");
								}
								this.spent_progress_percentage = ( this.spent_in_network / this.spent_total ) * 100;
							}else{
								this.spent_progress_percentage = 0;
							}
						}else{
							this.spent_progress_percentage = 0;
						}
						$( ".spending-account-details-container .progress-wrapper .progress-bar" ).css({ 'width': this.spent_progress_percentage + '%' });
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			uploadInNetworkReceipt( list, upload_data ){
				if( !list.transaction_files ){
					list.transaction_files = [];
				}
				list.uploading = true;
				let formData = new FormData();
	    	formData.append('file', upload_data[0]);
	    	formData.append('transaction_id', list.transaction_id);
	    	console.log( formData );
				this.$parent.showLoading();
				axios.post( 
					axios.defaults.serverUrl + "/employee/create/transaction_receipt/" + this.$parent.user_id, 
					formData, 
					{ headers: { 'Content-Type': 'multipart/form-data' } })
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
						list.upload_err_message = 'Something went wrong. Please check your internet connection.'
						this.$parent.hideLoading();
					});
			},
			downloadMednefitsReceipt( id ){
				window.open( axios.defaults.serverUrl + '/download/transaction_receipt/' + id );
			},
			downloadReceipt( files ){
				// files.map(function(value, key) {
			    
			 //  });
			  for( var i = 0; i < files.length; i++ ){
			  	var link = document.createElement("a");
			    link.download = 'download';
			    link.href = files[i].file;
			    link.click();
			  }
			},
			showPreview( img ){
				console.log( img.file );
				var url = "https://docs.google.com/viewer?url=" + img.file + "&embedded=true&chrome=true";
				console.log(url);

				$(".preview-box").fadeIn();

				if( img.file_type == 'image' ){
					$(".preview-box img").show();
					$(".preview-box .img-container").css({'width': '500px'});
					$(".preview-box iframe").hide();
					$(".preview-box img").attr('src', img.file);
				}else{
					$(".preview-box iframe").show();
					$(".preview-box .img-container").css({'width': '80%'});
					$(".preview-box img").hide();
					$(".preview-box #src-view-data").attr('src', url);
				}
			},
			hidePreview( ){
				$(".preview-box").fadeOut();
			},
			setFirstEndDate( firstMonth, lastMonth ){
				this.start_date = moment( firstMonth + " " + this.current_year,'MM YYYY' ).startOf('month').format('YYYY-MM-DD');
				this.end_date   = moment( lastMonth + " " + this.current_year,'MM YYYY' ).endOf('month').format('YYYY-MM-DD');
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
				this.date_selector_type = opt;
				if( opt == 1 ){
					this.current_year = moment().format('YYYY');
				}else{
					this.current_year = moment().subtract(1,'years').format('YYYY');
				}
				this.getActivityData();
			},
			selectTransactionType( opt ){
				this.transaction_type = opt;
			},
			onDownloadCSVStart(){
				this.$parent.showLoading();
			},
			onDownloadCSVDone(){
				this.$parent.hideLoading();
			},
			toggleTransactionDrop( list ){
				if( list.showDrop == true ){
					list.showDrop = false;
				}else{
					list.showDrop = true;
				}
				this.$forceUpdate();
			}

    }
	}

	export default activity
</script>