import { createStore } from "vuex";

import {postModule} from "@/store/postModule";

export default createStore({
  state: {
    isAuth: false,
    isDark: false
  },
  mutations: {
    changeTheme(state) {
      state.isDark = !state.isDark;
    }
  },
  modules: {
      post: postModule
  }
})