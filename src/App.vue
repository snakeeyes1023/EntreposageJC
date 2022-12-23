<template>
  <v-app>

    <NavbarDefault></NavbarDefault>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <span class="white--text"><b>Jonathan Côté &copy; {{ currentYear }}</b></span>
    </v-footer>
  </v-app>
</template>

<script>
import NavbarDefault from "./components/shared/NavbarDefault.vue";
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    return {
      t: useI18n().t
    };
  },
  mounted() {
    document.title = this.t('app.title');
    this.$i18n.locale = localStorage.getItem('lang') || "fr";
  },
  name: "App",
  data: () => ({
    currentYear: new Date().getFullYear()
  }),
  components: { NavbarDefault }
}
</script>
