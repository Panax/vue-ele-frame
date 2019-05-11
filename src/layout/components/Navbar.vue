<template>
<div class="navbar">
    <!-- 头部菜单 -->
    <!-- <el-button @click="topMenuSelect"> </el-button> -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="topMenuSelect">
        <el-menu-item index="1">菜单1</el-menu-item>
        <el-menu-item index="3">菜单2</el-menu-item>
        <el-menu-item index="4">菜单3</el-menu-item>
    </el-menu>
    <!-- 左侧菜单开关 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <!-- 右侧用户信息 -->
    <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img :src="logo" class="user-avatar">
                <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import logoUrl from "@/assets/logo.png"
import {
    mapGetters
} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    data() {
        return {
            activeIndex: '1',
            logo: logoUrl
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar'
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        topMenuSelect() {
            this.$store.dispatch('topmenu/changeTopMenu', {
                name: '',
                group: ''
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 100px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .el-menu--horizontal>.el-menu-item {
        height: 50px;
        line-height: 50px;
    }

    .hamburger-container {
        line-height: 46px;
        // height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
