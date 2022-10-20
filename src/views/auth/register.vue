<template>
    <v-card class="mx-auto" max-width="500">
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
        <v-card-actions>
            <v-btn text class="float-right" @click="register" color=" accent-4">
                S'inscrire
            </v-btn>
        </v-card-actions>
    </v-card>

</template>
  
<script>

export default {
    name: 'CustomRegister',
    methods: {
        async register(e) {
            e.preventDefault();

            var body = JSON.stringify({
                email: this.email,
                username: this.username,
                firstname: this.firstname,
                lastname: this.lastname,
                password: this.password,
                passwordConfirmation: this.repassword,
            });

            const response = await fetch("https://localhost:7064/Users/CreateAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });

            if (response.status == 200) {
                this.$router.push("/login");
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
    }),
}
</script>