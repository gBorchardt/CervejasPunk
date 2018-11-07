<template>
  <!-- Adicionando o componente de card -->
  <v-card>

    <!-- Atualizando para melhoria visual -->
    <v-img
      :src="beer.image_url"
      aspect-ratio="1"
      height="200px"
      contain
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{beer.name}}</h3>
        <div>{{beer.tagline}}</div>
        <v-list-tile-action-text>IBU: {{ beer.ibu }}</v-list-tile-action-text>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn small color="green" @click="snackbar = true" v-on:click="addToCart(beer)" dark>Adicionar</v-btn>
      <v-btn flat color="blue" @click.native="$router.push('/details/' + beer.name)">Detalhes</v-btn>
    </v-card-actions>

    <v-snackbar v-model="snackbar" :timeout=2000>
      Cerveja adicionada ao carrinho!
      <v-btn
        color="green"
        flat
        @click="snackbar = false">
        FECHAR
      </v-btn>
    </v-snackbar>

  </v-card>
</template>

<script>
import store from "@/store/cart.js";

export default {
  //Recebendo a prop beer
  props: ["beer"],
  data() {
    return {
      snackbar: false
    };
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
    }
  }
};
</script>

