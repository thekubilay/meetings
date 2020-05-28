<template>
<<<<<<< HEAD
    <div class="memo memo-reservation" v-if="get_setting_load == 2 && get_settings[0].memo_field == 1">
=======
    <div class="memo memo-reservation" v-if="get_setting_load == 2 && get_settings[0].reservation_memo_field == 1">
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
        <button @click="add_memo()" class="btn">備考</button>
        <p class="memo-txt" v-if="get_memo_reservation.length">{{memo}}</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        add_memo(){
            this.$store.state.meeting.add_memo_reservation = true
<<<<<<< HEAD
            this.$store.state.meeting.memo_reservation_obj.room_type = "room_four"
=======
            this.$store.state.meeting.memo_reservation_obj.room_type = "four"
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
        },
    },  
    computed: {
        ...mapGetters([            
            "get_memo_reservation",
            "get_settings",
            "get_setting_load",
        ]),
        memo(){
            let memo = ""
            this.get_memo_reservation.forEach(item => {
<<<<<<< HEAD
                if (item.room_type == "room_four") {
=======
                if (item.room_type == "four") {
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
                    memo = item.memo
                }
            })

            return memo
        }        
    }
}
</script>