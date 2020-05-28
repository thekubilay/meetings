<template>
    <footer class="flex align-ver align-hor">
        <ul class="flex footer-nav">
            <router-link class="nav-item" :to="{name:'settings'}"><li>個別表示設定</li></router-link>
            <router-link class="nav-item" :to="{name:'panel'}">Admin Panel</router-link>
        </ul>        
    </footer>    
</template>
<style>
footer {
    margin-top: 50px !important;
    height: 100px;
    background-color: #f1f2f6;
    border-top: 2px solid #e9e6e6!important;
}
footer ul.footer-nav a.nav-item  {
    display: block;
    margin: 0 15px;
}
</style>