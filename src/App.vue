<template>
  <v-app>
    <v-app-bar :elevation="6">

      <v-app-bar-title>
        <v-img
          :src="require('./assets/logo-white.png')"
          class="my-3"
          contain
          height="30"
        />
      </v-app-bar-title>
      <template v-slot:append>
        <v-divider vertical class="mx-5"></v-divider>

        <v-btn to="/account" v-if="isLoggedIn" class="my-auto mx-1">
          bonjour, {{ currentUserName }}
        </v-btn>

        <v-btn to="/unit" class="my-auto mx-1" prepend-icon="mdi-cloud-upload">
          Les unitées
        </v-btn>

        <v-divider vertical class="mx-5"></v-divider>

        <v-btn v-if="!isLoggedIn" class="my-auto mx-1" prepend-icon="mdi-login" to="/login">
          Se connecter
        </v-btn>

        <v-btn v-if="!isLoggedIn" class="my-auto mx-1" to="/register" prepend-icon="mdi-plus">
          S'inscrire
        </v-btn>
        <v-btn v-if="isLoggedIn" @click="logout" class="my-auto mx-1">
          Se déconnecter
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'App',

  data: () => ({

    
  }),
  methods: {
    ...mapMutations(["logout"])
  },
  computed: {
    ...mapGetters(["isLoggedIn", "currentUserName"])
    
  }
}
</script>
