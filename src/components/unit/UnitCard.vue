<template>
    <v-card class="my-4">
        <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8)">
            <v-card-title class="text-white">
                <v-row class="py-5 px-3">
                    <span>{{ card.name }}</span>
                    <span class="pricing">
                        ({{ card.displayPricing }}$)
                    </span>

                    <v-spacer></v-spacer>

                    <v-btn  size="large" icon color="info" class="mx-3">
                        {{ card.totalAvailable }}
                    </v-btn>


                    <v-btn variant="outlined" size="large" icon color="info" @click="toggleVisibility">
                        <v-badge :content="card.totalInUsed" color="error">
                            <v-icon v-if="cardIsShown">mdi-eye-outline</v-icon>
                            <v-icon v-else>mdi-eye-off-outline</v-icon>
                        </v-badge>
                    </v-btn>
                </v-row>
            </v-card-title>
        </v-img>

        <v-card-text>
            <v-row>
                <v-col cols="12" sm="12">
                    <h5><b>{{ t("description") }}:</b></h5>
                </v-col>
                <v-col cols="12" sm="6">
                    <p>{{ card.description }}</p>
                </v-col>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" :disabled="card.totalAvailable <= 0" prepend-icon="mdi-calendar" @click="this.reserve()">
                {{ t("reserve") }}
            </v-btn>

            <v-divider vertical class="mx-5"></v-divider>
            <v-btn variant="outlined" color="warning" prepend-icon="mdi-pencil-outline" @click="this.updateUnit()">
                {{ t("edit") }}
            </v-btn>

            <v-btn variant="" color="error" icon="mdi-delete-outline" @click="this.deleteUnit()">
            </v-btn>

        </v-card-actions>
    </v-card>
    <v-row justify="center">
        <v-dialog height="auto" class="customBackground" v-model="showDialog" persistent>
            <UnitForm :close-form="closeForm" :id="card.id" />
        </v-dialog>
    </v-row>
    <v-row justify="center">
        <v-dialog max-height="600px" max-width="600px" class="customBackground" v-model="showReservationDialog"
            persistent>
            <ReservationForm :close-form="closeReservationForm" :unitData="card" />
        </v-dialog>
    </v-row>
</template>


<style>
.pricing {
    font-size: 1.5rem;
    font-weight: 500;
    color: #ff9800;
}
</style>

<script>
import UnitDataService from "../../services/UnitDataService";
import UnitForm from "@/components/unit/UnitForm.vue";
import ReservationForm from "../reservation/ReservationForm.vue";
import { useI18n } from "vue-i18n";

export default {
    name: 'UnitCard',
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showDialog: false,
            showReservationDialog: false,
            cardIsShown: true
        };
    },
    setup() {
        const { t } = useI18n()
        return {
            t
        };
    },
    mounted() {
        this.cardIsShown = this.card.show;
    },
    methods: {
        /**
         * Supprime l'unité
         */
        deleteUnit() {
            UnitDataService.deleteById(this.card.id).then((response) => {
                if (response.status === 200) {
                    try {
                        this.$emit('refreshUnits')
                    }
                    catch (e) {
                        console.warn(e)
                    }
                }
                else {
                    console.error(response)
                }
            })
        },
        /**
         * Ouvre le formulaire de modification
         */
        updateUnit() {
            this.showDialog = true
        },
        /**
         * Ferme le formulaire de modification
         */
        closeForm() {
            this.showDialog = false
            this.$emit('refreshUnits')
        },
        /**
         * Ferme le formulaire de réservation
         */
        closeReservationForm() {
            this.showReservationDialog = false
            this.$emit('refreshUnits')
        },
        /**
         * Ouvre le formulaire de réservation
         */
        reserve() {
            this.showReservationDialog = true
        },
        /**
         * Affiche ou cache l'unités
         */
        async toggleVisibility() {
            await UnitDataService.updateVisibility(this.card.id, !this.cardIsShown);

            this.cardIsShown = !this.cardIsShown;
        }
    },
    components: { UnitForm, ReservationForm }

}
</script>