import settingApi from "../api/setting.api"

export const setting = {
    state: {
    },
    mutations: {
    },
    getters: {
    },
    actions: {
        update_settings({commit, dispatch, getters}, payload){
            settingApi.update_settings_in_db(payload)
            .then(response => {
                this.commit("set_settings", response.data)
                dispatch("load_setting", {"date":getters.get_selected_date})
            })
        },

    }
}