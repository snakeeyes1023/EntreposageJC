<template>
    <v-card class="mx-auto mt-3" max-width="500">
        <v-card-title class="my-5">Se connecter</v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="usernameOrEmail"  label="Courriel ou nom d'utilisateur" required></v-text-field>
                <v-text-field v-model="password" label="Mot de passe" required></v-text-field>
            </v-form>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="login" :disable="isDisable" class="mt-auto" color="info">
                Se connecter
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: 'LoginForm',
    mounted() {
        this.logout();
    },
    methods: {
        ...mapMutations(["setUser", "setToken", "logout"]),
        async login(e) {
            e.preventDefault();

            this.isDisable = true;

            let body =  JSON.stringify({
                    usernameOrEmail: this.usernameOrEmail,
                    password: this.password,
                });
            
            const response = await fetch(process.env.VUE_APP_URL_API + "/Users/Authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });

            if (response.status == 200) {
                const data = await response.json();
                this.setUser(data.user);
                this.setToken(data.token);
                this.$router.push("/");
            }    
            else{
                this.isDisable = false;
            }      
        },
    }, data: () => ({
        usernameOrEmail: '',
        password: '',
        isDisable: false,
    }),
}
</script>