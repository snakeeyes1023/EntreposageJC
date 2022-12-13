<template>
    <v-sheet rounded>
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model="formIsValid" @submit.prevent="onSubmit">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="currentUnit.name" :readonly="loading" :rules="[required]"
                                class="mb-2" clearable label="Nom à afficher"></v-text-field>

                        </v-col>
                        <v-col cols="12" sm="6">

                            <v-text-field v-model="currentUnit.displayPricing" :readonly="loading" :rules="[required]"
                                class="mb-2" clearable label="Prix"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field v-model="currentUnit.quantity" :readonly="loading" :rules="[required]"
                                class="mb-2" clearable label="Quantité"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea auto-grow v-model="currentUnit.description" :readonly="loading"
                                :rules="[required]" class="mb-2" clearable label="Description"></v-textarea>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-checkbox v-model="currentUnit.tags" label="Chauffée" value="0"></v-checkbox>
                            <v-checkbox v-model="currentUnit.tags" label="Chauffée et éclairé" value="1"></v-checkbox>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">

                            <v-switch color="primary" v-model="currentUnit.isTaxable" true-value="true"
                                false-value="false" label="Taxable"></v-switch>
                        </v-col>

                    </v-row>
                </v-container>

                <br>

                <v-btn :disabled="!formIsValid" :loading="loading" class="float-right" color="info" size="large" prepend-icon="mdi-check"
                    type="submit" variant="elevated">
                    <div v-if="!!currentUnit.id">
                        <span>Modifier</span>
                    </div>
                    <div v-else>
                        <span>Créer</span>
                    </div>
                </v-btn>
                <v-btn class="float-right mx-3" color="default" size="large" @click="closeForm()" variant="elevated" prepend-icon="mdi-cancel">
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
        id: { type: String },
    },
    data: () => ({
        formIsValid: false,

        currentUnit: {
            id: null,
            displayPricing: null,
            name: null,
            description: null,
            quantity: null,
            isTaxable: null,
            tags: [],
        },
        loading: false,
    }),
    mounted() {
        if (this.id) {
            this.loading = true
            UnitDataService.getById(this.id).then((response) => {
                console.log(response)
                this.currentUnit = response.data
            }).finally(() => {
                this.loading = false
            })
        }
    },    
    methods: {
        async onSubmit() {
            if (!this.formIsValid) return

            this.loading = true

            let result = !this.currentUnit.id 
            ? UnitDataService.createNewOne(this.currentUnit) 
            : UnitDataService.updateById(this.currentUnit.id, this.currentUnit);

            result.then((response) => {
                if (response.status === 200) {
                    this.closeForm()
                }
                else{
                    console.warn(response)
                }
            }).finally(() => {
                this.loading = false
            });


        },
        required(v) {
            return !!v || 'Ce champ est requis'
        },
    },
}
</script>