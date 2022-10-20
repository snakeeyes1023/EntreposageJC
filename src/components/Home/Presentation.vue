<template>
    <div class="grid p-5 home-section">

        <n-grid cols="1 s:1 m:1" responsive="screen">
            <n-grid-item>
                <div class="title">
                    Une solution d'entreposage automatisé
                </div>
                <div class="subtitle">
                    Uniti est une solution d'entreposage automatisé qui permet de stocker et de récupérer des objets
                    de manière autonome.
                </div>
                <n-button to="/login" class="float-right mt-2 " size="large"  strong secondary round   color="#8a2be2" type="tertiary">
                    <template #icon>
                        <n-icon>
                            <cash-icon />
                        </n-icon>
                    </template>
                    Se connecter
                </n-button>
                <n-button to="/login" class="float-right mt-2 " size="large"  strong secondary round type="info">
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
/*import { mapGetters } from "vuex";*/


export default {
    name: 'HomePresentation',
    data: () => ({
        active: 0
    })
    , components: {
        CashIcon
    },
    /*computed: {
        ...mapGetters(["isLoggedIn"])
    }*/
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.home-section {
    min-height: 60vh;
    padding-right: 5rem;
}
.title {
    font-size: 4.5em;
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
    margin-bottom: 20px;
    line-height: 1.2;
    text-align: right;
    font-family: 'Barlow', sans-serif;
    width: 100%;
}
</style>
  