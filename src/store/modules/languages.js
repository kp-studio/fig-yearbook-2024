import * as types from '../mutation-types'

// initial state
const state = {
  showLanguages: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.TOGGLE_LANGUAGES] (state) {
    if(state.activePanel == "Languages") {
      state.activePanel == ""
    }
    else {
      state.activePanel == "Languages"
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}