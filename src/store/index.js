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
    },
    async editItem({ dispatch }, product) {
      try {
        const id = product.id
        delete product.id

        await firebase
            .firestore()
            .collection('items')
            .doc(id)
            .set(product)
            .then(() => {
              alert("Продукт успешно обновлен")
            });
        dispatch('fetchItems')
      } catch(e) {
        console.log(e);
      }
    },
    async deleteItem({ dispatch }, product) {
      try {
        const id = product.id
        if (confirm('Вы точно хотите удалить?')) {
          await firebase
              .firestore()
              .collection('items')
              .doc(id)
              .delete()
              .then(() => {
                alert("Продукт успешно обновлен")
              });
          dispatch('fetchItems')
        }
      } catch(e) {
        console.log(e);
      }
    }
  },
  modules: {
  }
})
