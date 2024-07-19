import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import contents from './modules/contents'
import languages from './modules/languages'
import zoom from './modules/zoom'
import search from './modules/search'
import route from './modules/route'
import document from '../document'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    document,
    sectionIndices: [],
    pageScale: 1,
    videoURL: "",
    audioURL: "",
    activePanel: "",
    contentsPanel: true,
    zoomLevel: 1,
    zoomOriginX: 0,
    zoomOriginY: 0,
    translateX: 0,
    translateY: 0,
    isDoublePage: false,
    isFullscreen: false,
    galleryImages: [],
    galleryIndex: 0,
    isReader: false,
    initialWindowWidth: 300,
    initialWindowHeight: 476,
    isMobileFontLarge: false,
  },
  actions,
  getters,
  mutations,
  modules: {
    // contents,
    // languages,
    // search,
    // zoom,
    route,
  },
  strict: debug,
})

