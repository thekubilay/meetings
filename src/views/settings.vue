<template>
    <div id="settings">
        <h3 class="setting-table-title">{{settings}}</h3>
        <table class="setting-table">
            <thead>
                <tr>
                    <th class="sett-item">
                        #num
                    </th>
                    <th class="sett-item">項目</th>
                    <th class="sett-item">設定値</th>
                    <th class="sett-item">備考</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="sett-item">1</td>
                    <td class="sett-item">自動更新時間 :</td>
                    <td class="sett-item"><input v-model="update_time" class="setting-input" type="text"></td>
                    <td class="sett-item">1～25（分）で設定</td>
                </tr>
                <tr>
                    <td class="sett-item">2</td>
                    <td class="sett-item">線色 :</td>
                    <td class="sett-item"><input v-model="line_color" class="setting-input" type="text"></td>
                    <td class="sett-item">16進数カラーコード</td>
                </tr>
                <tr>
                    <td class="sett-item">3</td>
                    <td class="sett-item">部屋 No.1 名称 :</td>
                    <td class="sett-item"><input v-model="room_one" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">4</td>
                    <td class="sett-item">部屋 No.2 名称 :</td>
                    <td class="sett-item"><input v-model="room_two" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">5</td>
                    <td class="sett-item">部屋 No.3 名称 :</td>
                    <td class="sett-item"><input v-model="room_three" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">6</td>
                    <td class="sett-item">部屋 No.4 名称 :</td>
                    <td class="sett-item"><input v-model="room_four" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">7</td>
                    <td class="sett-item">部屋 No.5 名称 :</td>
                    <td class="sett-item"><input v-model="room_five" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">8</td>
                    <td class="sett-item">部屋 No.6 名称 :</td>
                    <td class="sett-item"><input v-model="room_six" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">9</td>
                    <td class="sett-item">部屋 No.7 名称 :</td>
                    <td class="sett-item"><input v-model="room_seven" maxlength="15" class="setting-input" type="text"></td>
                    <td class="sett-item">15文字以内</td>
                </tr>
                <tr>
                    <td class="sett-item">10</td>
                    <td class="sett-item">備考 :</td>
                    <td class="sett-item"><input v-model="memo_visible" type="checkbox" class="setting-input"></td>
                    <td class="sett-item">応接予約表備考欄の表示</td>
                </tr>
            </tbody>
        </table>
        <div class="flex between btn-wrap">
            <button @click="return_to()" class="sett-btn btn">応接予約表へ戻る</button>
            <button @click="settings_update()" class="sett-btn btn">決定</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            update_time: "",
            line_color: "",
            room_one:"",
            room_two:"",
            room_three:"",
            room_four:"",
            room_five:"",
            room_six:"",
            room_seven:"",
            memo_visible:"",
        }
    },
    methods: {
        settings_update(){
            let payload = {
                "id": this.get_settings[0].id,
                "update_time": this.update_time,            
                "line_color": this.line_color,
                "room_one": this.room_one,
                "room_two": this.room_two,
                "room_three": this.room_three,
                "room_four": this.room_four,
                "room_five": this.room_five,
                "room_six": this.room_six,
                "room_seven": this.room_seven,
                "memo_visible": this.memo_visible == true ? 1 : 0,
            }
            this.$store.dispatch("update_settings", payload)
            // this.$router.push({name: "home"})
        },
        return_to(){
            this.$router.push({name: "home"})
        }
    },
    computed: {
        ...mapGetters([
            "get_settings",
            "get_setting_load",
        ]),
        settings(){
            if (this.get_settings.length) {
                this.update_time = this.get_settings[0].update_time
                this.line_color = this.get_settings[0].line_color
                this.room_one =  this.get_settings[0].room_one
                this.room_two =  this.get_settings[0].room_two
                this.room_three =  this.get_settings[0].room_three
                this.room_four =  this.get_settings[0].room_four
                this.room_five =  this.get_settings[0].room_five
                this.room_six =  this.get_settings[0].room_six
                this.room_seven =  this.get_settings[0].room_seven
                this.memo_visible =  this.get_settings[0].memo_visible == 1 ? true : false
            }

            let title = "設定ファイルの編集/更新"
            return title
        }
    }
}
</script>
<style>
#settings {

}
#settings h3.setting-table-title {
    margin-top: 50px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 50px;
}
#settings table.setting-table {
    width: 560px;    
    margin: 0 auto;
    font-size: 14px;
}
#home .table-wrap table.setting-table tr {
    background-color: unset;    
}
#home .table-wrap table.setting-table tr {
    background-color: unset;    
}
#settings table.setting-table thead tr th.sett-item {
    padding: 10px 0;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px solid #dcdde1;
}
#settings table.setting-table thead tr th.sett-item:nth-child(1) {
    width: 50px;
    min-width: 50px;
}
#settings table.setting-table thead tr th.sett-item:nth-child(2) {
    width: 135px;
    min-width: 135px;
}
#settings table.setting-table thead tr th.sett-item:nth-child(3) {
    width: 75px;
    min-width: 75px;
}
#settings table.setting-table thead tr th.sett-item:nth-child(4) {
    width: 120px;
    min-width: 120px;
}


/* body */
#settings table.setting-table tbody tr td.sett-item {
    height: 55px;
    vertical-align: middle;
}
#settings table.setting-table tbody tr td.sett-item:nth-child(1) {
    font-weight: 500;
}
#settings table.setting-table tbody tr td.sett-item:nth-child(2) {
    text-align: left;
}
#settings table.setting-table tbody tr td.sett-item input.setting-input {
    height: 32px;
    background-color: #2f3542;
    color: white;
    width: 90%;
    padding-left: 10px;
}

#settings .btn-wrap {
    width: 400px;
    margin: auto;
    margin-top: 50px;
}
#settings .btn-wrap button.sett-btn {
    width: 150px;
}


@media screen and (max-width: 600px){
    #settings table.setting-table {
        width: 95%;
        margin: 0 auto;
        font-size: 12px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(1) {
        width: 10%;
        min-width: 10px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(2) {
        width: 30%;
        min-width: 30px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(3) {
        width: 20%;
        min-width: 50px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(4) {
        width: 30%;
        min-width: 30px;
    }

    #settings table.setting-table tbody tr td.sett-item input.setting-input {
        height: 32px;
        background-color: #2f3542;
        color: white;
        width: 95%;
        margin-left: 0;
        padding-left: 10px;
    }
    #settings .btn-wrap {
        width: 85%;
        margin: auto;
        margin-top: 50px;
    }
    #settings .btn-wrap button.sett-btn {
        width: 100px;
        font-size: 12px;
    }
}
</style>