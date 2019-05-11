const state = {
  selectMenu: ''
}

const mutations = {
  CHANGE_TOP_MENU: (state, selectMenu) => {
    state.selectMenu = selectMenu
  }
}

const actions = {
  changeTopMenu({
      commit
    }, selectMenu) {
    commit('CHANGE_TOP_MENU', selectMenu)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

