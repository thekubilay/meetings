<template>
    <div class="room-table-wrap" v-if="get_setting_load == 2">
        <h5 class="rth">{{get_settings[0].room_one}}</h5>
        <h4 class="boss--txt"></h4>
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
import appMemo from "../memo/memo-reservation-1";
import { mapGetters } from 'vuex'
export default {
    components: {
        appMemo,
    },
    data(){
        return {
            room_type: "room_one" 
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
                    };
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
    },
}
</script>
<style>
.room-table-wrap {
    margin: 0 10px;
    width: 15%;
    margin-bottom: 20px;
}
h5.rth {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: #00008b;
}
table.meeting-tables {
    width: 100%;
    font-size: 14px;
    margin-top: 35px;
}
table.meeting-tables thead tr {
    background-color: white;    
}
table.meeting-tables thead tr th.met-item {
    padding: 10px 0;
    color: #00008b;
    font-weight: 500;
    text-align: center;
}
table.meeting-tables thead tr th.met-item:nth-child(1) {
    width: 20%;
    min-width: 20%;
}
table.meeting-tables thead tr th.met-item:nth-child(2) {
    width: 12%;
    min-width: 10%;
}
table.meeting-tables thead tr th.met-item:nth-child(3) {
    width: 50%;
    min-width: 50%;
}
table.meeting-tables thead tr th.met-item:nth-child(4) {
    width: 18%;
    min-width: 18%;
    border-right: 0;
}


/* body */
table.meeting-tables tbody tr td.met-item {
    text-align: center;
    vertical-align: middle;
    height: auto;
    min-height: 40px;
    padding: 2px;
}
table.meeting-tables tbody tr td.met-item:nth-child(4) {
    font-size: 12px;
}
table.meeting-tables tbody tr td.met-item:nth-child(1) {
    text-align: center;
}
table.meeting-tables tbody tr td.met-item:nth-child(3) {
    padding: 5px;
    font-size: 13px;
    text-align: left;
}
table.meeting-tables tbody tr td.met-item:nth-child(1) button.btn {
    width: 90%;
    padding: 0;
    margin: auto;
    font-size: 12px;
    min-width: 90%;
    height: 32px;
}
table.meeting-tables tbody tr td.met-item:nth-child(3) p {
      word-break: break-all;
}

@media screen and (max-width: 1250px){
    h5.rth {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #00008b;
    }
    table.meeting-tables {
        font-size: 12px;
    }
    table.meeting-tables tbody tr td.met-item:nth-child(1) button.btn {
        font-size: 10px;
    }
    table.meeting-tables tbody tr td.met-item {
        font-size: 10px;
    }
}

@media screen and (max-width: 1000px){
    .room-table-wrap {
        width: 30%;
    }
    table.meeting-tables thead tr th.met-item:nth-child(1) {
        width: 55px;
        min-width: 55px;
    }
    table.meeting-tables thead tr th.met-item:nth-child(2) {
        width: 40px;
        min-width: 40px;
    }
    table.meeting-tables thead tr th.met-item:nth-child(3) {
        width: 100px;
        min-width: 100px;
    }
    table.meeting-tables thead tr th.met-item:nth-child(4) {
        width: 50px;
        min-width: 50px;
    }
}

@media screen and (max-width: 830px){
    .room-table-wrap {
        width: 233px;
    }
}

@media screen and (max-width: 500px){
    #meeting .rooms {
        margin: 0 10px;
    }
    .room-table-wrap {
        width: 44%;
    }
    table.meeting-tables thead tr th.met-item:nth-child(1) {
        width: 55px;
        min-width: 34px;
    }
    table.meeting-tables thead tr th.met-item:nth-child(2) {
        width: 36px;
        min-width: 32px;
    }
    table.meeting-tables thead tr th.met-item:nth-child(3) {
        width: 100px;
        min-width: 58px;
    }
    table.meeting-tables thead tr th.met-item:nth-child(4) {
        width: 55px;
        min-width: 38px;
    }
}

</style>