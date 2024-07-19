import * as types from '../mutation-types'

// initial state
const state = {
  isZoomed: false,
  zoomLevel: 1,
  zoomOriginX: 0,
  zoomOriginY: 0,
  
}

// getters
const getters = {
  // isZoomed: (state, getters) => state.isZoomed,
  zoomLevel: (state, getters) => state.zoomLevel,
}

// actions
const actions = {
  updateZoom (context, payload) {
    let newZ = (context.state.zoomLevel * context.rootState.pageScale) - 1
    let newX = context.state.zoomOriginX - (mouse.deltaX / newZ)
    let newY = context.state.zoomOriginY - (mouse.deltaY / newZ)
    if(newX < -context.getters.width) newX = -context.getters.width
    if(newY < -context.getters.height) newY = -context.getters.height
    if(newX > context.getters.width) newX = context.getters.width
    if(newY > context.getters.height) newY = context.getters.height
    context.commit('UPDATE_ZOOM', {zoomOriginX: newX, zoomOriginY: newY})

  }
}

// mutations
const mutations = {
  [types.TOGGLE_ZOOM] (state, payload = null) {
    if(state.activePanel == 'Zoom') {
      state.activePanel = ""
    } else {
      state.activePanel = 'Zoom'
    }
    if (state.activePanel == 'Zoom') {
      state.zoomLevel = 2
      state.zoomOriginX = payload.zoomOriginX || 0
      state.zoomOriginY = payload.zoomOriginY || 0
    }
    else {
      state.zoomLevel = 1
    }
  },

  [types.UPDATE_ZOOM] (state, payload) {
    state.zoomOriginX = payload.zoomOriginX
    state.zoomOriginY = payload.zoomOriginY
    state.zoomLevel = payload.zoomLevel || state.zoomLevel
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}