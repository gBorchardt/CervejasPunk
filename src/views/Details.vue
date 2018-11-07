<template>
  <v-container fluid>

    <BeerDetails />

  </v-container>
</template>

<script>
// Importação do componente
import BeerDetails from "../components/BeerDetails.vue";

export default {
  // Registro do componente
  components: {
    BeerDetails
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>