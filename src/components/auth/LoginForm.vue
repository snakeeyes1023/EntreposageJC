<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-auto mt-3" max-width="500">
            <v-card-title class="my-5">{{ t("login") }}</v-card-title>
            <v-spacer></v-spacer>

            <v-card-text>
                <v-alert v-if="errorMessages" type="error" class="my-3">
                    {{ errorMessages }}
                </v-alert>
                <v-text-field v-model="usernameOrEmail" :rules="[v => !!v || this.t('fieldIsRequired', [this.t('email')])]"
                    :label="t('email')" required></v-text-field>

                <v-text-field v-model="password" type="password" :rules="[v => !!v || this.t('fieldIsRequired', [this.t('password')])]"
                    :label="t('password')" required></v-text-field>
            </v-card-text>

            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="login" :loading="loading" :disable="isDisable" class="mt-auto" color="info">
                    {{ t("login") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import AuthDataService from "@/services/AuthDataService.js";
import { useI18n } from 'vue-i18n'

export default {
    name: 'LoginForm',
    setup() {
        const { t } = useI18n()
        return {
            t
        };
    },
    mounted() {
        //si l'usager est déjà authentifié, redirige vers la page d'accueil
        if (AuthDataService.isLogged()) {
            // si une url de retour est spécifié, redirige vers cette url
            if (this.$route.query.returnUrl) {
                this.$router.push(this.$route.query.returnUrl);
            }
            else {
                this.$router.push("/");
            }
        }
    },
    methods: {
        /**
         * Se connecte à l'application
         * 
         * @param {*} e 
         */
        async login(e) {
            e.preventDefault();

            // valide que le formulaire est valide
            this.$refs.form.validate()
                .then(valid => {
                    if (valid && this.valid) {
                        // envoie le formulaire
                        this.processForm();
                    }
                });
        },
        /**
         * Envoie le formulaire
         */
        async processForm() {
            this.isDisable = true;
            this.loading = true;

            try {
                const response = await AuthDataService.authenticate(this.usernameOrEmail, this.password);
                // l'utilisateur est authentifié
                if (response) {
                    document.location.reload();
                }
                // Le nom d'utilisateur ou le mot de passe est invalide
                else {
                    this.errorMessages = this.t('badCredentials');
                    this.password = '';
                }
            }
            catch (error) {
                this.errorMessages = this.t('errorConnectingToServer');
            }


            this.isDisable = false;
            this.loading = false;
        }
    }, data: () => ({
        usernameOrEmail: '',
        password: '',
        isDisable: false,
        loading: false,
        authForm: true,
        valid: true,
        errorMessages: '',
    }),
}
</script>