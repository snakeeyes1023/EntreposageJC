<template>
    <v-card>
        <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px" cover>
            <v-card-title class="text-white" v-text="card.name"></v-card-title>
        </v-img>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'UnitCard',
    props: {
        card : {
            type: Object,
            required: true,
        },
        
    },
}
</script>