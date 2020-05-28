<template>
    <tr>
        <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item">
            <button class="btn"
                v-if="schedule.name != ''"
                @click="add_schedule()"
                >
                {{schedule.name}}                
            </button>
        </td>
        <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item" :class="{red_txt: holiday_finish == true || return_date == true || return_time == true}">
            <p v-if="schedule.schedules.length">{{schedule.schedules[0].content}}</p>
        </td>
        <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item" :class="{red_txt: holiday_finish == true || return_date == true || return_time == true}">
            <p v-if="schedule.schedules.length"> 
                {{ schedule.schedules[0].holiday_work_start != null ? schedule.schedules[0].holiday_work_start.substring(5).replace("-", "/") : ""}} 
                <span v-if="schedule.schedules[0].holiday_work_start != null && schedule.schedules[0].holiday_work_finish != null && schedule.schedules[0].holiday_work_start != '' && schedule.schedules[0].holiday_work_finish != ''">-</span>
                {{schedule.schedules[0].holiday_work_finish != null ? schedule.schedules[0].holiday_work_finish.substring(5).replace("-", "/") : ""}} 
            </p>
        </td>
        <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item" :class="{red_txt: holiday_finish == true || return_date == true || return_time == true}">
            <p v-if="schedule.schedules.length && schedule.schedules[0].display_returns == 1 && schedule.schedules[0].direct_returns == 0">
                {{ schedule.schedules[0].return_date != null ? schedule.schedules[0].return_date.substring(5).replace("-", "/") : ""}}
                <span v-if="schedule.schedules[0].return_date != null && schedule.schedules[0].return_time.length">-</span>
                {{schedule.schedules[0].return_time.length ? schedule.schedules[0].return_time.match(/../g).join(':') : ""}}
            </p>
            <p v-if="schedule.schedules.length && schedule.schedules[0].direct_returns == 1">NR</p>
        </td>

        <td :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item" :class="{red_txt: holiday_finish == true || return_date == true || return_time == true}">
            <p v-if="schedule.schedules.length">{{schedule.schedules[0].remarks}}</p>
        </td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        schedule: Object,
    },
    methods: {
        add_schedule(){
            this.$store.state.schedule.add_schedule = true;    
            this.$store.state.schedule.schedule_user_id = this.schedule.id                
        },
    },
    computed: {
        ...mapGetters([
            "get_selected_date",
            "get_settings",
            "get_setting_load",
        ]),
        holiday_finish(){
            var date = new Date();
            var mm = date.getMonth()+1; 
            var dd = date.getDate();
            let today = mm+""+dd
            today = parseInt(today)

           if (this.schedule.schedules.length) {
                if (this.schedule.schedules[0].holiday_work_finish != null) {
                    let arrange_date = this.schedule.schedules[0].holiday_work_finish.substring("5", "10")
                    arrange_date = arrange_date.replace("-", "");
                    arrange_date = parseInt(arrange_date)
                    if (arrange_date < today) {
                        return true; 
                    } else {
                        return false;
                    }             
                } else {
                    return ""
                }
           }
        },
        return_date(){
            var date = new Date();
            var mm = date.getMonth()+1; 
            var dd = date.getDate();
            let today = mm+""+dd
            today = parseInt(today)

            if (this.schedule.schedules.length) {
                if (this.schedule.schedules[0].return_date != null) {
                    let arrange_date = this.schedule.schedules[0].return_date.substring("5", "10")
                    arrange_date = arrange_date.replace("-", "");
                    arrange_date = parseInt(arrange_date)
                    if (arrange_date < today) {
                        return true; 
                    } else {
                        return false;
                    }             
                } else {
                    return ""
                }
            }
        },
        return_time(){
            var date = new Date();
            var mm = date.getMonth()+1; 
            var dd = date.getDate();
            var yyyy = date.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 

            let today = yyyy+"-"+mm+"-"+dd

            var hour = date.getHours()+1; 
            var min = date.getMinutes();
            let time = hour+""+min
            time = parseInt(time)

            if (this.schedule.schedules.length) {
                if (this.schedule.schedules[0].return_time != null && this.schedule.schedules[0].return_time != "") {
                    let arrange_time = this.schedule.schedules[0].return_time
                    arrange_time = parseInt(arrange_time)
                    if (this.schedule.schedules[0].return_date != null) {
                        if (arrange_time < time && this.schedule.schedules[0].return_date <= today) {
                            return true; 
                        } else {
                            return false;
                        }  
                    } else {
                        if (arrange_time < time) {
                            return true; 
                        } else {
                            return false;
                        }             

                    }

                } else {
                    return ""
                }
            }
        },
    },

}
</script>
<style>
.red_txt {
    color: red;
}
</style>