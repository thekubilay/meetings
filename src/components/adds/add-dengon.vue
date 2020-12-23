<template>
    <div class="popup-bg">
        <div class="blurred"></div>
        <div class="popup-frame add-member">
            <div @click="close_add_box()" class="flex align-ver align-hor close pointer"><i class="fas fa-times"></i></div>
            <h3 class="popup-frame-title">伝言入力フォーム</h3>
            <textarea rows="4" cols="50" v-model="dengon"></textarea>
            <button @click="insert_dengon()" class="popup-btn btn pointer">伝言登録</button>
            {{empty_txt}}
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            dengon: "",
        }
    },
    methods: {
        close_add_box(){
            this.$store.state.meeting.add_dengon = false
        },
        insert_dengon(){
            this.$store.state.meeting.add_dengon = false
            let payload = {
                "id": this.get_memo_reservation_obj.id,
                "room_type": this.get_memo_reservation_obj.room_type,
                "memo": this.dengon,
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
                        this.get_memo_reservation_obj.id = item.id
                        this.dengon = item.memo
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