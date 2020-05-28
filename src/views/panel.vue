<template>
    <div id="panel">
        <ul class="panel-nav" v-if="this.$route.name == 'panel'">
            <li class="p-title">管理メニュー</li>
            <router-link class="flex align-ver align-hor p-nav-item" :to="{name:'settings'}"><li>ページ設定</li></router-link>
            <router-link class="flex align-ver align-hor p-nav-item" :to="{name:'home'}"><li>応接予約表</li></router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>
<style>
#panel ul.panel-nav {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
#panel ul.panel-nav li.p-title {
    font-size: 22px;
    font-weight: 500;
    color: #2f3542;
    margin-bottom: 25px;
}
#panel ul.panel-nav a.p-nav-item {
    width: 125px;
    height: 38px;
    font-size: 12px;
    color: #f5f5f5;
    background-color: #2f3542;
    margin-bottom: 15px;
}
#panel ul.panel-nav a.p-nav-item:last-child {
    margin: auto;
    width: 75px;
    height: 32px;
    font-size: 12px;
    color: #2f3542;
    background-color: #ced6e0;
    margin-top: 25px;
}
</style>