<template>
    <v-sheet rounded>
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model="formIsValid" @submit.prevent="onSubmit">
                <v-container>
                    <v-row>
                        <v-col v-if="errorMessages" cols="12" sm="12">
                            <v-alert v-if="errorMessages" type="error" class="my-3">
                                <ul>
                                    <li v-for="message in errorMessages" :key="message">
                                        {{ message }}
                                    </li>
                                </ul>                
                            </v-alert>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="currentUnit.name" :readonly="loading"
                                :rules="[v => !!v || this.t('fieldIsRequired', [this.t('name')])]" :label="t('name')"
                                required class="mb-2" clearable></v-text-field>

                        </v-col>
                        <v-col cols="12" sm="6">

                            <v-text-field v-model="currentUnit.displayPricing" :readonly="loading"
                                :rules="[v => !!v || this.t('fieldIsRequired', [this.t('price')])]" :label="t('price')"
                                required class="mb-2" clearable></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field v-model="currentUnit.quantity" :readonly="loading"
                                :rules="[v => !!v || this.t('fieldIsRequired', [this.t('quantity')])]"
                                :label="t('quantity')" required class="mb-2" clearable></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea auto-grow v-model="currentUnit.description" :readonly="loading"
                                :rules="[v => !!v || this.t('fieldIsRequired', [this.t('description')])]"
                                :label="t('description')" required class="mb-2" clearable></v-textarea>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">

                            <!--add icon check for all tags -->
                            <v-switch v-for="tag in tags" color="primary" v-bind:key="tag.id" v-model="tag.isSelected"
                                :label="t(tag.text)"></v-switch>



                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-switch color="primary" v-model="currentUnit.isTaxable" :label="t('taxable')"></v-switch>
                        </v-col>

                    </v-row>
                </v-container>

                <br>

                <v-btn :disabled="!formIsValid" :loading="loading" class="float-right" color="info" size="large"
                    prepend-icon="mdi-check" type="submit" variant="elevated">
                    <div v-if="!!currentUnit.id">
                        <span>{{ t("edit") }}</span>
                    </div>
                    <div v-else>
                        <span>{{ t("create") }}</span>
                    </div>
                </v-btn>
                <v-btn class="float-right mx-3" color="default" size="large" @click="closeForm()" variant="elevated"
                    prepend-icon="mdi-cancel">
                    {{ t("cancel") }}
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>
<script>


import UnitDataService from "../../services/UnitDataService";
import { useI18n } from 'vue-i18n'


export default {
    name: 'UnitForm',
    props: {
        closeForm: { type: Function },
        id: { type: String },
    },
    setup() {
        const { t } = useI18n()
        return {
            t
        };
    },
    data: () => ({
        formIsValid: false,

        currentUnit: {
            id: null,
            displayPricing: null,
            name: null,
            description: null,
            quantity: null,
            isTaxable: null,
            tags: [],
        },

        tags: [
            {
                text: 'heated',
                value: 0,
                isSelected: false,
                icon: 'mdi-fire',
            },
            {
                text: 'allTimeAccess',
                icon: 'mdi-open-in-new',
                isSelected: false,
                value: 1,
            }
        ],
        loading: false,
        errorMessages: null,
    }),
    mounted() {

        if (this.id) {
            this.loading = true
            UnitDataService.getById(this.id).then((response) => {
                this.currentUnit = response.data

                this.tags.forEach(tag => {
                    this.currentUnit.tags.forEach(currentTag => {
                        if (tag.value === currentTag) {
                            tag.isSelected = true
                        }
                    })
                })

            }).finally(() => {
                this.loading = false
            })
        }
    },
    methods: {
        async onSubmit() {
            if (!this.formIsValid) return

            this.loading = true

            this.currentUnit.tags = this.tags.filter(tag => tag.isSelected).map(tag => tag.value)


            let result = !this.currentUnit.id
                ? UnitDataService.createNewOne(this.currentUnit)
                : UnitDataService.updateById(this.currentUnit.id, this.currentUnit);

            result.then((response) => {
                if (response.status === 200) {
                    this.closeForm()
                }
                else {
                    console.warn(response)
                }

            }).catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.errorMessages = error.response.data.errors
                }
                else {
                    this.errorMessages = error.response.message
                }
            }).finally(() => {
                this.loading = false
            });



        },
        required(v) {
            return !!v || this.t("fieldIsRequired")
        },
    },
}
</script>