import * as types from "./mutation-types"

export default {
  [types.RESET_SECTION_INDICES](state, payload) {
    state.sectionIndices = payload
  },

  [types.CHANGE_SECTION_INDEX](state, payload) {
    state.sectionIndices[payload.pageIndex] = payload.sectionIndex
  },

  [types.UPDATE_PAGE_SCALE](state, payload) {
    state.pageScale = payload.pageScale
  },

  [types.UPDATE_VIDEO_URL](state, payload) {
    state.videoURL = payload
  },

  [types.UPDATE_AUDIO_URL](state, payload) {
    state.audioURL = payload
  },

  [types.TOGGLE_LANGUAGES](state) {
    if (state.activePanel == "Languages") {
      state.activePanel = ""
    } else {
      state.activePanel = "Languages"
    }
  },

  [types.TOGGLE_EDITIONS](state) {
    if (state.activePanel == "Editions") {
      state.activePanel = ""
    } else {
      state.activePanel = "Editions"
    }
  },

  // [types.TOGGLE_CONTENTS](state) {
  //   if (state.contentsPanel == true) {
  //     state.contentsPanel = false
  //   } else {
  //     state.contentsPanel = true
  //   }
  // },

  [types.TOGGLE_CONTENTS](state) {
    if (state.activePanel == "Contents") {
      state.activePanel = ""
    } else {
      state.activePanel = "Contents"
    }
  },

  [types.TOGGLE_SEARCH](state) {
    if (state.activePanel == "Search") {
      state.activePanel = ""
    } else {
      state.activePanel = "Search"
    }
  },

  [types.TOGGLE_GUIDE](state) {
    if (state.activePanel == "Guide") {
      state.activePanel = ""
    } else {
      state.activePanel = "Guide"
    }
  },

  [types.TOGGLE_FONT_SIZE](state) {
    state.isMobileFontLarge = !state.isMobileFontLarge
  },

  [types.TOGGLE_ZOOM](state, payload = null) {
    // console.log('toggleZoom', payload.zoomOriginX)
    if (state.zoomLevel != 1) {
      state.zoomLevel = 1
      state.zoomOriginX = 0
      state.zoomOriginY = 0
    } else {
      state.zoomLevel = payload.zoomLevel || 2
      state.zoomOriginX = payload.zoomOriginX || 0
      state.zoomOriginY = payload.zoomOriginY || 0
    }

    Publish.$refs.app.$refs.navBar.$refs.zoomSlider.setValue(
      Math.round((state.zoomLevel + Number.EPSILON) * 100) / 100
    )
  },

  [types.TOGGLE_FULLSCREEN](state) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      state.isFullscreen = true
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      state.isFullscreen = false
    }
  },

  [types.UPDATE_FULLSCREEN](state) {
    if (document.fullscreenElement || window.fullscreenElement) {
      state.isFullscreen = true
    } else {
      state.isFullscreen = false
    }
  },

  [types.UPDATE_ZOOM](state, payload) {
    state.zoomOriginX = payload.zoomOriginX
    state.zoomOriginY = payload.zoomOriginY
    state.translateX = payload.translateX || state.translateX
    state.translateY = payload.translateY || state.translateY
    state.zoomLevel = payload.zoomLevel || state.zoomLevel
    
    if (state.zoomLevel <= 1) {
      state.zoomLevel = 1
      state.zoomOriginX = 0
      state.zoomOriginY = 0
      state.translateX = 0
      state.translateY = 0
    }

    Publish.$refs.app.$refs.navBar.$refs.zoomSlider.setValue(
      Math.round((state.zoomLevel + Number.EPSILON) * 100) / 100
    )
  },

  [types.SLIDE_ZOOM](state, payload) {
    let zoomDelta = payload.zoomValue - state.zoomLevel

    if(zoomDelta < 0) {
      let zoomDeltaScale = zoomDelta / (1 - state.zoomLevel)
      state.zoomOriginX = state.zoomOriginX * (1 - zoomDeltaScale) 
      state.zoomOriginY = state.zoomOriginY * (1 - zoomDeltaScale) 
    }

    state.zoomLevel = payload.zoomValue || state.zoomLevel
  },

  [types.UPDATE_INITIAL_WINDOW_SIZE](state, payload) {
    state.initialPageWidth = payload.width
    state.initialPageHeight = payload.height
  },

  [types.UPDATE_IS_DOUBLE_PAGE](state, payload) {
    state.isDoublePage = payload
  },

  [types.UPDATE_GALLERY](state, payload) {
    state.galleryImages = payload
  },

  [types.UPDATE_GALLERY_INDEX](state, payload) {
    state.galleryIndex = payload
  },

  [types.TOGGLE_READER](state, payload) {
    state.isReader = !state.isReader
  },

  [types.UPDATE_CONTENT_PANEL](state, payload) {
    state.contentsPanel = payload
  },
}
