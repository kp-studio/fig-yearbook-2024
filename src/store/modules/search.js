import * as types from '../mutation-types'

// initial state
const state = {
  showSearch: false,
}

// getters
const getters = {
  // allProducts: state => state.all
}

// actions
const actions = {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
}

// mutations
const mutations = {
  // [types.RECEIVE_PRODUCTS] (state, { products }) {
  //   state.all = products
  // },

  // [types.ADD_TO_CART] (state, { id }) {
  //   state.all.find(p => p.id === id).inventory--
  // }

  [types.TOGGLE_SEARCH] (state) {
    if(state.activePanel == "Search") {
      state.activePanel == ""
    }
    else {
      state.activePanel == "Search"
    }
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}