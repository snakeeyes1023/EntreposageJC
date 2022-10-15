<template>
  <div id="app">
    <n-config-provider :theme="theme">
      <CustomNavbar />
    </n-config-provider>

      <router-view />

  </div>
</template>

<style>
.float-right {
    float: right;
}

.mt-2 {
    margin-top: 1rem;
}


.mx-5 {
    margin-left: 1em;
    margin-right: 1em;
}
.p-2 {
    padding: 0.5rem;
}
</style>

<script>
import CustomNavbar from "./components/Shared/CustomNavbar.vue";
import { defineComponent, computed } from "vue";
import { useOsTheme, darkTheme } from "naive-ui";



export default defineComponent({
  setup() {
    const osThemeRef = useOsTheme();
    return {
      theme: computed(() => osThemeRef.value === "dark" ? darkTheme : null),
      osTheme: osThemeRef
    };
  },
  data: () => ({
    active: "guide"
  }),
  components: { CustomNavbar }
});

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@200;300;400;500;700;800;900&display=swap');


#app {
  font-family: 'Barlow', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

.vs-navbar button {
  font-size: 1rem;
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
  margin: 0.4rem;
}

.vs-navbar__item {
  font-size: 2rem;
}

body {
  margin: 0;
  padding: 0;
  background: #272727;
}
</style>
