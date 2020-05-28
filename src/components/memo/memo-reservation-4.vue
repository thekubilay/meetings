<template>
    <div class="memo memo-reservation" v-if="get_setting_load == 2 && get_settings[0].memo_field == 1">
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
            this.$store.state.meeting.memo_reservation_obj.room_type = "room_four"
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
                if (item.room_type == "room_four") {
                    memo = item.memo
                }
            })

            return memo
        }        
    }
}
</script>