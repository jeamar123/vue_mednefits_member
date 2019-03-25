<template>
	<div class="auth-container">
	  
	  <div class="need-help-container">
	  	<a href="#" class="need-help-text">Need help?</a>

	  	<div class="need-help-drop-container">
	  		<p class="title">We're here to help.</p>
	  		<p class="subtitle">You may ring us</p>
	  		<p>+65 6254 7889</p>
	  		<p>Mon - Fri 10:00 to 19:00</p>

	  		<div class="white-space-30"></div>
	  		<p class="subtitle">Drop us a note, anytime</p>
	  		<p>happiness@mednefits.com</p>
	  	</div>
	  </div>

  	<div class="medne-icon-wrapper">
	  	<img :src="'../assets/img/mednefits_logo_blue.png'">
	  	<p>for member</p>
	  </div>

	  <div v-if="!isResetPasswordShow" class="login-container">
	  	<form @submit.prevent="submitLogin()">
		  	<div class="form-div">
		  		<input type="text" placeholder="Email Address" v-model="login_data.email">
		  	</div>
		  	<div class="white-space-10"></div>
		  	<div class="form-div">
		  		<input type="password" placeholder="Password" v-model="login_data.password">
		  	</div>
		  	<div class="form-div form-checkbox">
		  		<label>
		  			<input type="checkbox" value="true" v-model="login_data.stay_signed_in">
		  			Stay signed in
		  		</label>
		  	</div>
		  	<div class="login-button-wrapper">
		  		<button class="btn" >Log in</button>
		  	</div>
		  	<div class="forgot-password-wrapper">
		  		<p v-on:click="toggleForgotPass()">Forgot password?</p>
		  	</div>
	  	</form>
	  </div>

	  <div v-if="isResetPasswordShow" class="forgot-password-container">
	  	<form @submit.prevent="submitResetEmail()">
	  		<div class="form-div">
		  		<input type="text" placeholder="Email Address" v-model="reset_data.email">
		  	</div>
		  	<div class="login-button-wrapper">
		  		<button class="btn">Reset Password</button>
		  	</div>
		  	<div class="forgot-password-wrapper">
		  		<p v-on:click="toggleForgotPass()">Login</p>
		  	</div>
	  	</form>
	  </div>

	  <div v-if="showLoader" class="main-body-loader">
			<div class="loader">
				<img :src="'../assets/img/mednefits_icon_blue.png'" style="	width: 25px;margin-top: 20px;">
			</div>
		</div>
  </div>
  
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				login_data : {},
				reset_data : {},
				showLoader : false,
				isResetPasswordShow : false,
			}
		},
		created() {
			
		},
		methods: {
      showLoading() {
      	this.showLoader  = true;
      },
      hideLoading() {
      	setTimeout(()=>{
				  this.showLoader  = false;
				},500);
      },
      swal( title, message, type ) {
        this.$swal( title, message, type);
      },
      submitLogin(){
      	if( !this.login_data.email ){
      		this.swal('Error!','Email Address is required','error');
      		return false;
      	}
      	if( !this.login_data.password ){
      		this.swal('Error!','Password is required','error');
      		return false;
      	}
      	this.showLoading();
      	var data = {
      		email: this.login_data.email,
          password: this.login_data.password,
          stay_signed_in: this.login_data.stay_signed_in == true ? true : false,
      	}
      	axios.post( axios.defaults.serverUrl + '/app/e_claim/login', data)
					.then(res => {
						this.hideLoading();
						console.log(res);
						if( res.data.status ){
							// this.swal('Success!', res.data.message, 'success');
							localStorage.setItem('vue_session', res.data.data.UserID);
							location.href = "/app";
						}else{
							this.swal('Error!', res.data.message, 'error');
						}
					})
					.catch(err => {
						console.log( err );
						this.hideLoading();
						this.swal('Error!', err,'error');
					});
      },
      submitResetEmail(){
      	if( !this.reset_data.email ){
      		this.swal('Error!','Email Address is required','error');
      		return false;
      	}
      	this.showLoading();
      	var data = {
      		email: this.reset_data.email
      	}
      	axios.post( axios.defaults.serverUrl + '/v1/auth/forgotpassword', data)
					.then(res => {
						// console.log( res );
						this.hideLoading();
						if( res.data.status ){
							// this.swal('Success!', res.data.message, 'success');
							this.$swal( 'Success!', res.data.message, 'success')
								.then(res => {
									// console.log(res);
									if( res ){
										this.toggleForgotPass();
									}
								});
						}else{
							this.swal('Error!', res.data.message, 'error');
						}
					})
					.catch(err => {
						// console.log( err );
						this.hideLoading();
						this.swal('Error!', err,'error');
					});
      },
      toggleForgotPass() {
      	this.showLoading();
      	if( this.isResetPasswordShow == false ){
      		this.isResetPasswordShow = true;
      	}else{
      		this.isResetPasswordShow = false;
      	}
      	this.hideLoading();
      }
    }
	}

</script>
