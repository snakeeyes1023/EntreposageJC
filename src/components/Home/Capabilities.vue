<template>
    <div class="process-timeline home-section">
        <n-config-provider theme="light">

            <n-timeline item-placement="left">
                <n-timeline-item type="info" title="Déterminer la grandeur désiré"
                    content="Vous pouvez utiliser le calculateur automatique" />
                <n-timeline-item type="info" title="Sélectionner l'entrepôt"
                    content="Parcourer les mulitples offre d'entrepôt disponnible" />
                <n-timeline-item type="info" title="Se rendre à l'entrepôt"
                    content="Se rendre à l'entrepôt physique " />
                <n-timeline-item type="success" title="Entrer le code reçu"
                    content="Le code vous sera transmis lors du premier paiement" />
            </n-timeline>
        </n-config-provider>
    </div>

</template>


<script>
export default {
    name: 'HomeCapabilties',
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.process-timeline {
    padding: 5rem 2rem 2rem 2rem;
    background-color: whitesmoke;
}

.n-timeline-item {
    padding-bottom: 2rem;
}
</style>
  