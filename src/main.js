// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import VueGtag from "vue-gtag";
import App from "./App"
import store from "./store"
import router from "./router"
import Helper from "./helpers"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
import { sync } from "vuex-router-sync"

const unsync = sync(store, router)

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: "G-0C98KVSRW4" },
}, router);

/* eslint-disable no-new */
window.Publish = new Vue({
  el: "#app",
  router,
  store,
  template: '<App ref="app"/>',
  components: {
    App,
  },
  created() {
    if (this.mobileSwitch) this.checkMobileLanding()
  },
  computed: {
    ...mapState({
      isReader: state => state.isReader,
    }),
    ...mapGetters([
      "currentPage",
      "pagesVisible",
      "isZoomed",
      "showContents",
      "zoomLevel",
      "rightToLeft",
      "zoomEnabled",
      "zoomClickEnabled",
      "isMobile",
      "mobileSwitch",
      "currentMobilePageIndex",
      "videoURL",
      "isGalleryOpen",
      "doublePage",
      "isPhantom",
      "isDoublePage",
      "showGuide",
      "initialWindowWidth",
      "initialWindowHeight",
      "audioURL"
    ]),
  },
  methods: {
    ...mapMutations({
      toggleZoom: "TOGGLE_ZOOM",
      updateFullscreen: "UPDATE_FULLSCREEN",
    }),
    ...mapActions([
      "goToPage",
      "goToNextPage",
      "goToPreviousPage",
      "goToNextSection",
      "goToPreviousSection",
      "goToPreviousMobilePage",
      "goToNextMobilePage",
      "nextPage",
      "previousPage",
      "nextSection",
      "previousSection",
      "previousMobilePage",
      "nextMobilePage",
      "scrollZoom",
      "updateZoom",
      "startZoom",
      "changeWindowSize",
      "checkMobileLanding",
      "updateVideoURL",
      "pinchZoom",
      "panZoom",
      "openVideo",
      "isPhantom",
      "openGallery",
      "openGalleryTwo",
      "closeGallery",
      "goToGallerySlide",
      "nextGallerySlide",
      "previousGallerySlide",
      'changeWindowSize',
      'setInitialWindowSize',
      "updateAudioURL",
      "openAudio",
    ]),
  },
  mounted() {
    Helper.pageHandler.init()
    Helper.inputHandler.init()
    Helper.platformHandler.init()
    Helper.trackingHandler.init()
    // if (!Publish.isPhantom) {
      // this.changeWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // })
    // }
  },
})

router.beforeEach((to, from, next) => {
  if (Publish.isMobile && Publish.mobileSwitch) next()
  // console.log('Navigating from', from, ' to ', to)
  let p = parseInt(from.params.page) - 1
  let s = parseInt(from.params.section) - 1
  try {
    if (
      window["p" + p + "s" + s + "onPageLeave"] &&
      !Publish.$store.getters.tmpMobile
    ) {
      window["p" + p + "s" + s + "onPageLeave"]()
    }
    if (Publish.$store.state.isDoublePage && Publish.doublePage) {
      window["p" + p + "s" + s + "onPageLeave"]()
      window["p" + (p + 1) + "s" + s + "onPageLeave"]()
    }
  } catch (err) {
    console.error("WARNING - p" + p + "s" + s + "onPageLeave caused an error:")
    console.error(err.message)
  }
  next()
})

router.beforeEach((to, from, next) => {
  if(!Publish.isMobile) window.scrollTo(0, 0)
  if (Publish.isZoomed) {
    Publish.toggleZoom()
  }
  next()
})

router.beforeEach((to,from,next) => {
  if(!Publish.isMobile) window.scrollTo(0, 0)
  if((Publish.isMobile && Publish.mobileSwitch) || Publish.isReader) {
    document.getElementById('mobile-container').style.position = "fixed"
    setTimeout(function() {
      document.getElementById('mobile-container').style.position = ""
    } , 100)

  }
  if(Publish.isZoomed) {
    Publish.toggleZoom()
  }
  next()
})
