<template>
    <div class="popup-bg">
        <div class="blurred"></div>
        <div class="popup-frame meeting-frame">
            <div @click="close_add_box()" class="flex align-ver align-hor close pointer"><i class="fas fa-times"></i></div>
            <h3 class="popup-frame-title">使用予定入力フォーム</h3>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">使用年月日</p>
                <p>{{selected_date}}</p>
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">会議室</p>
                <div class="flex align-ver selects">
                    <select class="room-select" v-model="get_reservation.room_type">
                        <option v-for="(item, index) in get_rooms" :key="index" :value="item.type">{{item.name}}</option>
                    </select> 
                </div>
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">時間</p>
                <div class="flex align-ver selects">
                    <select class="time-select" v-model="set_start_time">
                        <option v-for="(item, index) in get_times" :key="index" :value="item">{{item.match(/../g).join(':')}}</option>
                    </select> 
                    から
                    <select class="time-select" name="" v-model="set_finish_time">
                        <option v-for="(item, index) in time_after" :key="index" :value="item">{{item.match(/../g).join(':')}}</option>
                    </select> 
                </div>
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">人数</p>
                <input class="column-input" v-model="set_people" type="text">
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">物件(内容)</p>
                <input class="column-input content-input" maxlength="15" v-model="set_content" type="text">
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">担当者</p>
                <input class="column-input" maxlength="15" v-model="set_in_charge" type="text">
            </div>
            <p class="err-txt" v-if="err != ''">{{err}}</p>
            <div class="flex between btn-wrap">
                <button @click="insert_meeting(1)" class="btn schedule-btn">使用予定登録</button>
                <button @click="insert_meeting(2)" class="btn red-bg">予定削除</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {    
            err: "",
            finish_time: "",
            people: "",
            content: "",
            in_charge: "",
            check: true,
        }
    },
    methods: {
        close_add_box(){
            this.$store.state.meeting.add_meeting = false
            this.$store.state.meeting.reservation.id = ""
            this.$store.state.meeting.reservation.old_time = ""
            this.$store.state.meeting.reservation.start_time = ""
            this.$store.state.meeting.reservation.finish_time = ""
            this.$store.state.meeting.reservation.people = ""
            this.$store.state.meeting.reservation.content = ""
            this.$store.state.meeting.reservation.in_charge = ""
            this.$store.state.meeting.reservation.room_type = ""
        },
        insert_meeting(btn_type){
            if (btn_type == 1) {
                if (this.get_reservation.finish_time == "" || this.get_reservation.content == "" || this.get_reservation.in_charge == "") {
                    this.err = "空のセルを入力してください。"
                } else {     

                    // checks for if there is colliding meeting in
                    if (this.get_reservation.id == "") {
                        this.get_meetings.forEach(item => {
                            if ((item.room_type == this.get_reservation.room_type) && (this.get_reservation.finish_time >= item.time && this.get_reservation.finish_time <= item.finish_time)) {                                
                                this.err = "終了時間は次の会議の始まる時間に突き当たる"
                                this.check = false
                            } else {
                                this.check = true
                            } 
                        });
                        if (this.check == true) {
                            this.$store.state.meeting.add_meeting = false
                            let payload =  {
                                "id": this.get_reservation.id,
                                "old_time": this.get_reservation.old_time,
                                "start_time": this.get_reservation.start_time,
                                "finish_time": this.get_reservation.finish_time,
                                "people": this.get_reservation.people == "" ? null : this.get_reservation.people,
                                "content": this.get_reservation.content,
                                "in_charge": this.get_reservation.in_charge,
                                "room_type": this.get_reservation.room_type,
                                "created_at": this.get_selected_date,
                            }
                            this.$store.dispatch("insert_meeting", payload)
                            this.$store.state.meeting.reservation.id = ""
                            this.$store.state.meeting.reservation.old_time = ""
                            this.$store.state.meeting.reservation.start_time = ""
                            this.$store.state.meeting.reservation.finish_time = ""
                            this.$store.state.meeting.reservation.people = ""
                            this.$store.state.meeting.reservation.content = ""
                            this.$store.state.meeting.reservation.in_charge = ""
                            this.$store.state.meeting.reservation.room_type = ""
                        }                      
                    } else {
                        this.get_meetings.forEach(item => {
                            if ((item.id != this.get_reservation.id) && (item.room_type == this.get_reservation.room_type) && (this.get_reservation.finish_time >= item.time && this.get_reservation.finish_time <= item.set_finish_time)) {
                                this.err = "終了時間は次の会議の始まる時間に突き当たる"
                                this.check = false
                            } else {
                                this.check = true
                            } 
                        });
                        if (this.check == true) {
                            this.$store.state.meeting.add_meeting = false
                            let payload =  {
                                "id": this.get_reservation.id,
                                "old_time": this.get_reservation.old_time,
                                "start_time": this.get_reservation.start_time,
                                "finish_time": this.get_reservation.finish_time,
                                "people": this.get_reservation.people == "" ? null : this.get_reservation.people,
                                "content": this.get_reservation.content,
                                "in_charge": this.get_reservation.in_charge,
                                "room_type": this.get_reservation.room_type,
                                "created_at": this.get_selected_date,
                            }
                            this.$store.dispatch("insert_meeting", payload)
                            this.$store.state.meeting.reservation.id = ""
                            this.$store.state.meeting.reservation.old_time = ""
                            this.$store.state.meeting.reservation.start_time = ""
                            this.$store.state.meeting.reservation.finish_time = ""
                            this.$store.state.meeting.reservation.people = ""
                            this.$store.state.meeting.reservation.content = ""
                            this.$store.state.meeting.reservation.in_charge = ""
                            this.$store.state.meeting.reservation.room_type = ""
                        }  
                    }

                    
                                        
                }

            } else if(btn_type == 2){
                this.$store.state.meeting.add_meeting = false
                let payload =  {
                    "id": this.get_reservation.id,                   
                }
                this.$store.dispatch("delete_meeting", payload)
                this.$store.state.meeting.reservation.id = ""
                this.$store.state.meeting.reservation.old_time = ""
                this.$store.state.meeting.reservation.start_time = ""
                this.$store.state.meeting.reservation.finish_time = ""
                this.$store.state.meeting.reservation.people = ""
                this.$store.state.meeting.reservation.content = ""
                this.$store.state.meeting.reservation.in_charge = ""
                this.$store.state.meeting.reservation.room_type = ""
            }
        }
    },
    computed: {
        ...mapGetters([
            "get_meetings",
            "get_times",
            "get_rooms",
            "get_selected_date",
            "get_reservation",
            "get_settings",
            "get_setting_load"
        ]),
        selected_date(){
            let year = this.get_selected_date.slice(0,4)
            let month = this.get_selected_date.slice(5,7)
            let day = this.get_selected_date.slice(8,11)
            let date = new Date(this.get_selected_date)
            let dayof = date.getDay()
            switch (dayof) {
                case 0:
                    dayof = "日"
                    break;
                case 1:
                    dayof = "月"
                    break; 
                case 2:
                    dayof = "火"
                    break;                     
                case 3:
                    dayof = "水"
                    break;
                case 4:
                    dayof = "木"
                    break;            
                case 5:
                    dayof = "金"
                    break;            
                case 6:
                    dayof = "土"
                    break;            
                default:
                    break;
            }

            
            return year+"年"+month+"月"+day+"日"+ " " +dayof+"曜日"
        },
        time_after(){
            let times_arr = []
            this.get_times.forEach(element => {
                if (element > this.get_reservation.start_time) {
                    times_arr.push(element.toString())
                }
            });

            return times_arr 
        },
        set_start_time: {
            set(val){
                this.$store.state.meeting.reservation.start_time = val
            },
            get(){
                return this.$store.state.meeting.reservation.start_time
            }
        },
        set_finish_time: {
            set(val){
                this.$store.commit("set_reservation_finish_time", val)
            },
            get(){
                return this.$store.state.meeting.reservation.finish_time
            }
        },
        set_people: {
            set(val){
                this.$store.commit("set_reservation_people", val)
            },
            get(){
                return this.$store.state.meeting.reservation.people
            }
        },
        set_content: {
            set(val){
                this.$store.commit("set_reservation_content", val)
            },
            get(){
                return this.$store.state.meeting.reservation.content
            }
        },
        set_in_charge: {
            set(val){
                this.$store.commit("set_reservation_in_charge", val)
            },
            get(){
                return this.$store.state.meeting.reservation.in_charge
            }
        }
    }
}
</script>
<style>
.popup-bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: .3s ease;
    position: fixed;
}
.popup-bg .blurred {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.308);
}

.popup-bg .popup-frame {
    top: 45%;
    left: 50%;
    transform: translate(-50%,-42%);
    width: 400px;
    z-index: 11;
    background-color: #fff;
    padding: 25px;
    position: fixed;
}
.popup-bg .popup-frame h3.popup-frame-title {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 500;
}
.popup-bg .popup-frame div.close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    background-color: white;
    box-shadow: 0 2px 56px -9px rgba(0,0,0,.75);
}
.popup-bg .popup-frame div.close .fa-times {
    font-size: 22px;
}


.popup-bg .popup-frame input,button {
    display: block;
}
.popup-bg .popup-frame input {
    border-radius: 0;
    width: 100%;
    height: 32px;
    padding-left: 10px;
    margin-bottom: 15px;
}
.popup-bg .popup-frame button.popup-btn {
    transform: translateY(3px);
    outline: 0;
    border: 0;
    margin-top: 15px;
    display: block;
    margin: auto;
    width: 75%;
    min-width: 125px;
    height: 38px;
    font-size: 14px;
    color: #f5f5f5;
    background-color: #2f3542;
}

.popup-bg .popup-frame textarea {
    width: 100%;
    font-size: 14px;
    margin-bottom: 15px;
    padding: 10px;
}
.popup-bg .meeting-frame .box-row{
    margin-bottom: 10px;
}
.popup-bg .meeting-frame .box-row p.column-title {
    width: 100px;
    min-width: 100px;
    color: white;
    margin-right: 15px;    
    text-align: center;
    background-color: #60687a;
    font-size: 14px;
    height: 32px;
}
.popup-bg .meeting-frame .box-row p.time-txt {
    margin-right: 10px;
}
.popup-bg .meeting-frame .box-row select.room-select {
    height: 32px;
}
.popup-bg .meeting-frame .box-row select.time-select {
    margin-right: 10px;
    height: 32px;
}
.popup-bg .meeting-frame .box-row select.time-select:last-child {
    margin-left: 10px;
    margin-right: 0;
    height: 32px;
}
.popup-bg .meeting-frame .box-row input.column-input {
    margin-bottom: 0;
    width: 75px;
}
.popup-bg .meeting-frame .box-row input.content-input {
    margin-bottom: 0;
    width: 100%;
}

.popup-bg .meeting-frame .btn-wrap {
    margin: auto;
    margin-top: 25px;
    width: 85%;
}
.popup-bg .meeting-frame .btn-wrap .red-bg, .btn {
    width: 40%;
    height: 38px;
    color: white;    
}
.popup-bg .meeting-frame .btn-wrap .red-bg {
    background-color: red;
}

.err-txt {
    font-weight: 500;
    margin: 20px 0 10px 0;
    text-align: center;
    color: red;
}

@media screen and (max-width: 414px){
    .popup-bg .meeting-frame {
        width: 355px;
    }
}
@media screen and (max-width: 375px){
    .popup-bg .meeting-frame {
        width: 325px;
    }
}

</style>