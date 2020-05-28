<template>
    <div class="popup-bg">
        <div class="blurred"></div>
        <div class="popup-frame add-member">
            <div @click="close_add_box()" class="flex align-ver align-hor close pointer"><i class="fas fa-times"></i></div>
            <h3 class="popup-frame-title">備考入力フォーム</h3>
            <textarea rows="4" cols="50" v-model="memo"></textarea>
<<<<<<< HEAD:src/components/adds/add-reservation-memo.vue
            <button @click="insert_memo()" class="popup-btn btn pointer">備考登録</button>
=======
            <button @click="insert_memo()" class="popup-btn btn pointer">メモ登録</button>
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4:src/components/adds/add-memo.vue
            {{empty_txt}}
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            memo: "",
        }
    },
    methods: {
        close_add_box(){
            this.$store.state.meeting.add_memo_reservation = false
        },
        insert_memo(){
            this.$store.state.meeting.add_memo_reservation = false
            let payload = {
                "id": this.get_memo_reservation_obj.id,
                "room_type": this.get_memo_reservation_obj.room_type,
                "memo": this.memo,
                "created_at": this.get_selected_date
            }
            this.$store.dispatch("insert_reservation_memo", payload)
        }
    },
    computed: {
        ...mapGetters([
            "get_selected_date",
            "get_memo_reservation",
            "get_memo_reservation_obj",
        ]),
        empty_txt(){
            if (this.get_memo_reservation.length) {     
                this.get_memo_reservation.forEach(item => {
                    if (this.get_memo_reservation_obj.room_type == item.room_type) {
                        this.$store.state.meeting.memo_reservation_obj.id = item.id
                        this.memo = item.memo
                    }
                })           
            }

            return ""
        }
    }
}
</script>
<style>
.popup-bg .popup-frame textarea {
    width: 100%;
    font-size: 14px;
    margin-bottom: 15px;
    padding: 10px;
}

</style>