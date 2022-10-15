<template>
    <div class="grid mx-5 home-section">

        <n-grid cols="1 s:1 m:1" responsive="screen">
            <n-grid-item>
                <div class="title">
                    Une solution d'entreposage automatisé
                </div>
                <div class="subtitle">
                    Uniti est une solution d'entreposage automatisé qui permet de stocker et de récupérer des objets
                    de manière autonome.
                </div>

                <n-button class="float-right mt-2" strong secondary round type="info" >
                    <template #icon>
                        <n-icon>
                            <cash-icon />
                        </n-icon>
                    </template>
                    Trouver un entrepôt
                </n-button>


            </n-grid-item>
        </n-grid>
    </div>
</template>



<script>

import { CashOutline as CashIcon } from "@vicons/ionicons5";


export default {
    name: 'HomePresentation',
    data: () => ({
        active: 0
    })
    , components: {
        CashIcon
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    font-size: 3.5em;
    font-weight: 900;
    line-height: 1.2;
    text-align: right;
    font-family: 'Barlow', sans-serif;
}

.subtitle {
    font-size: 1.5em;
    color: dimgray;
    font-weight: 400;
    margin-top: 20px;
    line-height: 1.2;
    text-align: right;
    font-family: 'Barlow', sans-serif;
    width: 100%;
}
</style>
  