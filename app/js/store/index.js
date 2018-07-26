import Vue from 'Vue';
import Vuex from 'Vuex';



Vue.use(Vuex);

const state = {
  title: ''
}


const modules = {
}

const mutations = {
  updateTitle(state, value){
    state.title = value;
    if(state.title !== ''){
      document.title = state.title;
    }

  }
}

const actions = {

}

const store = new Vuex.Store({
  state,
  modules,
  mutations,
  actions
})

export default store;
