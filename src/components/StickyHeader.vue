<template>
    <div class="header" :class="{'is-sticky': isSticky}" ref="header">
        <ul class="nav justify-content-center">
            <li v-for="(nav, index) in navs" class="nav-item" :key="index">
                <a class="nav-link" :href="nav[1]">{{ nav[0] }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
    import throttle from 'lodash/throttle';

    export default {
        name: "StickyHeader",
        data() {
            return {
                isSticky: false
            }
        },
        computed: {
            navs() {
                return [
                    ['Home', '#'],
                    ['About Us', '#'],
                    ['Contact Us', '#'],
                ]
            },
        },
        methods: {
            onScroll() {
                if (window.pageYOffset > 0) {
                    this.isSticky = true;
                } else {
                    this.isSticky = false;
                }
            },
        },
        mounted() {
            window.onscroll = throttle(() => {
                this.onScroll();
            }, 100);
        }
    }
</script>

<style lang="scss">
    .header {
        padding: 20px;
        border-bottom: 1px solid #c5c5c5;
        transition-property: background, box-shadow;
        transition-duration: .3s;
        transition-timing-function: linear;
        background: #fff;
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 10;
        &.is-sticky {
            box-shadow: 0 0 5px 3px #0000004f;
            background: #2f3d4c;
            .nav-link {
                color: #fff;
                &:hover{
                    opacity: .7;
                }
            }
        }
    }
</style>