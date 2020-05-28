<template>
    <div class="memo" v-if="get_setting_load == 2 && get_settings[0].memo_field == 1">
        <button @click="add_memo()" class="btn">連絡メモ</button>
        <p class="memo-txt" v-if="get_memo.length">{{get_memo[0].memo}}</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        add_memo(){
            this.$store.state.schedule.add_memo = true
        },
    },  
    computed: {
        ...mapGetters([
            "get_memo",
            "get_settings",
            "get_setting_load",
        ])
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
}
    
</style>