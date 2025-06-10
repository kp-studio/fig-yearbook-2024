<template>
  <header class="nav-bar">
    <div class="nav-bar__container">
      <div class="nav-bar__logo">
        <img class="nav-bar__logo-image" :src="companyLogo" :alt="companyName" />
      </div>
      <div class="nav-bar__text">
        <span class="nav-bar__title">{{ title }}</span>
        <span class="nav-bar__divider" v-if="page"><feather-icon :icon="divider"/></span>
        <span class="nav-bar__page" v-if="page">{{ page }}</span>
      </div>
      <p v-if="(readerEnabled && !(isMobile)) && currentMobilePage && !isReader" class="nav-bar__reader" @click="toggleReader">Reader is available</p>
      <p v-if="(readerEnabled && !(isMobile)) && currentMobilePage && isReader" class="nav-bar__reader" @click="toggleReader">Return to magazine</p>
      <nav class="nav-bar__links">
        <ul>
          <template v-if="!((isMobile && mobileSwitch) || isReader)">
            <li v-if="zoomScrollEnabled" class="nav-bar__link nav-bar__zoom-slider">
              <vue-slider ref="zoomSlider" :min="1" :max="2" :interval="0.01" :tooltip-placement="'bottom'" v-model="zoomValue" v-on:change="updateSliderZoom()" @click="slideZoom"/>
            </li>
            <li v-if="guideEnabled" class="nav-bar__link" @click="toggleGuide" :class="{'nav-bar__link--active': showGuide}">
              <feather-icon icon="help-circle" @click="toggleGuide"/>
            </li>
            <li v-if="(zoomNavEnabled && (!isMobile))" class="nav-bar__link" @click="toggleZoom" :class="{'nav-bar__link--active': isZoomed}">
              <feather-icon icon="zoom-in" @click="toggleZoom"/>
            </li> 
            <li v-if="searchEnabled" class="nav-bar__link" @click="toggleSearch" :class="{'nav-bar__link--active': showSearch}">
              <feather-icon icon="search" />
            </li>
            <li v-if="languagesEnabled" class="nav-bar__link" @click="toggleLanguages" :class="{'nav-bar__link--active': showLanguages}">
              <feather-icon icon="globe"/>
              <languages-panel v-show="showLanguages" />
            </li>
            <li v-if="editionsEnabled" class="nav-bar__link" @click="toggleEditions" :class="{'nav-bar__link--active': showEditions}">
              <feather-icon icon="book"/>
              <editions-panel v-show="showEditions" />
           </li>
            <li v-if="downloadEnabled" class="nav-bar__link">
              <a :href="downloadPath" target="_blank" download><feather-icon icon="download"/></a>
            </li>
            <li v-if="printEnabled" class="nav-bar__link">
              <feather-icon icon="printer"/>
            </li>
          </template>
          <li v-if="contentsEnabled && contentsPinned" class="nav-bar__link hidden-large" @click="toggleContents" :class="{'nav-bar__link--active': showContents}"></li>
          <li v-else-if="contentsEnabled" class="nav-bar__link" @click="toggleContents" :class="{'nav-bar__link--active': showContents}">
            <feather-icon icon="grid" />
          </li>
          <li v-if="fullscreenEnabled && !isMobile" @click="toggleFullscreen" class="nav-bar__link">
            <feather-icon icon="maximize"/>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex"
import FeatherIcon from "./FeatherIcon.vue"
import LanguagesPanel from "./LanguagesPanel.vue"
import EditionsPanel from "./EditionsPanel.vue"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'

export default {
  data(){
    return {
        editions: [],
        zoomValue: 1,
      }
  },
  props: ["logoURL", "title", "page", "companyName", "width"],
  components: {
    FeatherIcon,
    LanguagesPanel,
    EditionsPanel,
    VueSlider,
  },
  computed: {
    ...mapState({
      isReader: state => state.isReader,
      //   showLanguages: state => state.languages.showLanguages,
      //   showSearch: state => state.search.showSearch,
      //   isZoomed: state => state.zoom.isZoomed,
    }),
    ...mapGetters([
      "readerEnabled",
      "zoomNavEnabled",
      "contentsEnabled",
      "contentsPinned",
      "searchEnabled",
      "languagesEnabled",
      "editionsEnabled",
      "downloadEnabled",
      "guideEnabled",
      "printEnabled",
      "rightToLeft",
      "companyLogo",
      "downloadPath",
      "showContents",
      "showLanguages",
      "showEditions",
      "showSearch",
      "showGuide",
      "isZoomed",
      "isMobile",
      "mobileSwitch",
      "currentMobilePage",
      "fullscreenEnabled",
      "zoomScrollEnabled",
    ]),
    divider() {
      if (this.rightToLeft) return "chevron-left"
      return "chevron-right"
    },
  },
  mounted(){
    this.loadEditionsScript()
  },
  methods: {
    ...mapMutations({
      toggleContents: "TOGGLE_CONTENTS",
      toggleLanguages: "TOGGLE_LANGUAGES",
      toggleEditions: "TOGGLE_EDITIONS",
      toggleZoom: "TOGGLE_ZOOM",
      slideZoom: "SLIDE_ZOOM",
      toggleSearch: "TOGGLE_SEARCH",
      toggleGuide: "TOGGLE_GUIDE",
      toggleReader: "TOGGLE_READER",
      toggleFullscreen: "TOGGLE_FULLSCREEN",
    }),

    loadEditionsScript() {
      var editionsJson = document.createElement('script')
      editionsJson.setAttribute('src', 'https://touchline-uefa.s3-eu-west-1.amazonaws.com/editions.js')
      document.head.appendChild(editionsJson)
      this.editions = editionsJson
    },

    updateSliderZoom() {
      Publish.$store.commit("SLIDE_ZOOM", {zoomValue: this.zoomValue})
    }
  },
}
</script>

<style>
.nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  text-align: left;
  height: 48px;
  background-color: rgba(91, 71, 88, 1);
  color: white;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.nav-bar__container {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  max-width: 100vw;
  margin: auto;
}

.nav-bar__logo {
  display: inline-block;
  vertical-align: middle;
  height: 60%;
  margin-right: 10px;
  margin-left: 10px;
}

.nav-bar__logo-image {
  max-height: 100%;
  max-width: calc(100vw - 250px);
}

.nav-bar__divider svg {
  position: relative;
  top: 2px;
  pointer-events: inherit;
}

.nav-bar__link svg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  pointer-events: inherit;
}

.nav-bar__links ul {
  margin: 0;
  padding: 0;
  height: 100%;
}

.nav-bar__links {
  float: right;
  cursor: pointer;
  height: 100%;
}

.nav-bar__links li a {
  color: #fff;
  text-decoration: none;
}

.nav-bar__link {
  float: left;
  border-color: rgba(91, 71, 88, 1);
  border-style: solid;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  height: 100%;
  width: 48px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.nav-bar__text {
  align-items: center;
  display: flex;
  font-size: 0.9em;
  letter-spacing: 0.01em;
  font-weight: 700;
  margin-right: auto;
}

.nav-bar__reader {
  position: absolute;
  top:0;
  left:0;
  right:0;
  margin: auto;
  width:200px;
  cursor: pointer;
  text-align: center;
  font-weight:700
}

.nav-bar__link a {
  color: white;
}

.nav-bar__link:first-child {
  border-left-width: 2px;
}

.nav-bar__link:last-child {
  border-right-width: 2px;
}

.nav-bar__link--active {
  background-color: #006731;
  border-color: white;
}

.nav-bar__link {
  display: inline-block;
}

.right-to-left .nav-bar {
  direction: rtl;
  text-align: right;
}

.right-to-left .nav-bar__links {
  float: left;
}

.right-to-left .nav-bar__title,
.right-to-left .nav-bar__link {
  float: right;
}

.right-to-left .nav-bar__link:first-child {
  border-right-width: 2px;
  border-left-width: 1px;
}

.right-to-left .nav-bar__link:last-child {
  border-left-width: 2px;
  border-right-width: 1px;
}

.hidden-large{
  display:none;
}

.nav-bar__zoom-slider {
  margin: 0 12px;
  width: 100px;
}

.vue-slider {
  top: 15px;
}

.vue-slider-rail {
  background-color: #ffffff!important;
}

.vue-slider-process {
  background-color:rgba(231, 59, 32, 0.7)!important;
}

.vue-slider-dot-handle {
  background-color: #e73c20!important;
}

.vue-slider-dot-handle::after {
  background-color:rgba(255, 255, 255, 0.83);
}

.vue-slider-dot-tooltip-inner {
  background-color: #e73c20!important;
}

.vue-slider-dot-tooltip-text {
  font-size: 14px;
  height: 40px;
  width: 40px;
}

@media (max-width: 950px) {
  .nav-bar__divider,
  .nav-bar__page {
    display: none;
  }
}
@media (max-width: 600px) {
  .nav-bar__text {
    display: none;
  }
}

@media (min-width: 600px) and (min-height: 600px) {
  .nav-bar__container {
    padding-left: 10px;
    padding-right: 10px;
  }

}
</style>
