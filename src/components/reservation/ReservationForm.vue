<template>
    <v-sheet rounded>
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model="formIsValid" @submit.prevent="onSubmit">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <p>Veuillez choisir les dates de réservation</p>
                            <Datepicker v-model="dates" range min-range="14" />
                        </v-col>
                    </v-row>

                    <!-- Détail de la reservation -->
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-card outlined>
                                <v-card-title>
                                    <h3 class="headline mb-0">Détail de la réservation</h3>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <p>Unité: {{ unitData.name }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <p>Prix: {{ unitData.displayPricing }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <p>Quantité: {{ unitData.quantity }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <p>Chauffée: {{ unitData.tags[0] }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <p>Chauffée et éclairé: {{ unitData.tags[1] }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <p>Taxable: {{ unitData.isTaxable }}</p>
                                        </v-col>
                                        <v-col v-if="dates != undefined" cols="12" sm="6">
                                            <p>Date : du {{ dates[0] }} au {{ dates[1] }}</p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <br>

                <v-btn class="float-right mx-3" color="default" size="large" @click="this.closeForm()"
                    variant="elevated" prepend-icon="mdi-cancel">
                    Annuler
                </v-btn>

                <v-btn :disabled="!dates" :loading="loading" class="float-right" color="info" size="large"
                    prepend-icon="mdi-check-outline" type="submit" variant="elevated">
                    <span>Confirmer la réservation</span>
                </v-btn>

            </v-form>

        </v-card>
    </v-sheet>
</template>
<script>


import ReservationDataService from "../../services/ReservationDataService";
import { ref } from 'vue';


export default {
    name: 'ReservationForm',
    props: {
        closeForm: { type: Function },
        unitData: { type: Object },
    },
    data: () => ({
        loading: false,
        formIsValid: false
    }),
    setup() {
        const dates = ref();

        return {
            dates,
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault()

            this.loading = true

            alert(this.dates)

            try {
                ReservationDataService.createNewReservation(this.dates, this.unitData.id)
                    .then((response) => {
                        if (response.status === 200) {
                            this.closeForm()
                        }
                        else {
                            console.warn(response)
                        }
                    }).catch((error) => {
                        console.warn(error)
                    }).finally(() => {
                        this.loading = false
                    });
            } catch (error) {
                console.warn(error)
            } finally {
                this.loading = false
            }


        },
        required(v) {
            return !!v || 'Ce champ est requis'
        },
    },
}
</script>