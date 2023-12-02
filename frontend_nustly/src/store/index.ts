import { createStore } from "vuex";

export default createStore({
  state: {
    isAuth: false,
    isDark: false,
    isNavOpen: false
  },
  mutations: {
    changeTheme(state) {
      state.isDark = !state.isDark;
    },
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    },
    isAuthConvert(state) {
      state.isAuth = !state.isAuth;
    }
  },
})