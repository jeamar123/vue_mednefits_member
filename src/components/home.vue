<script>
	import axios from 'axios'
	import VuePlotly from '@statnett/vue-plotly'

	var corporate = {
		data() {
			return {
				user_data : {},
				packages_list : [],
				selected_spending_type : 'medical',
				spending_data : {},
				chartData: [{
				  values: null,
				  labels: ['A', 'B'],
				  marker : {
				  	colors : ['00B2E1','8EA4AA']
				  },
				  type: 'pie',
				  hole: .8,
				  showlegend : false,
				  hoverinfo : 'none',
				  textinfo: 'none',
				  sort: false
				}],
	      chartLayout: {
	      	height: 330,
	      	width: 330,
	      },
	      chartOptions: {}
			}
		},
		created() {
			this.getPackages();
			this.getCurrentActivityMedical();
		},
		components: {
	    VuePlotly
	  },
		methods: {
			getPackages ( ) {
	    	this.$parent.showLoading();
				axios.get( axios.defaults.serverUrl + '/employee_care_package/' + this.$parent.user_id)
					.then(res => {
						// console.log( res );
						this.user_data = res.data;
						this.packages_list = res.data.packages;
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			getCurrentActivityMedical ( ) {
	    	this.$parent.showLoading();
				axios.get( axios.defaults.serverUrl + '/employee/get_current_spending/' + this.$parent.user_id)
					.then(res => {
						// console.log( res );
						this.spending_data = res.data;
						this.setChartData( this.spending_data.current_spending_format_number, this.spending_data.in_network_spent_format_number );
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			getCurrentActivityWellness ( ) {
	    	this.$parent.showLoading();
				axios.get( axios.defaults.serverUrl + '/employee/get_current_wellness_spending/' + this.$parent.user_id)
					.then(res => {
						// console.log( res );
						this.spending_data = res.data;
						this.setChartData( this.spending_data.current_spending_format_number, this.spending_data.in_network_spent_format_number );
						this.$parent.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.$parent.hideLoading();
					});
			},
			setChartData ( total, current ) {
				var balance = total - current;
				this.chartData[0].values = [current, balance];
			},
			selectSpendingButton( type ) {
				this.selected_spending_type = type;
				type == 'medical' ? this.getCurrentActivityMedical() : this.getCurrentActivityWellness();
			}
	  }
	}

	export default corporate
</script>