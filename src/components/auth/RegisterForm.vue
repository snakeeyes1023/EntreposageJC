<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-auto mt-3" max-width="500">
            <v-card-title class="my-5">{{ t("register") }}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
                <v-alert v-if="errorMessages" type="error" class="my-3">
                    {{ errorMessages }}
                </v-alert>
                <v-text-field v-model="email" :label="this.t('email')"
                    :rules="[v => !!v || this.t('fieldIsRequired', [this.t('email')])]" required></v-text-field>
                <v-text-field v-model="username" :label="this.t('username')"
                    :rules="[v => !!v || this.t('fieldIsRequired', [this.t('username')])]" required></v-text-field>
                <v-text-field v-model="firstname" :label="this.t('firstname')"
                    :rules="[v => !!v || this.t('fieldIsRequired', [this.t('firstname')])]" required></v-text-field>
                <v-text-field v-model="lastname" :label="this.t('lastname')"
                    :rules="[v => !!v || this.t('fieldIsRequired', [this.t('lastname')])]" required></v-text-field>
                <v-text-field type="password" v-model="password" :label="this.t('password')"
                    :rules="[v => !!v || this.t('fieldIsRequired', [this.t('password')])]" required></v-text-field>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="register" :loading="isLoading" :disable="isDisable" class="mt-auto" color="info">
                    {{ this.t('register') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>

import AuthDataService from '@/services/AuthDataService';
import { useI18n } from 'vue-i18n'

export default {
    name: 'RegisterForm',
    setup() {
        const { t } = useI18n()
        return {
            t
        };
    },
    methods: {
        /**
         * S'inscrire à l'application
         * 
         * @param {*} e 
         */
        async register(e) {
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

                let data = {
                    email: this.email,
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    password: this.password,
                    passwordConfirmation: this.password
                }

                AuthDataService.register(data).then(() => {
                    this.$router.push({ path: '/auth/login' });                
                }).catch(error => {
                    console.log(error);
                    this.errorMessages = error.response.data.message;
                });
            }
            catch (error) {
                this.errorMessages = this.t('errorConnectingToServer');
            }
            
            this.isDisable = false;
            this.loading = false;
        }
    }, data: () => ({
        valid: false,
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        repassword: '',
        isDisable: false,
        isLoading: false,
        errorMessages: ''
    }),
}
</script>