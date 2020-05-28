<template>
	<div id="app">
		<router-view />
		<app-footer v-if="this.$route.name != 'panel'" />
		{{ get_setting_load == 2 ? refreshing() : ""}}
	</div>
</template>
<script>
import appFooter from "./components/footer"
<<<<<<< HEAD
import { mapGetters } from "vuex";
=======
import { mapGetters } from 'vuex';
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
export default {
	components: {
		appFooter,
	},
	created(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		if(dd<10) 
		{
			dd='0'+dd;
		} 

		if(mm<10) 
		{
			mm='0'+mm;
		} 

		today = yyyy+'-'+mm+'-'+dd;


		this.$store.state.meeting.selected_date = today		
		this.$store.dispatch("load_meeting", {"date":today})     
		this.$store.dispatch("load_reservation_memo", {"date":today})     
		this.$store.dispatch("load_setting");
<<<<<<< HEAD
		
		// every 15 min
		// setTimeout(() => {
		// 	window.location.reload();
		// }, this.get_settings[0].update_time * 60 * 1000);
=======

		// every 15 min
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
	},
	methods: {
		refreshing(){
			setTimeout(() => {
				window.location.reload();
			}, this.update_time * 60 * 1000);
		},
	},
	computed: {
		...mapGetters([
			"get_settings",
			"get_setting_load",
		]),
		update_time(){
			if (this.get_setting_load == 2) {
				return this.get_settings[0].update_time				
			}
		}
	}
}
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/master.css";

</style>