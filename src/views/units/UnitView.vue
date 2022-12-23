<template>
    <v-container fluid>
        <v-row>
            <v-col :cols="12" >
                <v-btn color="" class="float-right my-5" prepend-icon="mdi-plus" @click="showDialog = true">
                    {{ t("createNewUnit") }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-container fluid>

        <v-card width="100%">
            <v-card-title>
                <v-row>
                    <v-col cols="12">
                        <p>{{ t("priceFilter") }}</p>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col lg="10" md="12" sm="12" xs="12">
                        <v-range-slider v-model="priceFilter" :min="priceFilterLimit.min" :max="priceFilterLimit.max"
                            step="100" thumb-label="always"></v-range-slider>
                    </v-col>
                    <v-col lg="2" md="12" sm="12" xs="12" >
                        <v-btn color="primary" variant="outlined" class="float-right" width="100%"
                            prepend-icon="mdi-loupe" @click="retrieveUnits()">
                            {{ t("search") }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-row dense>
            <v-col v-for="card in units" :key="card.id"  lg="4" md="6" sm="12" xs="12">
                <UnitCard :card="card" @refreshUnits="retrieveUnits()" />
            </v-col>
        </v-row>
    </v-container>
    <v-row justify="center">
        <v-dialog height="auto" class="customBackground" v-model="showDialog" persistent>
            <UnitForm :close-form="closeForm" />
        </v-dialog>
    </v-row>
</template>
  
<script>

import UnitDataService from "../../services/UnitDataService";
import UnitForm from "@/components/unit/UnitForm.vue";
import UnitCard from "../../components/unit/UnitCard.vue";
import { useI18n } from "vue-i18n";

export default {
    name: "CustomUnitView",
    data() {
        return {
            showDialog: false,
            units: [],
            priceFilterLimit: {
                min: 0,
                max: 1000,
            },
            priceFilter: [0, 1000],

            customFilterApplied: false,
        };
    },
    setup() {
        const { t } = useI18n()
        return {
            t
        };
    },
    methods: {
        async retrieveUnits() {

            try {
                if (this.priceFilter[0] != this.priceFilterLimit.min || this.priceFilter[1] != this.priceFilterLimit.max) {
                    const filteredUnits = await UnitDataService.getBetweenPrice(this.priceFilter[0], this.priceFilter[1]);
                    this.units = filteredUnits.data;
                }
                else {
                    const allUnits = await UnitDataService.getAll();
                    this.units = allUnits.data;


                    this.priceFilterLimit.min = Math.min(...this.units.map(unit => unit.displayPricing));
                    this.priceFilterLimit.max = Math.max(...this.units.map(unit => unit.displayPricing));
                    this.priceFilter = [this.priceFilterLimit.min, this.priceFilterLimit.max];
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        closeForm() {
            this.showDialog = false;
            this.retrieveUnits();
        },
    },
    mounted() {
        this.retrieveUnits();
    },
    components: { UnitForm, UnitCard }
}
</script>

<style scoped>
.customBackground {
    background-color: #f5f5f5;
}
</style>