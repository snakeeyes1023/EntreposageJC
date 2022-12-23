<template>
    <v-card class="mx-auto" max-width="480" min-width="400">
        <v-card-item :title="$t('percentageInUse')">
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
                <v-list-item-subtitle>{{ vacationData.totalUsed }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-cube-outline">
                <v-list-item-subtitle>{{ vacationData.totalUnits }}</v-list-item-subtitle>
            </v-list-item>
        </div>
    </v-card>


    <v-card class="mx-auto" max-width="480" min-width="400">
        <v-card-item :title="$t('averageReservationDuration')">
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h2" cols="12">
                    {{ totalDays }} {{ $t("days") }}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import StatsDataService from "../../services/StatsDataService";

export default {
    name: 'GlobalStats',
    data() {
        return {
            vacationData: {
                totalUnits: 0,
                totalUsed: 0,
                pourcentageVacation: 0
            },
            averageDays: {
                days: 0
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


            StatsDataService.getAverageReservationDays()
                .then(response => {
                    if (response.status == 200) {
                        this.averageDays = response.data;
                    }
                }).catch(e => {
                    console.log(e);
                });
        },
    },
    computed: {
        totalDays: {
            // getter
            get() {
                return this.averageDays.days == 0 ? this.$t("noData") : ~~this.averageDays.days;
            },
        }
    }
}
</script>