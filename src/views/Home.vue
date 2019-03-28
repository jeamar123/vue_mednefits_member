<template>
	<div class="home-container">

		<p class="page-header">Welcome {{ user_data.fullname }}</p>
		<p class="page-subheader">Your Benefits	through {{ user_data.company_name }}</p>

		<div class="dash-container">
			<div class="white-box">
				<p class="box-header">Your Coverage <span>(In-Network)</span></p>
				<div class="coverage-item" v-for="list in packages_list">
					<div class="item-img">
						<img :src="list.image">
					</div>
					<div class="item-title">
						<p>{{ list.package_name }}</p>
					</div>
					<div class="item-desc">
						<p>{{ list.package_description }}</p>
					</div>
				</div>
			</div>

			<div class="white-box">
				<p class="box-header">Your Activity <router-link tag="a" to="/app/activity"><img :src="'../assets/img/arrow-left-image.png'"></router-link></p>

				<div class="spending-account-option-container">
					<p>Your Spending Account</p>
					<div class="spending-btn-wrapper">
						<button class="btn btn-medical" v-bind:class="{ active: selected_spending_type == 'medical' }" v-on:click="selectSpendingButton('medical')">Medical</button>
						<button class="btn btn-wellness" v-bind:class="{ active: selected_spending_type == 'wellness' }" v-on:click="selectSpendingButton('wellness')">Wellness</button>
					</div>
				</div>

				<div class="activity-body-container">
					<div class="balance-wrapper">
						<p class="balance-text">Balance</p>
						<p class="balance-value"><span>S$</span>{{ spending_data.balance }}</p>
					</div>
					<div class="total-spent-chart">
						<div id="spent-pie">
							<vue-plotly :data="chartData" :layout="chartLayout" :options="chartOptions"/>
						</div>
						<div class="spent-chart-value-wrapper">
							<p class="spent-chart-value">S$ <span>{{ spending_data.current_spending }}</span></p>
							<p class="spent-chart-text">Total Spent</p>
						</div>
					</div>
					<div class="account-count">
						<div class="in-network-count-wrapper">
							<p class="header-text">In-Network Account</p>
							<p class="spent-text">Spent</p>
							<p class="spent-value">S$ <span>{{ spending_data.in_network_spent }}</span></p>
						</div>
						<div class="out-network-count-wrapper">
							<p class="header-text">Out-of-Network Account</p>
							<p class="spent-text">Spent</p>
							<p class="spent-value">S$ <span>{{ spending_data.e_claim_spent }}</span></p>
						</div>
					</div>
				</div>

				<div class="recent-transactions-container">
					<p class="recent-transactions-text">RECENT TRANSACTIONS</p>
					<div class="texts-container">
						<p class="in-network-text">In-Network Transactions</p>
						<p class="out-network-text">Out-of-Network Transactions</p>
					</div>
					<div class="transactions-container">
						<div class="in-network-transactions">

							<div class="transaction-item" v-for="list in spending_data.in_network_transactions">
								<div class="icon-wrapper">
									<img :src="'../assets/img/transaction-icon.png'">
								</div>
								<div class="item-desc">
									<p class="item-date">{{ list.date_of_transaction }}</p>
									<p class="item-service">{{ list.clinic_type_and_service }}</p>
									<p class="item-clinic">{{ list.clinic_name }}</p>
								</div>
								<div class="item-value">	
									<p>S$ <span>{{ list.amount }}</span></p>
									<div v-if="list.cash_status" class="cash-badge">Cash</div>
								</div>
							</div>

						</div>
						<div class="out-network-transactions">

							<div class="transaction-item" v-for="list in spending_data.e_claim">
								<div class="icon-wrapper">
									<img :src="'../assets/img/transaction-icon.png'">
								</div>
								<div class="item-desc">
									<p class="item-date">Claim Date: {{ list.claim_date }}</p>
									<p class="item-service">{{ list.service }}</p>
									<p class="item-clinic">{{ list.merchant }}</p>
								</div>
								<div class="item-value">	
									<p>S$ <span>{{ list.amount }}</span></p>
									<label class="transaction-status-label">{{ list.status_text }}</label>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="overlay"></div>
	</div>
</template>

<script>
	import home from '@/components/home'
	export default home
</script>
