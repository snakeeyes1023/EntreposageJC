<template>
    <v-container fluid>
        <v-row>
            <v-col :cols="12">
                <v-btn color="" class="float-right my-5" prepend-icon="mdi-plus" @click="showDialog = true">
                    {{ t("createNewUnit") }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-container fluid>
        <v-row dense>
            <v-col v-for="card in units" :key="card.id" :cols="4">
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
            langs: ['fr', 'en'],
        };
    },
    setup() {
        const { t } = useI18n()
        return {
            t
        };
    },
    methods: {
        retrieveUnits() {
            UnitDataService.getAll()
                .then(response => {
                    this.units = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
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