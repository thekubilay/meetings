<template>
    <div class="memo memo-reservation" v-if="get_setting_load == 2 && get_settings[0].memo_visible == 1">
        <button @click="add_memo()" class="btn">備考</button>
        <p class="memo-txt" v-if="get_memo_reservation.length"><span v-for="(item, index) in memo.split('\n')" :key="index">{{item}}</span></p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        add_memo(){
            this.$store.state.meeting.add_memo_reservation = true
            this.$store.state.meeting.memo_reservation_obj.room_type = "room_one"
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
                if (item.room_type == "room_one") {
                    memo = item.memo
                }
            })

            return memo
        }
    }
}
</script>
<style>
.memo {
    margin: 0 25px;
    margin-top: 35px;
}
.memo button.btn {
    width: 100px;
    height: 35px;
}
.memo p.memo-txt {
    margin-top: 15px;
    padding-left: 10px;
    font-size: 12px;
}
.memo p.memo-txt span {
    display: block;
    margin-bottom: 5px;
}
.memo-reservation {
    margin-left: 0;
}
.memo-reservation button.btn {
    width: 80px;
}
</style>