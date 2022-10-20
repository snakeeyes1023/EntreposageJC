<template>
  <div class="p-5 navbar">
    <v-app-bar :elevation="3" rounded>
      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>

        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
  </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";


export default defineComponent({
  setup() {
    return {
      activeKey: ref(null)
    };
  }
});
</script>


