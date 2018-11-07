<template>
  <v-app>

    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-title :style="{ cursor: 'pointer'}"
        v-text="title"
        v-on:click="$router.push('/')">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.stop="rightDrawer = !rightDrawer">
        <span class="qtdbeers">{{ qtdbeers }}</span><v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <cartList />
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; Gabriel Borchardt - 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import CartList from "./components/CartList.vue";
import store from "@/store/cart.js";

export default {
  name: "App",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Cervejas Punk"
    };
  },
  computed: {
    qtdbeers() {
      return store.getters.qtdbeers;
    }
  },
  components: {
    CartList
  }
};
</script>

<style>

 .qtdbeers {
    font-weight: bold;
    font-size: 13px;
    margin-right: -50px;
    border: 1px solid;
    background: white;
    color: green;
    border-radius: 15px;
    width: 20px;
  }
</style>