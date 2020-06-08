import axios from "axios";
import {API_HANDLER} from "../config";


export default {
    // meeting
    get_meeting_times_from_db(){
        return axios.get(API_HANDLER.database_api+"meeting/read-time.php")
    },
    get_meeting_contents(payload){
        return axios.post(API_HANDLER.database_api+"meeting/read-content.php", JSON.stringify(payload))
    },
    insert_meeting_into_db(payload){
        return axios.post(API_HANDLER.database_api+"meeting/insert.php", JSON.stringify(payload))
    },
    update_meeting_in_db(payload){
        return axios.post(API_HANDLER.database_api+"meeting/update.php", JSON.stringify(payload))
    },
    delete_meeting_from_db(payload){    
        return axios.post(API_HANDLER.database_api+"meeting/delete.php", JSON.stringify(payload))
    },


}