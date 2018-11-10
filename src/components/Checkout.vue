<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Carrinho de Compras</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template 
            v-for="beer in beers">

              <v-list-tile :key="beer.id" avatar ripple>
                <v-list-tile-content>
                  <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>Preço: {{ formatTotal(beer.price) }}</v-list-tile-sub-title>
                  <v-list-tile-action-text>Quantidade: {{ beer.quantity }}</v-list-tile-action-text>
                </v-list-tile-content>

                <v-list-tile-action> 
                  <v-btn icon ripple>
                    <v-icon color="green lighten-1" v-on:click="addQtd(beer)">add</v-icon>
                  </v-btn>
                  <v-btn icon ripple>
                      <v-icon color="red lighten-1" v-on:click="removeQtd(beer)">remove</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-action>      
                  <v-btn icon ripple>
                    <v-icon color="blue lighten-1" @click.native="$router.push('/details/' + beer.name)">info</v-icon>
                  </v-btn>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1" v-on:click="removeToCart(beer)">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>

              </v-list-tile>
              
              <v-divider :key="beer.id"></v-divider>
        
          </template>

          <v-list-tile>
            <v-list-tile-content></v-list-tile-content>
            <v-list-tile-action>
            <v-list-tile-sub-title>Quantidade Total: {{ qtdbeers }}</v-list-tile-sub-title>

            <v-list-tile-sub-title 
              v-if="qtdbeers < 10">
                Total: {{ formatTotal(valbeers) }}
            </v-list-tile-sub-title>
            
            <v-list-tile-sub-title v-else>
              Total:
              <span class="original_price">
                {{ formatTotal(valbeers) }}
              </span>
              <span class="red--text">
                <br>
                {{ formatTotal((valbeers) - valbeers * 0.1) }} (10% Off)
              </span>
            </v-list-tile-sub-title>
          </v-list-tile-action>
          
          </v-list-tile>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="green" dark>Finalizar Compra</v-btn>
            </v-card-actions>
          </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "@/store/cart.js";

export default {
  data() {
    return {}
  },
  computed: {
    beers() {
      return store.state.beers;
    },
    valbeers() {
      let soma = 0;
      for (let x = 0; x < store.state.beers.length; x++) {
        let b = store.state.beers[x];
        soma += Number(b.quantity * b.price);
      }
      if(store.getters.qtdbeers >= 10) {
        return (soma) - soma * 0.1;
      } else {
        return soma;
      }
    },
    qtdbeers() {
      return store.getters.qtdbeers;
    }
  },
  methods: {
    addQtd(beer) {
      store.commit("addToCart", beer);
    },
    removeQtd(beer) {
      store.commit("removeQtd", beer);
    },
    removeToCart(beer) {
      store.commit("removeToCart", beer);
    },
    formatTotal(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
  }
};
</script>

<style>
.original_price {
    text-decoration: line-through;
}
</style>