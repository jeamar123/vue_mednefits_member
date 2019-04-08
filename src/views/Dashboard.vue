<template>
	<div id="main-content" >
	  <div class="navbar" v-bind:class="{ 'white-header' : $route.name != 'Home' }">
	  	<div class="nav-logo">
	  		<img :src="'../assets/img/mednefits_icon_blue.png'">
	  	</div>
	  	<div class="nav-items">
	  		<ul class="nav-ul">
	  			<router-link tag="li" to="/app/dashboard"><a href="#">Home</a></router-link>
	  			<router-link tag="li" to="/app/activity"><a href="#">Activity</a></router-link>
	  			<router-link tag="li" to="/app/eclaim"><a href="#">Submit E-Claim</a></router-link>
	  		</ul>
	  		<button class="menu-bar-wrapper" v-on:click="toggleMenuBtn()">
	  			<div class="icon-bar"></div>
	  			<div class="icon-bar"></div>
	  			<div class="icon-bar"></div>
	  		</button>
	  	</div>
	  	<div class="need-help-container" v-click-outside="closeLogout">
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

	  		<img :src="'../assets/img/user-home.png'" v-on:click="toggleLogout()">

	  		<div v-if="isLogoutDropShow" class="logout-drop">
	  			<ul>
	  				<li><a @click.prevent="toggleUpdatePass()">Update Password</a></li>
	  				<li><a @click.prevent="logout()">Logout</a></li>
	  			</ul>
	  		</div>
	  	</div>
	  	<div class="navbar-collapse" v-if="showMenuCollapse">
	  		<ul>
	  			<router-link tag="li" to="/app/dashboard"><a href="#">Home</a></router-link>
	  			<router-link tag="li" to="/app/activity"><a href="#">Activity</a></router-link>
	  			<router-link tag="li" to="/app/eclaim"><a href="#">Submit E-Claim</a></router-link>
	  			<router-link tag="li" to=""><a href="#">Logout</a></router-link>
	  		</ul>
	  	</div>
	  </div>

	  <div class="child-content">
	  	<router-view></router-view>
	  </div>

	  <transition name="modal">
	    <div v-if="showupdatePassModal" class="modal-mask confirm-dialog update-pass-modal">
	      <div class="modal-wrapper">
	        <div class="modal-container">
	        	<div class="modal-header">
	        		<p>Update Password</p>
	        	</div>
	          <div class="modal-body">
          		<div class="form-div">
          			<input type="password" placeholder="Current Password" v-model="update_pass_data.current_password">
          		</div>
          		<div class="form-div">
          			<input type="password" placeholder="New Password" v-model="update_pass_data.new_password">
          		</div>
          		<div class="form-div">
          			<input type="password" placeholder="Confirm Password" v-model="update_pass_data.confirm_password">
          		</div>
	          </div>
	          <div class="modal-footer">
              <button class="modal-button cancel-button" v-on:click="showupdatePassModal = false">Cancel</button>
              <button class="modal-button" v-on:click="updatePassword( update_pass_data )">Update</button>
	          </div>
	        </div>
	      </div>
	    </div>
	  </transition>

	  <transition name="fade">		
		  <div v-if="showLoader" class="main-loader">
				<!-- <div class="loader">
					<img :src="'../assets/img/mednefits_icon_blue.png'" style="	width: 25px;margin-top: 20px;">
				</div> -->
				<div class="circle-loader">
					<div class="preloader-container">
						<div class="preloader-wrapper big active">
					    <div class="spinner-layer spinner-blue-only">
					      <div class="circle-clipper left">
					        <div class="circle"></div>
					      </div><div class="gap-patch">
					        <div class="circle"></div>
					      </div><div class="circle-clipper right">
					        <div class="circle"></div>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
			</div>
		</transition>

		<transition name="fade">
		  <div v-if="showIconLoader" class="logo-preloader-container">
		  	<div class="logo-preload-wrapper">
					<img :src="'../assets/img/mednefits_icon_blue.png'">
					<div class="white-space-20"></div>
					<div class="logo-preloader-box">
						<div class="logo-preloader-bar"></div>
					</div>
				</div>
			</div>
		</transition>
  </div>

  
</template>

<script>
	import dashboard from '@/components/dashboard'
	export default dashboard
</script>
