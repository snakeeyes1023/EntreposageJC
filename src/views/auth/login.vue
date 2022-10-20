<template>
    <v-card class="mx-auto" max-width="500">
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>

                <v-text-field v-model="usernameOrEmail"  label="Courriel ou nom d'utilisateur" required></v-text-field>

                <v-text-field v-model="password" label="Mot de passe" required></v-text-field>


            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn text class="float-right" @click="login" color=" accent-4">
                Se connecter
            </v-btn>
        </v-card-actions>
    </v-card>

</template>
  
<script>
import { mapMutations } from "vuex";

export default {
    name: 'CustomLogin',
    methods: {
        ...mapMutations(["setUser", "setToken"]),
        async login(e) {
            e.preventDefault();

            var body =  JSON.stringify({
                    usernameOrEmail: this.usernameOrEmail,
                    password: this.password,
                });
            
            const response = await fetch("https://localhost:7064/Users/Authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });
            const { userName, token } = await response.json();
            this.setUser(userName);
            this.setToken(token);
        },
    }, data: () => ({
        valid: false,
        usernameOrEmail: '',
        password: '',
    }),
}
</script>