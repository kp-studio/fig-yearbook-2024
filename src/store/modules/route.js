
import * as types from '../mutation-types'

// initial state - straight from the router i.e.
// route:{
// fullPath:"/5-1",
// meta: {},
// name:"PublishPage",
// params: {
//     section: "1",
//     page: "5"
// },
// path:"/5-1",
// query: {},
// }

// getters
const getters = {
  pageIndex: state => parseInt(state.params.page),
  sectionIndex: state => parseInt(state.params.section),
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  getters,
  actions,
  mutations
}