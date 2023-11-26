const state = {
  user: null,
  userList: [],
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
  StateUserList: (state) => state.userList,
};

const actions = {
  Register({commit}, data) {
    commit("setUserList", data)
  },
  LogIn({commit}, data) {
    commit("setUser", data.username)
  },
  LogOut({commit}) {
    let user = null
    commit("logout", user)
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username
  },
  setUserList(state, userList) {
    state.userList = userList
  },
  logout(state, user) {
    state.user = user
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
