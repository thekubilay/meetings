import axios from "axios";
import {API_HANDLER} from "../config";

export default {
    
    get_settings_from_db(){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
<<<<<<< HEAD
        return axios.get(API_HANDLER.database_api+"setting/read-meeting.php")
=======
        return axios.get(API_HANDLER.database_api+"setting/read.php")
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
    },        

    update_settings_in_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
<<<<<<< HEAD
        return axios.post(API_HANDLER.database_api+"setting/insert-meeting.php", JSON.stringify(payload))
=======
        return axios.post(API_HANDLER.database_api+"setting/insert.php", JSON.stringify(payload))
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
    },


}