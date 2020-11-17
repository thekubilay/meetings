<template>
    <div class="room-table-wrap" v-if="get_setting_load == 2">
        <h5 class="rth">{{get_settings[0].room_seven}}</h5>
        <h4 class="boss--txt">社長来客以外使用不可</h4>
        <table :style="{border:'2px solid #'+get_settings[0].line_color}" class="meeting-tables">
            <thead>
                <tr>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item">時間</th>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item">人数</th>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item">物件(内容)/来客</th>
                    <th :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item">担当</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in strict_time(get_times)" :key="index">
                    <td :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item"><button @click="add_meeting(item.time)" class="btn">{{item.time}}</button></td>
                    <td :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item"><p>{{matched_reservation(item.time).people}}</p></td>
                    <td :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item"><p>{{matched_reservation(item.time).content}}</p></td>
                    <td :style="{borderRight:'2px solid #'+get_settings[0].line_color, borderBottom:'2px solid #'+get_settings[0].line_color}" class="met-item"><p>{{matched_reservation(item.time).in_charge}}</p></td>
                </tr>
            </tbody>
        </table>
        <app-memo />
    </div>
</template>
<script>
import appMemo from "../memo/memo-reservation-7";
import { mapGetters } from 'vuex'
export default {
    components: {
        appMemo,
    },
    data(){
        return {
            room_type: "room_seven" 
        }
    },
    methods: {      
        strict_time(times)  {
            let new_times = []
            times.forEach(item => {
                if (item.time.replace(":","") < "1830") {
                    new_times.push(item)
                }
            });
            return new_times
        },  
        matched_reservation(time){
            // display matched time content
            let obj = {}
            this.get_meetings.forEach(parent => {
                parent.plan_contents.forEach(item => {
                    if (time == item.time && this.room_type == item.room_type) {
                        obj = item                    
                    }
                });
            })

            return obj
        },
        add_meeting(time){
 
            // insert vuex reservation objects to show selected cells.
            this.$store.state.meeting.add_meeting = true
            this.$store.state.meeting.reservation.start_time = time
            this.$store.state.meeting.reservation.room_type = this.room_type
            
            this.get_meetings.forEach(parent => {
                parent.plan_contents.forEach(item => {
                    if ((item.room_type == this.room_type) && (item.time == time)) {
                        this.$store.state.meeting.reservation.id = parent.id
                        this.$store.state.meeting.reservation.start_time = parent.start_time
                        this.$store.state.meeting.reservation.finish_time = parent.finish_time
                        this.$store.state.meeting.reservation.content_id = item.id
                        this.$store.state.meeting.reservation.people = item.people
                        this.$store.state.meeting.reservation.content = item.content
                        this.$store.state.meeting.reservation.in_charge = item.in_charge
                    }
                });
            })
        }
    },

    computed: {
        ...mapGetters([
            "get_times",
            "get_reservation",
            "get_meetings",
            "get_settings",
            "get_setting_load",
        ]),
    }
}
</script>
<style>
.boss--txt {
    color: red;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    height: 10px;
    margin-top: 10px;
}
    
</style>