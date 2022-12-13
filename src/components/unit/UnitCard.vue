<template>
    <v-card>
        <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px" cover>
            <v-card-title class="text-white" v-text="card.name"></v-card-title>
        </v-img>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn  color="success" prepend-icon="mdi-calendar">
                Réserver
            </v-btn>

            <v-divider vertical class="mx-5"></v-divider>
            <v-btn variant="outlined" color="warning" prepend-icon="mdi-pencil-outline">
                Modifier
            </v-btn>

            <v-btn variant="" color="error" icon="mdi-delete-outline" @click="this.deleteUnit()" >
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
import UnitDataService from "../../services/UnitDataService";

export default {
    name: 'UnitCard',
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    methods : {
        deleteUnit() {
            UnitDataService.deleteById(this.card.id).then((response) => {
                if (response.status === 200)
                {
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
        }
    }
}
</script>