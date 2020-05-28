
import scheduleApi from "../api/schedule.api"
import settingApi from "../api/setting.api"
import memoApi from "../api/memo.api"
export const schedule = {
    state: {
        schedules:[],
        schedule_load: 0,
        settings: [],
        setting_load: 0,
        selected_date:"",
        memo:[],
        memo_load: 0,
        add_schedule: false,
        add_memo: false,
        schedule_user_id: "",            
        


    },
    mutations: {
        set_schedules(state, schedule){
            state.schedules = schedule
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
        set_memo(state, memo){
            state.memo = memo
        },
        set_memo_load(state, load){
            state.memo_load = load
        },
        set_add_schedule(state, add){
            state.add_schedule = add
        },
        set_add_memo(state, add){
            state.add_memo = add  
        },
        set_schedule_user_id(state, id){
            state.schedule_user_id = id
        },

    },
    getters:{
        get_schedules(state){
            return state.schedules;
        },
        get_schedule_load(state){
            return state.schedule_load;
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
        get_memo(state){
            return state.memo 
        },
        get_memo_load(state){
            return state.memo_load
        },
        get_add_schedule(state){
            return state.add_schedule
        },
        get_add_memo(state){
            return state.add_memo
        },
        get_schedule_user_id(state){
            return state.schedule_user_id
        },

    },
    actions: {
        /* 
        * blank rows
        */         
        load_schedule({commit}, payload){
            this.commit("set_schedule_load", 1)
            scheduleApi.get_schedules_from_db(payload)
            .then(response => {
                response.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = response.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                ordered.forEach((element, index) => {
                    element.order_id = index
                });
                this.commit("set_schedules", ordered)
                this.commit("set_schedule_load", 2)
            })
            .catch(err => {
                console.log(err)
                this.commit("set_schedule_load", 3)
            })
        },
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
        load_memo({commit}, payload){
            this.commit("set_memo_load", 1)
            memoApi.get_memo_from_db(payload)
            .then(response => {
                this.commit("set_memo", response.data)
                this.commit("set_memo_load", 2)
            })
            .catch(err => {
                console.log(err)
                this.commit("set_memo_load", 3)
            })
        },
        insert_memo({commit}, payload){
            memoApi.insert_memos_into_db(payload)
            .then(response => {
				this.commit("set_memo", response.data)
            })			
        },
        insert_schedule({commit, dispatch, getters}, payload) {
            scheduleApi.insert_schedule_into_db(payload)
            .then(response => {
                this.commit("set_schedules", response.data)
                dispatch("load_schedule", {"date":getters.get_selected_date})
            })
        },

    }
}