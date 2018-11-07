import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'cervejapunk',
  storage: localStorage
})

import {
  findIndex
} from 'lodash-es'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    quantity: 0,
  },
  mutations: {
    addToCart(state, beer) {

      let index = findIndex(state.beers, (o) => o.id == beer.id)

      if (index === -1) {
        state.beers.push({
          id: beer.id,
          name: beer.name,
          price: 2.5,
          quantity: 1,
          image_url: beer.image_url
        })
      } else {
        state.beers[index].quantity++;
      }

    },
    removeToCart(state, beer){

      let index = findIndex(state.beers, (o) => o.id == beer.id)
      
      state.beers.splice(index, 1);
    },
    removeQtd(state, beer){
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      if(beer.quantity === 1){
        state.beers.splice(index, 1);
      } else {
        state.beers[index].quantity--;
      }
    }
  },
  getters: {
    qtdbeers: state => {
      let qtd = 0;
      for (let x = 0; x < state.beers.length; x++) {
        qtd += Number(state.beers[x].quantity);
      }
      return qtd;
    }
  },
  actions: {

  },
  plugins: [vuexPersist.plugin]
})
