<template>
    <v-sheet rounded>
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="name" :readonly="loading" :rules="[required]" class="mb-2" clearable
                                label="Nom à afficher"></v-text-field>

                        </v-col>
                        <v-col cols="12" sm="6">

                            <v-text-field v-model="displayPricing" :readonly="loading" :rules="[required]" class="mb-2"
                                clearable label="Prix"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field v-model="quantity" :readonly="loading" :rules="[required]" class="mb-2"
                                clearable label="Quantité"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea auto-grow v-model="description" :readonly="loading" :rules="[required]"
                                class="mb-2" clearable label="Description"></v-textarea>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-checkbox v-model="tags" label="Chauffée" value="0"></v-checkbox>
                            <v-checkbox v-model="tags" label="Chauffée et éclairé" value="1"></v-checkbox>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">

                            <v-switch color="primary" v-model="isTaxable" true-value="true" false-value="false"
                                label="Taxable"></v-switch>
                        </v-col>

                    </v-row>
                </v-container>

                <br>

                <v-btn :disabled="!form" :loading="loading" class="float-right" color="info" size="large" type="submit"
                    variant="elevated">
                    Créer l'unité
                </v-btn>
                <v-btn class="float-right mx-3" color="default" size="large" @click="closeForm()" variant="elevated">
                    Annuler
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>
<script>


import UnitDataService from "../../services/UnitDataService";


export default {
    name: 'UnitForm',
    props: {
        closeForm: { type: Function },
    },
    data: () => ({
        form: false,
        displayPricing: null,
        name: null,
        description: null,
        quantity: null,
        isTaxable: null,
        tags: [],

        loading: false,
    }),
    methods: {
        async onSubmit() {
            if (!this.form) return

            this.loading = true

            var body = JSON.stringify({
                name: this.name,
                description: this.description,
                displayPricing: Number(this.displayPricing),
                quantity: Number(this.quantity),
                isTaxable: this.isTaxable === "true",
                tags: [1],
            });

            UnitDataService.create(body)
            .then((response) => {
                if (response.ok) {
                    this.closeForm()
                }
            }).finally(() => {
                this.loading = false
            });
        },
        required(v) {
            return !!v || 'Field is required'
        },
    },
}
</script>