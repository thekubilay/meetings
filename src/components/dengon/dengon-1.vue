<template>
    <div class="flex dengon--inner">
        <button @click="add_Dengon()">伝言</button>
        <p class="memo-txt" v-if="get_memo_reservation.length">
            <span v-for="(item, index) in dengon.split('\n')" :key="index" class="dengon_txt">{{item}}</span>
        </p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        add_Dengon(){
            this.$store.state.meeting.add_dengon = true
            this.$store.state.meeting.memo_reservation_obj.room_type = "dengon1"
        },
    },  
    computed: {
        ...mapGetters([            
            "get_memo_reservation",
            "get_settings",
            "get_setting_load",
        ]),
        dengon(){
            let dengon = ""
            this.get_memo_reservation.forEach(item => {
                if (item.room_type == "dengon1") {
                    dengon = item.memo
                }
            })
            return dengon
        }
    }
}
</script>
<style scoped>
.memo {
    margin: 0 25px;
    margin-top: 35px;
}
.memo button.btn {
    width: 100px;
    height: 35px;
}
p.memo-txt {
    padding-left: 10px;
    max-width: 250px;
    word-break: normal;
    word-wrap: break-word;
    line-height: 1.5;
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

.dengon_txt {
    max-width: 250px;
}
 button {
    background: #00008b;   
    color: white;
    margin-right: 10px;
    font-size: 14px;
}

 input {
    width: 250px;
    font-size: 13px;
    height: 30px;
    padding-left: 10px;
}
</style>