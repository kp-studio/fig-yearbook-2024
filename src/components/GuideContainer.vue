<template>
	<transition name="contents-fade">
		<div id="guide-container">         
			<div id="guide-page">
				<div class="guide-title">
						<h4>User Guide</h4>
				</div>
				<ul class="guide-items">
					<li>
							<div>
									<feather-icon icon="play" class="guide-icons guide-navigation-prev" />
									<feather-icon icon="play" v-if="isMobile && !(sectionIndices.length == 0)" class="guide-icons guide-navigation-down" />
									<feather-icon icon="play" class="guide-icons guide-navigation-next" />
							</div>
							<p v-if="isMobile">Navigate using the arrows or by swiping</p>
							<p v-else>Navigate using arrows, your keyboard or by dragging the page</p>
					</li>
					<li v-if="zoomNavEnabled">
							<feather-icon icon="zoom-in" class="guide-icons" />
							<p>Zoom in and out</p>
					</li>
					<li v-if="searchEnabled">
							<feather-icon icon="search" class="guide-icons" />
							<p>Search for words or phrases</p>
					</li>
					<li v-if="languagesEnabled">
							<feather-icon icon="globe" class="guide-icons" />
							<p>Change language</p>
					</li>
					<li v-if="downloadEnabled">
							<feather-icon icon="download" class="guide-icons" />
							<p>Download PDF</p>
					</li>
					<li v-if="printEnabled">
							<feather-icon icon="printer" class="guide-icons" />
							<p>Print PDF</p>
					</li>
					<li v-if="contentsEnabled">
							<feather-icon icon="grid" class="guide-icons" />
							<p>Content navigation</p>
					</li>
					<li v-if="fullscreenEnabled">
							<feather-icon icon="maximize-2" class="guide-icons" />
							<p>Toggle fullscreen</p>
					</li>
					<li>
							<svg class="galleries" viewBox="0 0 160.62 157.733" enable-background="new 0 0 160.62 157.733">
									<g>
											<path fill="#000" d="M81.691,67.001c7.996,0,14.477,6.481,14.477,14.477s-6.481,14.477-14.477,14.477
											c-7.995,0-14.476-6.482-14.476-14.477S73.697,67.001,81.691,67.001z"/>
											<path fill="#000" d="M124.263,52.933h-23.92l-0.716-5.581c0-3.189-2.585-5.774-5.774-5.774H69.218
											c-3.188,0-5.773,2.585-5.773,5.774l-0.716,5.581H39.001c-2.126,0-3.85,1.627-3.85,3.753v49.656c0,2.126,1.724,3.945,3.85,3.945
											h85.262c2.125,0,3.849-1.819,3.849-3.945V56.686C128.112,54.56,126.388,52.933,124.263,52.933z M81.65,105.2
											c-13.074,0-23.672-10.599-23.672-23.672S68.576,57.856,81.65,57.856s23.672,10.598,23.672,23.671S94.724,105.2,81.65,105.2z
											M123.685,63.134h-20.209v-5.966h20.209V63.134z"/>
									</g>
									<g>
											<path fill="#000" d="M154.856,78.867h-5.764c-0.001,9.313-1.884,18.156-5.29,26.209c-5.107,12.077-13.654,22.371-24.404,29.633
											c-5.375,3.631-11.298,6.504-17.62,8.47s-13.041,3.026-20.026,3.027c-9.314-0.001-18.156-1.884-26.21-5.29
											c-12.077-5.107-22.371-13.653-29.632-24.404c-3.631-5.375-6.504-11.298-8.471-17.62c-1.966-6.322-3.026-13.041-3.026-20.026
											c0.001-9.314,1.884-18.157,5.29-26.21C24.81,40.58,33.357,30.286,44.107,23.024c5.375-3.631,11.298-6.504,17.619-8.471
											c6.322-1.966,13.041-3.026,20.027-3.026c9.313,0,18.156,1.884,26.209,5.29c12.077,5.107,22.371,13.653,29.632,24.404
											c3.631,5.375,6.504,11.298,8.471,17.619c1.966,6.322,3.026,13.041,3.026,20.027H154.856h5.764c0.001-10.874-2.207-21.262-6.2-30.7
											c-5.991-14.161-15.983-26.191-28.567-34.694c-6.292-4.251-13.235-7.62-20.649-9.926C97.791,1.241,89.907,0,81.753,0
											C70.88-0.001,60.491,2.207,51.052,6.2c-14.161,5.991-26.19,15.983-34.693,28.567c-4.251,6.292-7.62,13.235-9.926,20.648
											c-2.306,7.413-3.547,15.296-3.546,23.451c-0.001,10.873,2.207,21.262,6.2,30.7c5.991,14.161,15.983,26.191,28.567,34.694
											c6.292,4.251,13.235,7.62,20.648,9.926c7.413,2.306,15.296,3.547,23.451,3.546c10.874,0.001,21.262-2.207,30.7-6.2
											c14.161-5.991,26.191-15.984,34.694-28.568c4.251-6.292,7.621-13.235,9.926-20.648c2.306-7.413,3.547-15.296,3.547-23.45H154.856
											L154.856,78.867z"/>
									</g>
							</svg>
							<p>Image gallery</p>
					</li>
					<li>                           
							<svg class="galleries" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="675px" height="675px" viewBox="0 0 675 675" enable-background="new 0 0 675 675" xml:space="preserve">
									<circle fill="none" stroke="#000" stroke-width="30" stroke-miterlimit="10" cx="339.195" cy="340" r="321"/>
									<polyline fill="#000" points="558,356 207,563 207,117 "/>
							</svg>
							<p>Video</p>
					</li>
					
					<li v-if="guideEnabled">
							<feather-icon icon="help-circle" class="guide-icons" />
							<p>User guide</p>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import FeatherIcon from "./FeatherIcon.vue"

export default {
    name: 'guide',
    components: {
        FeatherIcon,
    },
    computed: {
        ...mapState({
            sectionIndices: state => state.sectionIndices,
        }),
        ...mapGetters([
            "readerEnabled",
            "zoomNavEnabled",
            "contentsEnabled",
            "searchEnabled",
            "languagesEnabled",
            "downloadEnabled",
            "guideEnabled",
            "printEnabled",
            "isMobile",
            "fullscreenEnabled",
        ])
    }
}

</script>

<style>

    #guide-page h4 {
        color:#000;
        text-align: center;
        font-size:2em;
        margin-bottom:0.3em;
        margin-top:0.8em;
        }

    #guide-page p {
        color:#000;
        font-size:1em;
        margin-top:0.8em;
    }

    #guide-container {
        position: absolute;
        top:48px;
        left:0px;
        width:100%;
        height: calc(100% - 48px);
        background-color:#2D2C2D;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #guide-page {
        width:70%;
        min-height:80%;
        margin:auto;
        background-color:#fff;
        padding:20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size:0.95em;
    }
    .guide-icons>svg, .galleries {
        height:3em;
        width:2.6em;
        color: #2D2C2D
    }

    .guide-navigation-prev>svg {
        transform: rotate(180deg);
    }
    .guide-navigation-up>svg {
        transform: rotate(270deg);
    }
    .guide-navigation-down>svg {
        transform: rotate(90deg);
    }

    #guide-page ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        flex: 1;
        padding-left:0;
        max-width: 1060px;
    }

    #guide-page li {
        padding: 10px 10px;
        width:30%;
        margin: 0 1.5%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .guide-galleries {
        position:absolute;
        right:10px;
        bottom:0;
        height:50%;
        width:50%;
        padding:10px;
        text-align: center;
    }

    /* MEDIA */

    @media only screen and (min-width:1025px) and (max-width:1470px) {

    }

    @media only screen and (max-width: 1024px){      
        #guide-page{
            font-size:0.8em
        }
        #guide-page li {
            padding: 10px 0px;
        }
    }

    @media only screen and (max-width:767px) {
        #guide-page{
            font-size:0.7em;
            width:90%;
        }
        #guide-page h4{
            font-size:2em;
        }
        #guide-page li{
            padding: 5px 0;
        }
    }
    @media only screen and (max-width:600px) {
        #guide-page .guide-title{
            display: none;
        }
        #guide-page{
            padding-top:0;
            padding-bottom:0;
        }
    }

    @media only screen and (max-height:600px) {
        #guide-page .guide-title{
            display: none;
        }
        #guide-page{
            padding-top:0;
            padding-bottom:0;
        }
        #guide-page p{
            margin-top:0.3em;
        }
    }


    @media only screen and (max-width:400px) {
        #guide-page{
            font-size:0.6em;
        }
        #guide-page li{
            width:50%;
            margin:0;
        }
    }

</style>