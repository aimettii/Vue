<template>
    <div id="app">
        <sticky-header></sticky-header>
        <div class="content">
            <div class="actions">
                <span>Количество отображаемых изображений: </span>
                <select class="custom-select" v-model="customCountSlides">
                    <option v-for="(slide, key, index) in slides" :key="index">{{ index + 1 }}</option>
                </select>
            </div>
            <slick class="slider" :options="slickOptions" ref="slick">
                <div v-for="(slide, index) in slides" class="slide" :key="index">
                    <a :href="slide.url" target="_blank">
                        <img :src="slide.img">
                    </a>
                </div>
            </slick>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
    import Slick from 'vue-slick';
    import slides from './lib/slides';
    import isMobile from './mixins/isMobile';
    import StickyHeader from './components/StickyHeader';

    export default {
        name: 'App',
        mixins: [isMobile],
        components: {
            StickyHeader,
            Slick
        },
        data () {
            return {
                slickOptions: {
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    autoplay: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ],
                },
                slides,
            }
        },
        computed: {
            customCountSlides: {
                get() {
                    if(!this.isMobile){
                        return this.slickOptions.slidesToShow;
                    }else{
                        return this.slickOptions.responsive[0].settings.slidesToShow;
                    }
                },
                set(val) {
                    if(!this.isMobile){
                        this.slickOptions.slidesToScroll = Number(val);
                        this.slickOptions.slidesToShow = Number(val);
                    }else{
                        this.slickOptions.responsive[0].settings.slidesToScroll = Number(val);
                        this.slickOptions.responsive[0].settings.slidesToShow = Number(val);
                    }

                    this.reInit();
                }
            }
        },
        methods: {
            reInit() {
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/slick-carousel/slick/slick.css';
    @import '../node_modules/slick-carousel/slick/slick-theme.css';

    *{
        outline: none;
    }

    body{
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0;
        padding: 0;
    }

    .content{
        margin-top: 100px;
        padding: 20px;
        height: 1000px;
    }

    .nav-link {
        /*transition: color .2s linear;*/
    }

    .slider{
        box-shadow: 0 0 10px 5px #0000003b;
    }

    .slide{
        width: 100%;
        height: 50%;
        img{
            width: 100%;
            height: 100%;
        }
    }

    .actions {
        padding-bottom: 50px;
        margin: 0 auto;
        select{
            width: 20%;
        }
    }
</style>
