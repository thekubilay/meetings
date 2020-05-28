import memberApi from "../api/members.api";
import { schedule } from "./schedule";
export const member = {
    state: {
        add_member: false,
        users: [],
    },
    mutations: {
        set_add_member(state, add){
            state.add_member = add
        },
        set_users(state, user){
            state.users = user
        },
    },
    getters: {
        get_add_member(state){
            return state.add_member
        },
        get_users(state){
            return state.users
        },
    },
    actions: {
        insert_user({commit, getters, dispatch}, payload){
            memberApi.insert_user_into_db(payload)
            .then(res => {
                let new_user = res.data
                getters.get_users.push(new_user)
                dispatch("load_schedule", {"date":getters.get_selected_date})
            })		
            .catch(err => {
                console.log(err)
            })
        }, 
        insert_new_order_id({commit, dispatch, getters}, payload){
            memberApi.add_order_id(payload)
            .then(res => {
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
            })		
        },
        edit_user_name({commit,getters, dispatch}, payload){
            memberApi.edit_user_name_in_db(payload)
            .then(res => {
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
            })		
        },
        delete_user({commit,dispatch, getters, state}, payload){
            memberApi.delete_user_from_db(payload).then(() => {     
                console.log(getters.get_schedules.length)
                let schedule_list = []
                let empty_rows = []           
                let schedules = []
                getters.get_schedules.forEach(element => {
                    if (element.id != payload.id ) {
                        schedules.push(element)
                    }                    
                });
                schedules.forEach((element,index) => {
                    let new_index = index+1
                    let orders = {
                        "id": element.id,
                        "order_id": new_index
                    }
                    if (element.name != '') {
                        schedule_list.push(orders) 
                    } else {
                        empty_rows.push(orders)
                    }
                });
                dispatch("insert_new_order_id", {"orders":schedule_list})
                dispatch("blank_row_order_id", {"orders":empty_rows})                
                // dispatch("load_schedule", {"date":getters.get_selected_date})          
            })
        },
    
    
        /* 
        * blank rows
        */ 
        add_blank_row({commit, dispatch, getters}, payload) {
            memberApi.add_new_empty_cell(payload)
            .then( () => {
                dispatch("load_schedule", {"date":getters.get_selected_date})             
            }) 
        },
        blank_row_order_id({commit, dispatch, getters}, payload){
            memberApi.edit_empty_row_order_id(payload)
            .then(res => {
                dispatch("load_schedule", {"date":getters.get_selected_date})         
            })
        },
        del_blank_row({commit, dispatch, getters}, payload) {
            memberApi.remove_empty_row(payload)
            .then(res => {
                dispatch("load_schedule", {"date":getters.get_selected_date})          
            })
        },
    }
}