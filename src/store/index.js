import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  getters: {
    getItems: state => state.items
  },
  mutations: {
    SET_NEW_ITEMS(state, value) {
      state.items = value
    }
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const productList = []
        await firebase
            .firestore()
            .collection('items')
            .get()
            .then((items) => {
              items.forEach((item) => {
                productList.push({
                  id: item.id,
                  ...item.data()
                });
              });
            });
        commit('SET_NEW_ITEMS', productList)
      } catch(e) {
        console.log(e);
      }
    },
    async addItem({ dispatch }, product) {
      try {
        await firebase
            .firestore()
            .collection('items')
            .add(product)
            .then(() => {
              alert("Продукт успешно добавлен")
            });
        dispatch('fetchItems')
      } catch(e) {
        console.log(e);
      }
    }
  },
  modules: {
  }
})
