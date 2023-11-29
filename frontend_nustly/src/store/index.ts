import { createStore } from "vuex";

import {postModule} from "@/store/postModule";

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
    }
  },
  modules: {
      post: postModule
  }
})