/* eslint-disable */

import throttle from 'lodash/throttle';

export default {
    data() {
        return {
            windowsScreenWidth: null
        }
    },
    computed: {
        isMobile() {
            return this.windowsScreenWidth < 480;
        }
    },
    methods: {
        calculateScreenWidth() {
            this.windowsScreenWidth = window.screen.width;
        }
    },
    mounted() {
        this.calculateScreenWidth();

        window.onresize = throttle(() => {
            this.calculateScreenWidth();
        }, 100);
    }
}