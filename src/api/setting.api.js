import axios from "axios";
import {API_HANDLER} from "../config";

export default {
    
    get_settings_from_db(){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.get(API_HANDLER.database_api+"setting/read-meeting.php")
    },        

    update_settings_in_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"setting/insert-meeting.php", JSON.stringify(payload))
    },


}