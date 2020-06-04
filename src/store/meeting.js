import meetingApi from "../api/meeting.api"
import memoApi from "../api/memo.api"
import settingApi from "../api/setting.api"

export const meeting = {
    state: {
        meetings: [],     
        settings: [],
        setting_load: 0,
        selected_date:"",   
        rooms: [
            {type:"room_one", name:"大会議室"},{type:"room_two", name:"応接 1 (6人席)"},{type:"room_three", name:"応接 2 (4人席)"},
            {type:"room_four", name:"応接 3 (4人席)"},{type:"room_five", name:"応接 4 (6人席)"}, {type:"room_six", name:"ブース (4人席)"}
        ],        
        times: ["0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630", "1700", "1730", "1800"],
        reservation: {
            "id": "",
            "room_type": "",
            "old_time": "",
            "start_time":"",
            "finish_time":"",
            "people": "",
            "content": "",
            "in_charge": "",
        },
        add_meeting: false,        
        meeting_load: 0,

        // memo
        memo_reservation: [],
        memo_reservation_obj: {
            "id": "",
            "room_type": "",
        },
        add_memo_reservation: false,
        

    },
    mutations: {
        set_meetings(state, meet){
            state.meetings = meet
        },
        set_schedule_load(state, load){
            state.schedule_load = load
        },
        set_settings(state, setting){
            state.settings = setting
        },
        set_setting_load(state, load){
            state.setting_load = load
        },
        set_selected_date(state, date){
            state.selected_date = date  
        },
        set_times(state, times){
            state.times = times
        },
        set_rooms(state, rooms){
            state.rooms = rooms
        },
        set_reservation(state, res){
            state.reservation = res
        },
        set_reservation_start_time(state, res){
            state.reservation.start_time = res
        },
        set_reservation_finish_time(state, res){
            state.reservation.finish_time = res
        },
        set_reservation_people(state, res){
            state.reservation.people = res
        },
        set_reservation_content(state, res){
            state.reservation.content = res
        },
        set_reservation_in_charge(state, res){
            state.reservation.in_charge = res
        },
        set_meeting_load(state, load){
            state.meeting_load = load
        },
        set_add_meeting(state, add){
            state.add_meeting = add
        },
        set_memo_reservation(state, memo){
            state.memo_reservation = memo
        },
        set_memo_reservation_obj(state, obj){
            state.memo_reservation_obj = obj
        },
        set_add_memo_reservation(state, add){
            state.add_memo_reservation = add
        }
    },
    getters: {
        get_meetings(state){
            return state.meetings
        },
        get_settings(state){
            return state.settings;
        },
        get_setting_load(state){
            return state.setting_load;
        },
        get_selected_date(state){
            return state.selected_date
        },
        get_times(state){
            return state.times
        },
        get_rooms(state){
            return state.rooms
        },
        get_reservation(state){
            return state.reservation
        },
        get_meeting_load(state){
            return state.meeting_load
        },
        get_time_tables(state){
            return state.time_tables
        },
        get_add_meeting(state){
            return state.add_meeting
        },
        get_memo_reservation(state){
            return state.memo_reservation
        },
        get_memo_reservation_obj(state){
            return state.memo_reservation_obj
        },
        get_add_memo_reservation(state){
            return state.add_memo_reservation
        }

    },
    actions: {
        load_meeting({commit}, payload){
            this.commit("set_meeting_load", 1)
            meetingApi.get_meeting_from_db(payload)
            .then(response => {
                this.commit("set_meetings", response.data)
                this.commit("set_meeting_load", 2)
            })
            .catch(err => {
                console.log(err)
                this.commit("set_meeting_load", 3)
            })
        },
        insert_meeting({commit, dispatch, getters}, payload){
            meetingApi.insert_meeting_into_db(payload)
            .then(response => {
                console.log(response)
                dispatch("load_meeting", {"date":getters.get_selected_date})
            })
            .catch(err => {
                this.commit("set_meeting_load", 3)
                console.log(err)
            })
        },
        delete_meeting({commit, dispatch, getters}, payload){
            meetingApi.delete_meeting_from_db(payload)
            .then(response => {
                dispatch("load_meeting", {"date":getters.get_selected_date})
            })
            .catch(err => {
                this.commit("set_meeting_load", 3)
                console.log(err)
            })
        },

        // setting
        load_setting(){
            this.commit("set_setting_load", 1)
            settingApi.get_settings_from_db()
            .then(response => {
                this.commit("set_settings", response.data)
                this.commit("set_setting_load", 2)
            })
            .catch(err => {
                console.log(err)
                this.commit("set_setting_load", 3)
            })
        },


        // // reservation memo
        load_reservation_memo({commit}, payload){
            memoApi.get_reservation_memo_from_db(payload)
            .then(response => {
                this.commit("set_memo_reservation", response.data)
            })
            .catch(err => {
                console.log(err)
                this.commit("set_meeting_load", 3)
            })
        },
        insert_reservation_memo({commit, dispatch, getters}, payload){
            memoApi.insert_reservation_memo_into_db(payload)
            .then(response => {
                dispatch("load_reservation_memo", {"date":getters.get_selected_date})
            })
            .catch(err => {
                this.commit("set_meeting_load", 3)
                console.log(err)
            })
        },


    }
}