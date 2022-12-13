<template>
  <v-app>

    <NavbarDefault></NavbarDefault>

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
import NavbarDefault from "./components/shared/NavbarDefault.vue";

export default {
    name: "App",
    data: () => ({}),
    methods: {
        ...mapMutations(["logout"])
    },
    computed: {
        ...mapGetters(["isLoggedIn", "currentUserName"])
    },
    components: { NavbarDefault }
}
</script>
