<template>
    <footer class="flex align-ver align-hor">
        <ul class="flex footer-nav">
            <!-- <router-link class="nav-item" :to="{name:'settings'}" v-if="isAdmin"><li>個別表示設定</li></router-link>
            <router-link class="nav-item" :to="{name:'panel'}" v-if="isAdmin">Admin Panel</router-link>
            <p class="nav-item" @click="logout()">ログアウト</p> -->
            <router-link class="nav-item" :to="{name:'settings'}"><li>個別表示設定</li></router-link>
        </ul>        
    </footer>    
</template>
<script>
import { authenticationService } from "../_services/authentication.service";
import { Role } from "../_helpers/role";
import { router } from "../router";
export default {
    data() {
        return {
            currentUser: null
        };
    },
    created() {
        authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    },
    methods: {
        logout() {
            authenticationService.logout();
            router.push("/login");
        }
    },
    computed: {
        isAdmin() {
            return this.currentUser && this.currentUser.role === Role.Admin;
        }
    }
}
</script>
<style>
footer {
    margin-top: 50px !important;
    height: 100px;
    background-color: #f1f2f6;
    border-top: 2px solid #e9e6e6!important;
}
footer ul.footer-nav a.nav-item {
    display: block;
    margin: 0 15px;
}
footer ul.footer-nav p.nav-item {
    cursor: pointer;
}
</style>