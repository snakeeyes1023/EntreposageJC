<template>
    <v-sheet rounded>
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model="formIsValid" @submit.prevent="onSubmit">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <p>{{ t("chooseReservationDateRange") }}</p>
                            <Datepicker v-model="dates" range min-range="14"  />
                        </v-col>
                    </v-row>

                    <!-- Détail de la reservation -->
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-card outlined>
                                <v-card-title>
                                    <h4 class="headline mb-0">{{ t("reservationDetails") }}</h4>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <p>{{ t("local") }}: {{ unitData.name }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <p>{{ t("price") }}: {{ unitData.displayPricing }}</p>
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
                    {{ t("cancel") }}
                </v-btn>

                <v-btn :disabled="!dates" :loading="loading" class="float-right" color="info" size="large"
                    prepend-icon="mdi-check-outline" type="submit" variant="elevated">
                    <span>{{ t("confirmReservation") }}</span>
                </v-btn>

            </v-form>

        </v-card>
    </v-sheet>
</template>
<script>


import ReservationDataService from "../../services/ReservationDataService";
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

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
        const { t } = useI18n()

        return {
            dates,
            t
        }
    },
    methods: {
        /**
         * Envoie la requête pour créer la réservation
         * 
         * @param {*} event 
         */
        async onSubmit(event) {
            event.preventDefault()

            this.loading = true

            try {
                // envoie la requête pour créer la réservation
                ReservationDataService.createNewReservation(this.dates, this.unitData.id)
                    .then((response) => {
                        if (response.status === 200) {
                            // on ferme le formulaire 
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