import * as types from '../mutation-types'

// initial state
const state = {
  showContents: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.TOGGLE_CONTENTS] (state) {
    if(state.activePanel == "Contents") {
      state.activePanel == ""
    }
    else {
      state.activePanel == "Contents"
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}