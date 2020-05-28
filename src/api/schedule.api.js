import axios from "axios";
import {API_HANDLER} from "../config";


export default {
    
    get_schedules_from_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+ "schedule/read.php", JSON.stringify(payload))
    },    
    insert_schedule_into_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"schedule/insert.php", JSON.stringify(payload))
    },

}