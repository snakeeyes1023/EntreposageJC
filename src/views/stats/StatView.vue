<template>
    <v-container fluid>
        <v-row>
            <GlobalStats />
        </v-row>
    </v-container>
</template>
  
<script>
import GlobalStats from "@/components/stats/globalStats.vue";

export default {
    name: "StatView",
    components: { GlobalStats }
}
</script>