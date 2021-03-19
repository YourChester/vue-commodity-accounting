const userState = {
  namespaced: true,
  state: () => ({
    userInfo: {}
  }),

  mutations: {
    SET_USER_INFO(state, value) {
      state.userInfo = value;
    }
  },

  getters: {
    userInfo: state => state.userInfo
  },

  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    }
  }
}

export default userState