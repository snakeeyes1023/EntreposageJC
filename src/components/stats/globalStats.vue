<template>
    <v-card class="mx-auto" max-width="480" min-width="400">
        <v-card-item title="Total capacitée">
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h2" cols="12">
                    {{ vacationData.pourcentageVacation }}%
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-account-group-outline">
                <v-list-item-subtitle>{{vacationData.totalUsed}}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-cube-outline">
                <v-list-item-subtitle>{{vacationData.totalUnits}}</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn @click="refreshData" prepend-icon="mdi-refresh">
                Rafraîchir les données
            </v-btn>
        </v-card-actions>
    </v-card>


    <v-card class="mx-auto" max-width="480" min-width="400">
        <v-card-item title="Total par status">
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h2" cols="12">
                    {{ vacationData.pourcentageVacation }}%
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-account-group-outline">
                <v-list-item-subtitle>{{vacationData.totalUsed}}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-cube-outline">
                <v-list-item-subtitle>{{vacationData.totalUnits}}</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn @click="refreshData" prepend-icon="mdi-refresh">
                Rafraîchir les données
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import StatsDataService from "../../services/StatsDataService";

export default {
    name: 'GlobalStats',
    data() {
        return {
            vacationData : {
                totalUnits: 0,
                totalUsed: 0,
                pourcentageVacation: 0
            }
            
        }
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            StatsDataService.getTotalVacation()
            .then(response => {
                if (response.status == 200) {
                    this.vacationData = response.data;                    
                }
            }).catch(e => {
                console.log(e);
            });
        },
    }
}
</script>