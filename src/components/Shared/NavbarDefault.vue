<template>
    <v-app-bar :elevation="6">
        <v-app-bar-title>
            <v-btn v-if="!isLoggedIn" class="my-auto mx-1" prepend-icon="mdi-cube-unfolded">
                Gestion de locaux
            </v-btn>

        </v-app-bar-title>
        <template v-slot:append>
            <v-divider vertical class="mx-5"></v-divider>

            <v-btn to="/account" v-if="isLoggedIn" class="my-auto mx-1">
                bonjour, {{ currentUserName }}
            </v-btn>

            <v-btn to="/unit" class="my-auto mx-1" prepend-icon="mdi-cube-outline ">
                Les unitées disponnibles
            </v-btn>

            <v-divider vertical class="mx-5"></v-divider>

            <div v-if="!isLoggedIn">
                <v-btn class="my-auto mx-1" prepend-icon="mdi-login" to="/login">
                    Se connecter
                </v-btn>

                <v-btn class="my-auto mx-1" to="/register" prepend-icon="mdi-account-plus">
                    S'inscrire
                </v-btn>
            </div>

            <v-btn v-if="isLoggedIn" @click="logout" class="my-auto mx-1">
                Se déconnecter
            </v-btn>
        </template>
    </v-app-bar>
</template>

<style>
.v-app-bar-title {
    font-weight: 700;
}
</style>
    
<script>
import { defineComponent, ref } from "vue";


export default defineComponent({
    name: 'NavbarDefault',
    setup() {
        return {
            activeKey: ref(null)
        };
    }
});
</script>
  
  
  