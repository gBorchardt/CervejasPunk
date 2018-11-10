import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from "axios"

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
    products: [],
    quantity: 0,
  },
  mutations: {
    mutAddToCart(state, beer) {

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
    },
    setBeers(state, products){
      state.products = products
    }
  },
  getters: {
    qtdbeers: state => {
      let qtd = 0;
      for (let x = 0; x < state.beers.length; x++) {
        qtd += Number(state.beers[x].quantity);
      }
      return qtd;
    },
    msgAddCart(){
      return "Cerveja adicionada ao carrinho de compras."
    },
    beerList: state => {
      return state.beers;
    }
  },
  actions: {
    fetchBeers({
      commit
    }) {
        axios
          .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
          .then(response => {
            let results = response.data
            commit('setBeers', results)
          });
    },
    filterBeers({
      commit
      }, value) {
        axios
        .get("https://api.punkapi.com/v2/beers?ibu_gt=" + value)
        .then(response => {
          let results = response.data
          commit('setBeers', results)
        });      
    },
    actAddToChart({
      commit
    }, beer) {
      commit('mutAddToCart', beer)
    }
  },
  plugins: [vuexPersist.plugin]
})
