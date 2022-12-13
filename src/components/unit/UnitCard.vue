<template>
    <v-card>
        <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px" cover>
            <v-card-title class="text-white" v-text="card.name"></v-card-title>
        </v-img>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" prepend-icon="mdi-calendar">
                Réserver
            </v-btn>

            <v-divider vertical class="mx-5"></v-divider>
            <v-btn variant="outlined" color="warning" prepend-icon="mdi-pencil-outline" @click="this.updateUnit()">
                Modifier
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
</template>

<script>
import UnitDataService from "../../services/UnitDataService";
import UnitForm from "@/components/unit/UnitForm.vue";

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
            showDialog: false
        };
    },
    methods: {
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
        updateUnit() {          
            this.showDialog = true
        },
        closeForm() {
            this.showDialog = false
            this.$emit('refreshUnits')
        }
    },
    components: { UnitForm }

}
</script>