<template>
    <v-app-bar color="blue-darken-2" :elevation="6">
        <v-app-bar-title>
            <v-btn to="/home" variant="text" class="my-auto mx-1" prepend-icon="mdi-cube-unfolded">
                {{ t("manageLocals") }}
            </v-btn>

        </v-app-bar-title>
        <template v-slot:append>
            <v-divider vertical class="mx-5"></v-divider>

            <v-btn to="/unit" class="my-auto mx-1" variant="text" prepend-icon="mdi-cube-outline ">
                {{ t("locals") }}
            </v-btn>

            <v-btn to="/stat" v-if="isLogged" variant="text" class="my-auto mx-1" prepend-icon="mdi-graph-outline ">
                {{ t("statistics") }}
            </v-btn>

            <v-divider vertical class="mx-5"></v-divider>


            <v-btn v-if="isLogged" class="my-auto mx-1" variant="text" prepend-icon="mdi-account-circle-outline "
                readonly>
                {{ t("welcome") }}, {{ username }}
            </v-btn>
            <div v-if="!isLogged">
                <v-btn class="my-auto mx-1" prepend-icon="mdi-login" variant="text" to="/auth/login">
                    {{ t("login") }}
                </v-btn>

                <v-btn class="my-auto mx-1" to="/auth/register" variant="text" prepend-icon="mdi-account-plus">
                    {{ t("register") }}
                </v-btn>
            </div>

            <v-btn v-if="isLogged" @click="logout" variant="text" class="my-auto mx-1">
                {{ t("logout") }}
            </v-btn>

            <v-divider vertical class="mx-5"></v-divider>

            <v-btn v-if="!this.$i18n.locale.includes('en')" variant="outlined" @click="changeLang('en')"
                class="my-auto mx-1" prepend-icon="mdi-earth">
                en
            </v-btn>
            <v-btn v-if="!this.$i18n.locale.includes('fr')" variant="outlined" @click="changeLang('fr')"
                class="my-auto mx-1" prepend-icon="mdi-earth">
                fr
            </v-btn>
        </template>
    </v-app-bar>
</template>

<style>
.v-app-bar-title {
    font-weight: 700;
}
.v-app-bar {
    overflow-x: scroll;
}
.v-app-bar::-webkit-scrollbar {
  display: none;
}
</style>
    
<script>
import { defineComponent, ref } from "vue";
import AuthDataService from "@/services/AuthDataService";
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'NavbarDefault',
    setup() {
        const { t } = useI18n()
        return {
            activeKey: ref(null),
            t
        };
    },
    methods: {
        /**
         * Se déconnecter
         */
        logout() {
            AuthDataService.logout();
            document.location.reload();
        },
        changeLang(lang) {
            this.$i18n.locale = lang;
            this.$router.push({ query: { lang: lang } });
            localStorage.setItem('lang', lang);
        }
    },
    data() {
        return {
            isLogged: AuthDataService.isLogged(),
            username: AuthDataService.getCurrentUser(),
            on: true
        };
    },
});
</script>
  
  
  