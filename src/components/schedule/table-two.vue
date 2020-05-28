<template>
    <table class="schedule-table table-two" v-if="get_setting_load == 2" :style="{border:'2px solid #'+get_settings[0].color_line}">
        <thead>
            <tr>
                <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item">名前</th>
                <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item">行先</th>
                <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item">休日予定</th>
                <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item">帰社日時</th>
                <th :style="{borderRight:'2px solid #'+get_settings[0].color_line, borderBottom:'2px solid #'+get_settings[0].color_line}" class="st-item">備考</th>
            </tr>
        </thead>
        <tbody>
            <app-schedule-items v-for="(schedule, index) in schedules.table_two" :key="index" :schedule="schedule"/>
        </tbody>
    </table>
</template>
<script>
import appScheduleItems from './tb-two-items'
import { mapGetters } from "vuex";
export default {
    props: {
        schedules: Object,
    },
    components: {
        appScheduleItems,
    },
    computed: {
        ...mapGetters([
            "get_settings",
            "get_setting_load",
        ]),
    }
}
</script>