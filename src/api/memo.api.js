import axios from "axios";
import {API_HANDLER} from "../config";

export default {    
    get_reservation_memo_from_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
<<<<<<< HEAD
        return axios.post(API_HANDLER.database_api+"memo/read-reservation.php", JSON.stringify(payload))
    },
    insert_reservation_memo_into_db(payload){
=======
        return axios.post(API_HANDLER.database_api+"memo/read.php", JSON.stringify(payload))
    },        
    insert_memos_into_db(payload){
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
<<<<<<< HEAD
        return axios.post(API_HANDLER.database_api+"memo/insert-reservation.php", JSON.stringify(payload))
=======
        return axios.post(API_HANDLER.database_api+"memo/insert.php", JSON.stringify(payload))
>>>>>>> 9e0524991420b02f6fe4404a03033f413ff2ffd4
    },

}