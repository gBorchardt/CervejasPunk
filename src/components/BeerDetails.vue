<template>
  <div>
    <v-flex 
      v-for="beer in beers" 
      :key="beer.id">

        <v-container fluid>
          <v-layout>
            <v-flex>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>{{ beer.name }} - {{beer.tagline}}</v-toolbar-title>
                  <v-spacer/>
                </v-toolbar>
                
                <v-card-text>
                  <v-card-title primary-title>
                    <v-flex 
                      v-if="!isLoading && beer != null">
                        <div>
                          <v-img :src="beer.image_url" height="200px" contain/>
                          <br>
                          <p>{{ beer.description }}</p>
                          <b>ABV:</b> {{ beer.abv }} <br />
                          <b>IBU:</b> {{ beer.ibu }} <br />
                          <b>Attenuation Level:</b> {{ beer.attenuation_level }} <br />
                          <b>Data Lançamento:</b> {{ beer.first_brewed }} <br />
                          <b>PH:</b> {{ beer.ph }} <br />
                          <b>Volume:</b> {{ beer.volume.value }} ({{ beer.volume.unit}}) <br />
                        </div>
                    </v-flex>
                  </v-card-title>
                </v-card-text>
              
                <v-card-actions>
                  <v-spacer/>
                  <v-btn small color="green" @click="snackbar = true" v-on:click="addToCart(beer)" dark>Adicionar</v-btn>
                  <v-btn small color="blue" @click.native="$router.go(-1)">Voltar</v-btn>
                </v-card-actions>

                <v-snackbar v-model="snackbar" :timeout=1500>
                  Cerveja adicionada ao carrinho de compras!
                  <v-btn
                    color="green"
                    flat
                    @click="snackbar = false">
                    Close
                  </v-btn>
                </v-snackbar>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/cart.js";

export default {
  mounted() {
    axios
      .get("https://api.punkapi.com/v2/beers?beer_name=" + this.$route.params.beer_name)
      .then(response => (this.beers = response.data));
  },
  data() {
    return {
      beers: [],
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