<template>
    <div id="meeting">
        <app-header />
        <div class="flex align-hor rooms">
            <app-meeting-one />
            <app-meeting-two />
            <app-meeting-tri />
            <app-meeting-for />
            <app-meeting-fiv />
            <app-meeting-six />
        </div>
        <app-add-meeting v-if="get_add_meeting == true" />
        <app-add-memo v-if="get_add_memo_reservation == true" />
    </div>
</template>
<script>
import appHeader from "../components/header"
import appMeetingOne from '../components/meeting/meeting-room-1'
import appMeetingTwo from '../components/meeting/meeting-room-2'
import appMeetingTri from '../components/meeting/meeting-room-3'
import appMeetingFor from '../components/meeting/meeting-room-4'
import appMeetingFiv from '../components/meeting/meeting-room-5'
import appMeetingSix from '../components/meeting/meeting-room-6'
import appAddMeeting from "../components/adds/add-meeting"
import appAddMemo from "../components/adds/add-reservation-memo"
import { mapGetters } from 'vuex'
export default {
    components: {
        appHeader,
        appMeetingOne,
        appMeetingTwo,
        appMeetingTri,
        appMeetingFor,
        appMeetingFiv,
        appMeetingSix,
        appAddMeeting,
        appAddMemo,
    },
    computed: {
        ...mapGetters([
            "get_add_meeting",
            "get_add_memo_reservation",
        ])
    }
}
</script>
<style>
#meeting {
    margin-top: 35px;
    /* overflow-x: scroll; */
}
#meeting .rooms {
    margin: auto;
    justify-content: flex-start;
    margin-top: 50px;
    width: 1920px;
}
@media (max-width: 767px) {
    #meeting .rooms {
    width: 1500px;
}
}
</style>