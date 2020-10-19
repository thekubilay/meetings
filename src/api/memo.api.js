import axios from "axios";
import {API_HANDLER} from "../config";

export default {    
    get_reservation_memo_from_db(payload){
        const username = "pj-room"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"memo/read-reservation.php", JSON.stringify(payload))
    },
    insert_reservation_memo_into_db(payload){
        const username = "pj-room"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"memo/insert-reservation.php", JSON.stringify(payload))
    },

}