<template>
    <div class="home-section">
        <div class="p-2" v-for="unit in Units" :key="unit.id">
            <n-space vertical>
                <n-card>
                    <template #header>
                        <n-skeleton v-if="loading" text width="60%" />
                        <template v-else>
                            {{ unit.name }}

                            <n-space>
                                <n-tag v-for="tag in unit.tags" :key="tag" :bordered="false" type="info">

                                    <div v-if="tag == 0">Chauffer et climatisé</div>
                                    <div v-else>Nouvelle arrivage</div>
                                </n-tag>
                            </n-space>
                        </template>
                    </template>
                    <n-skeleton v-if="loading" text :repeat="3" />
                    <template v-else>
                        {{ unit.description }}
                    </template>
                </n-card>
            </n-space>
        </div>
    </div>
</template>


<script>

import UnitDataService from "../../services/UnitDataService";
import { useNotification } from "naive-ui";
//import ref
import { ref } from "vue";

export default {
    name: 'HomeUnitList',
    methods: {

        retrieveUnits() {

            UnitDataService.getAll()
                .then(response => {
                    this.Units = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    this.ShowErrorNotification(this);
                })
                .finally(() => {
                    if (this.loading) {
                        setTimeout(() => this.loading = false, 2000);
                    }
                });
        },
        ShowErrorNotification() {

            const notification = useNotification();

            notification['error']({
                content: 'What to say?',
                meta: "I don't know",
                duration: 2500,
                keepAliveOnHover: true
            })
        }
    },
    mounted() {
        this.retrieveUnits();
    },
    setup() {
        return {
            Units: ref([
                { id: 1, name: "Unit 1", description: "Unit 1 Description" },
                { id: 2, name: "Unit 2", description: "Unit 2 Description" },
                { id: 3, name: "Unit 3", description: "Unit 3 Description" },
            ]),
            loading: ref(true)
        };
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  