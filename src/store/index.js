import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', user);
    },
    setToken(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  actions: {},
  getters: {

    isLoggedIn(state) {

      // sync user and token from localStorage
      state.user = localStorage.getItem('user');
      state.token = localStorage.getItem('token');

      return !!state.token;
    },
    currentUserName(state) {

      // sync user and token from localStorage
      state.user = localStorage.getItem('user');
      state.token = localStorage.getItem('token');

      if (state.user == undefined || state.user == "undefined") {
        return "Inconnue";
      }

      console.log(state.user)
      return state.user;
    }
  },
});

export default store;