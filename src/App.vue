<template>
  <v-app>
    <v-app-bar :elevation="6">

      <v-app-bar-title>Mesloc {{ currentUserName }}</v-app-bar-title>
      <template v-slot:append>
        
        <v-btn icon="mdi-login" title="Se connecter" to="/login"></v-btn>
        <v-btn icon="mdi-pan" title="Se connecter" to="/register"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <div v-if="!isLoggedIn">
          <h1>Vous n'êtes pas bien authentifier...</h1>
        </div>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["isLoggedIn", "currentUserName"])
  }
}
</script>
