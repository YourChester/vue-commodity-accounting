import Vue from "vue";
import App from "./App.vue";
import '@/assets/scss/style.scss'
import { firebaseConfig } from '@/assets/utils/firebase.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let app
Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(
        App
      )
    }).$mount("#app");
  }
})
