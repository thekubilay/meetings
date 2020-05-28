<template>
    <div id="meeting">
        <app-header />
<<<<<<< HEAD
        <div class="flex align-hor rooms">
            <app-meeting-one />
            <app-meeting-two />
            <app-meeting-tri />
            <app-meeting-for />
            <app-meeting-fiv />
            <app-meeting-six />
=======
        <div class="table-wrap flex between" v-if="get_schedule_load == 2 && get_setting_load == 2">
            <app-table-one :schedules="schedules" :class="{single_table: schedules.table_two == null}" />
            <app-table-two v-if="schedules.table_two != null" :schedules="schedules" />
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
        </div>
        <app-add-meeting v-if="get_add_meeting == true" />
        <app-add-memo v-if="get_add_memo_reservation == true" />
    </div>
</template>
<script>
import appHeader from "../components/header"
import appMeetingOne from '../components/meeting/meeting-room-1'
import appMeetingTwo from '../components/meeting/meeting-room-2'
import appMeetingTri from '../components/meeting/meeting-room-3'
import appMeetingFor from '../components/meeting/meeting-room-4'
import appMeetingFiv from '../components/meeting/meeting-room-5'
import appMeetingSix from '../components/meeting/meeting-room-6'
import appAddMeeting from "../components/adds/add-meeting"
import appAddMemo from "../components/adds/add-reservation-memo"
import { mapGetters } from 'vuex'
export default {
    components: {
        appHeader,
        appMeetingOne,
        appMeetingTwo,
        appMeetingTri,
        appMeetingFor,
        appMeetingFiv,
        appMeetingSix,
        appAddMeeting,
        appAddMemo,
    },
    computed: {
        ...mapGetters([
<<<<<<< HEAD
            "get_add_meeting",
            "get_add_memo_reservation",
        ])
=======
            "get_schedules",
            "get_schedule_load",
            "get_settings",
            "get_setting_load",
            "get_add_memo",
            "get_add_schedule",
        ]),
        schedules(){
			let row_number = parseInt(this.get_settings[0].row_number)				

			if (this.get_schedules.length > row_number) {
				let obj = {
					"table_one": "",
					"table_two": "",
				}
				obj.table_one = this.get_schedules.slice(0,row_number)
				obj.table_two = this.get_schedules.slice(row_number)
	
				return obj

			} else {
				let obj = {
					"table_one": "",
					"table_two": null,
				}
				obj.table_one = this.get_schedules
				return obj			
			}
		}
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
    }
}
</script>
<style>
#meeting {
    margin-top: 35px;
}
<<<<<<< HEAD
#meeting .rooms {
=======
#home .table-wrap {
    margin: 0 25px;
}
#home .table-wrap table.schedule-table {
    width: 48%;
    font-size: 14px;
}
#home .table-wrap table.single_table {
    width: 100%;
}

/* table header */
#home .table-wrap table.schedule-table thead tr {
    background-color: white;    
}
#home .table-wrap table.schedule-table thead tr th.st-item {
    text-align: center;
    font-weight: 500;
    vertical-align: middle;
    padding: 15px 0;
    color: #00008b;    
}
#home .table-wrap table.schedule-table thead tr th.st-item:nth-child(1) {
    text-align: center;
    width: 85px;
    min-width: 85px;
}
#home .table-wrap table.schedule-table thead tr th.st-item:nth-child(2) {
    width: 200px;
}
#home .table-wrap table.schedule-table thead tr th.st-item:nth-child(3), 
#home .table-wrap table.schedule-table thead tr th.st-item:nth-child(4) {
    width: 110px;    
}
#home .table-wrap table.schedule-table thead tr th.st-item:nth-child(5) {
    width: 150px;
    min-width: 150px;
}

/* table body */
#home .table-wrap table.schedule-table tr:nth-child(2n) {
    background-color: #fff;
}
#home .table-wrap table.schedule-table tbody tr {
    text-align: left;
    font-weight: 400;
    vertical-align: middle;
}
#home .table-wrap table.schedule-table tbody tr td.st-item {
    text-align: left;
    font-weight: 400;
    padding: 5px;
    height: 45px;
    vertical-align: middle;
}

#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(1) {
    text-align: center;
    margin: auto;
    padding: 0;
}
#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(1) button.btn {
    height: 35px;
    width: 90%;
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
    margin: auto;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;
    width: 100%;
}
<<<<<<< HEAD
</style>
=======
#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(2) {
    text-align: left;
    margin: auto;
}
#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(2) p {
    word-break: break-all;
}
#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(3), 
#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(4) {
    text-align: center;   
    padding: 0;
}
#home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(5) p {
    word-break: break-all;
}


@media screen and (max-width: 1100px){
    #home .table-wrap {
        margin-left: 15px;
        margin-right: 15px;
    }
}

@media screen and (max-width: 1000px){
    #home .table-wrap table.schedule-table {
        font-size: 12px;
        border: 2px solid #00008b;
    }

    #home .table-wrap table.schedule-table thead tr th.st-item {
        text-align: center;
        font-weight: 500;
        vertical-align: middle;
        padding: 10px 0;
        color: #00008b;
        border-right: 2px solid #00008b;
    }
}

@media screen and (max-width: 800px){
    #home .table-wrap table.schedule-table thead tr th.st-item:nth-child(1) {
        text-align: center;
        width: 50px;
        min-width: 50px;
    }
    #home .table-wrap table.schedule-table thead tr th.st-item:nth-child(5) {
        width: 100px;
        min-width: 100px;
    }

    /* tbody */
    #home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(1) button.btn {
        font-size: 12px;
        height: 38px;
    }
    
}

@media screen and (max-width: 600px){
    #home .table-wrap table.schedule-table thead tr th.st-item:nth-child(1) {
        text-align: center;
        width: 40px;
        min-width: 45px;
    }
    #home .table-wrap table.schedule-table thead tr th.st-item:nth-child(5) {
        width: 100px;
        min-width: unset;
    }

    /* tbody */
    #home .table-wrap table.schedule-table tbody tr td.st-item:nth-child(1) button.btn {
        font-size: 10px;
        height: 38px;
    }

    #home .table-wrap table.schedule-table tbody tr td.st-item {
        text-align: left;
        font-weight: 400;
        padding: 2px;
        height: 45px;
        vertical-align: middle;
        border-right: 2px solid #00008b;
    }
    
}
</style>
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
