<template>
  <div>
    <v-layout justify-center>
      <v-flex xs6>
        <v-select
          :items="categories"
          v-model="selectedValue"
          item-text="text"
          item-value="value"
          menu-props="auto"
          label="Filtrar por IBU"
          hide-details
          prepend-icon="search"
          single-line>
        </v-select>
      </v-flex>
    </v-layout>

    <v-container grid-list-md>
      <v-layout row wrap>
        <!-- Laço com os dados de cervejas -->
        <!-- Notem que usamos a id devido ao object observer -->
        <v-flex 
          v-for="beer in products" 
          :key="beer.id" xs4>
            <!-- Passamos a prop com a nossa cerveja específica para ser renderizada no card. -->
            <BeerCard :beer="beer" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

// Como padrão, importamos nosso componente de card.
import BeerCard from "../components/BeerCard.vue";
import { mapState, mapGetter, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedValue: null,
      categories: [
        {
          value: "0",
          text: "Todos"
        },
        {
          value: "10",
          text: "IBU > 10"
        },
        {
          value: "25",
          text: "IBU > 25"
        },
        {
          value: "50",
          text: "IBU > 50"
        },
        {
          value: "75",
          text: "IBU > 75"
        },
        {
          value: "100",
          text: "IBU > 100"
        },
        {
          value: "500",
          text: "IBU > 500"
        }
      ]
    };
  },
  watch: {
    selectedValue(newValue) {
      if(newValue == "0") {
        this.fetchBeers();
      } else {
        this.filterBeers(newValue);
      }
    }
  },
  components: {
    BeerCard
  },
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    ...mapActions({
      fetchBeers: 'fetchBeers',
      filterBeers: 'filterBeers'
    })
  },

  created(){
    this.fetchBeers();
  }
};
</script>