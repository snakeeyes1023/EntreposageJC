<template>
    <v-card class="mx-auto mt-3" max-width="500">
        <v-card-title class="my-5"> S'inscrire</v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" label="Courriel" required></v-text-field>
                <v-text-field v-model="username" label="nom d'utilisateur" required></v-text-field>
                <v-text-field v-model="firstname" label="Prénom" required></v-text-field>
                <v-text-field v-model="lastname" label="Nom de famille" required></v-text-field>
                <v-text-field v-model="password" label="Mot de passe" required></v-text-field>
                <v-text-field v-model="repassword" label="Confirmation du mot de passe" required></v-text-field>
            </v-form>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="register" :disable="isDisable"  class="mt-auto" color="info">
                S'inscrire
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    name: 'RegisterForm',
    methods: {
        async register(e) {
            e.preventDefault();

            this.isDisable = true;

            var body = JSON.stringify({
                email: this.email,
                username: this.username,
                firstname: this.firstname,
                lastname: this.lastname,
                password: this.password,
                passwordConfirmation: this.repassword,
            });

            const response = await fetch(process.env.VUE_APP_URL_API + "/Users/CreateAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });

            if (response.status == 200) {
                this.$router.push("/login");
            }
            else {
                this.isDisable = false;
            }
        },
    }, data: () => ({
        valid: false,
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        repassword: '',
        isDisable: false,
    }),
}
</script>