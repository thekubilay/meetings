<template>
	<div id="app">
		<router-view />
		<app-footer v-if="this.$route.name != 'panel' && this.$route.name != 'login'" />
		{{ get_setting_load == 2 ? update_time : ""}}
	</div>
</template>
<script>
import appFooter from "./components/footer"
import { mapGetters } from "vuex";
import { authenticationService } from './_services';
import { Role } from './_helpers';
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
		this.$store.dispatch("load_meeting_times")     
		this.$store.dispatch("load_meeting_contents", {"date":today})     
		this.$store.dispatch("load_reservation_memo", {"date":today})     
		this.$store.dispatch("load_setting");

	},
	computed: {
		...mapGetters([
			"get_selected_date",
			"get_settings",
			"get_setting_load",
		]),
		update_time(){
			// instead of hard refresh used dipatch call, no need to change the update the 
			// when opened. 
			if (this.get_setting_load == 2) {
				setTimeout(() => {
					this.$store.dispatch("load_meeting_contents", {"date":this.get_selected_date})
					this.$store.dispatch("load_reservation_memo", {"date":this.get_selected_date})
				}, this.get_settings[0].update_time * 60 * 1000);				
			}

			return ""	

		},
		isAdmin () {
			return this.currentUser && this.currentUser.role === Role.Admin;
		}
	
	}
}
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/master.css";

</style>