<script>
	import axios from 'axios'

	var dashboard = {
		data() {
			return {
				showIconLoader : true,
				showLoader : false,
				user_id : null,
				isLogoutDropShow : false,
				showupdatePassModal : false,
				update_pass_data : {},
				isWhiteHeader : false,
				showMenuCollapse : false
			}
		},
		created() {
			if( localStorage.getItem('vue_session') == null ){
				location.href = '/auth';
			}else{
				this.user_id = localStorage.getItem('vue_session');
			}

			setTimeout(()=>{
			  this.showIconLoader = false;
			},3000);
		},
		methods: {
			swal( title, message, type ) {
        this.$swal( title, message, type);
      },
			showIconLoading() {
      	this.showIconLoader = true;
      },
      hideIconLoading() {
      	setTimeout(()=>{
				  this.showIconLoader = false;
				},1000);
      },
      showLoading() {
      	this.showLoader = true;
      },
      hideLoading() {
      	setTimeout(()=>{
				  this.showLoader = false;
				},1000);
      },
      toggleLogout() {
      	this.isLogoutDropShow = !this.isLogoutDropShow ? true : false;
      },
      closeLogout() {
      	this.isLogoutDropShow = false;
      },
      toggleUpdatePass() {
      	this.closeLogout();
      	this.showupdatePassModal = !this.showupdatePassModal ? true : false;
      },
      updatePassword( data ){
      	if( !data.current_password || !data.new_password || !data.confirm_password){
					this.swal("Error!", "Please input all fields.", "error");
					return false;
				}
				if( data.new_password != data.confirm_password ){
					this.swal("Error!", "Passwords did not match.", "error");
					return false;
				}
      	this.showLoading();
      	var pass = {
					oldpassword: data.current_password ,
					password: data.new_password
				}
				axios.post( axios.defaults.serverUrl + '/employee/change_password', pass)
					.then(res => {
						// console.log( res );
						if( res.data.status ){
							this.swal("Success!", res.data.message, "success");
							this.toggleUpdatePass();
						}else{
							this.swal("Error!", res.data.message, "error");
						}
						this.hideLoading();
					})
					.catch(err => {
						console.log( err );
						this.hideLoading();
					});
      },
      logout( ){
      	this.showLoading();
				axios.get( axios.defaults.serverUrl + '/app/e_claim/logout')
					.then(res => {
						console.log( res );
						this.hideLoading();
						location.href = '/auth';
					})
					.catch(err => {
						console.log( err );
						this.hideLoading();
					});
      },
      toggleMenuBtn() {
				if(this.showMenuCollapse == false) {
					this.showMenuCollapse = true;
				} else {
					this.showMenuCollapse = false;
				}
			},
    }
	}

	export default dashboard
</script>