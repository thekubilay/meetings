<template>
    <div class="room-table-wrap" v-if="get_setting_load == 2">
        <h5 class="rth">{{get_settings[0].room_two}}</h5>
        <table :style="{border:'2px solid #'+get_settings[0].color_line}" class="meeting-tables">
            <thead>
                <tr>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item">時間</th>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item">人数</th>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item">物件(内容)/来客</th>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item">担当</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in get_times" :key="index">
                    <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item"><button @click="add_meeting(item)" class="btn">{{item.match(/../g).join(':')}}</button></td>
                    <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item"><p>{{matched_reservation(item).people}}</p></td>
                    <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item"><p>{{matched_reservation(item).content}}</p></td>
                    <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="met-item"><p>{{matched_reservation(item).in_charge}}</p></td>
                </tr>
            </tbody>
        </table>
        <app-memo />
    </div>
</template>
<script>
import appMemo from "../memo/memo-reservation-2";
import { mapGetters } from 'vuex'
export default {
    components: {
        appMemo,
    },
    data(){
        return {
            room_type: "room_two" 
        }
    },
    methods: {        
        matched_reservation(time){
            let obj = {}
            this.get_meetings.forEach(item => {
                if ((item.room_type == this.room_type ) && (item.time <= time && item.time_table >= time)) {
                    obj = item
                }
            })
            return obj
        },
        add_meeting(time){
            this.$store.state.meeting.add_meeting = true
            this.$store.state.meeting.reservation.old_time = time
            this.$store.state.meeting.reservation.start_time = time
            this.$store.state.meeting.reservation.room_type = this.room_type
            
            // fill the reservation blanks
            this.get_meetings.forEach(item => {
                if ((item.room_type == this.room_type ) && (item.time <= time && item.time_table >= time)) {
                    this.$store.state.meeting.reservation.id = item.id
                    this.$store.state.meeting.reservation.old_time = item.old_time
                    this.$store.state.meeting.reservation.finish_time = item.time_table
                    this.$store.state.meeting.reservation.people = item.people
                    this.$store.state.meeting.reservation.content = item.content
                    this.$store.state.meeting.reservation.in_charge = item.in_charge
                }
            });

        }
    },
    computed: {
        ...mapGetters([
            "get_times",
            "get_meetings",
            "get_settings",
            "get_setting_load",
        ]),

    }
}
</script>