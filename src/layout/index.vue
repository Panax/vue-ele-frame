<template>
<div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
            <navbar />
        </div>
        <app-main />
    </div>
</div>
</template>

<script>
import {
    Navbar,
    Sidebar,
    AppMain
} from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        fixedHeader() {
            return this.$store.state.settings.fixedHeader
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', {
                withoutAnimation: false
            })
        }
    },
    mounted() {
        let self = this;
        let loginTimeOut = self.$store.state.settings.loginTimeOut;
        let lastTime = localStorage.getItem('lastRequestTime');
        let currentTime;
        let interval;

        function checkTimeout() {
            currentTime = new Date().getTime();
            if (currentTime - lastTime > loginTimeOut && getToken()) {
                // 清理定时器
                clearInterval(interval);
                // 清理token
                removeToken();
                self.$alert('您的登录信息已过期，请重新登录...', '登录超时', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }).then(() => {
                    self.$store.dispatch('user/resetToken').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                });
            }
        }

        interval = window.setInterval(checkTimeout, 1000);
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}

.mobile .fixed-header {
    width: 100%;
}
</style>
