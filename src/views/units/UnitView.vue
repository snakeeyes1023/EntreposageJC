<template>
    <v-card class="mx-auto">
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.id" :cols="4">
                    <v-card>
                        <v-img :src="card.src" class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
                            <v-card-title class="text-white" v-text="card.name"></v-card-title>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            
                            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

                            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
  
<script>

import UnitDataService from "../../services/UnitDataService";

export default {
    name: 'CustomUnitView',
    methods: {

        retrieveUnits() {

            UnitDataService.getAll()
                .then(response => {
                    this.Units = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    
                });
        }
    },
    mounted() {
        this.retrieveUnits();
    },
    setup() {
        return {
            Units: [
                { id: 1, name: "Unit 1", description: "Unit 1 Description" },
                { id: 2, name: "Unit 2", description: "Unit 2 Description" },
                { id: 3, name: "Unit 3", description: "Unit 3 Description" },
            ],
        };
    }
}
</script>