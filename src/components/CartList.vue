<template>
  <v-list two-line subheader>
    <v-subheader inset>Carrinho de Compras</v-subheader>

    <v-list-tile
        v-for="beer in beerList"
        :key="beer.id"
        avatar
      >

      <v-list-tile-avatar>
        <img :src="beer.image_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
        <v-list-tile-sub-title>Quantidade: {{ beer.quantity }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action> 
        <v-btn icon ripple>
          <v-icon color="green lighten-1" v-on:click="actAddToChart(beer)">add</v-icon>
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

    <v-divider inset></v-divider>

    <div class="checkout">

      <v-list-tile 
        v-if="this.qtdbeers > 0">
          <v-list-tile-content>
            <v-list-tile-title>Itens no Carrinho: {{ qtdbeers }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="qtdbeers < 10">
                Total: {{ formatTotal(valbeers) }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else>
                Total:
                <span class="original_price">
                  {{ formatTotal(valbeers) }}
                  </span>
                  <span class="red--text">
                    {{ formatTotal((valbeers) - valbeers * 0.1) }} (10% Off)
                  </span>
              </v-list-tile-sub-title>
          </v-list-tile-content>
      </v-list-tile>

      <center 
        v-if="this.qtdbeers > 0">
          <v-btn color="light-green" @click.native="$router.push('/checkout')">
            Finalizar Compra
          </v-btn>
      </center>
    </div>

  </v-list>
</template>


<script>
import store from "@/store/cart.js";
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
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

    ...mapGetters(['qtdbeers', 'beerList'])
    
  },
  methods: {
    removeToCart(beer) {
      store.commit("removeToCart", beer);
    },
    removeQtd(beer){
      store.commit("removeQtd", beer);
    },
    formatTotal(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    },
    
    ...mapActions({
      actAddToChart: 'actAddToChart',
    })
  }
};
</script>

<style>

.checkout {
  position: absolute;
  bottom: 0;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background: #d9d9d933;
  width: 100%;
  border-top: 1px solid #dededed4;
}

.original_price {
    text-decoration: line-through;
}

</style>