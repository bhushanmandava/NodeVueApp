<template>
    <div>
       <h2>{{ watch.name }}</h2>
       <h4>{{ watch.serialNumber }} - {{ watch.manufacturedYear }}</h4>
       <h4>{{ watch.movement }} - {{ watch.cost }} $</h4>
    </div>
</template>

<script>
export default {
    name: 'Watch',
    props: {
        watch: Object
    }
}
</script>

<style scoped>
h4 {
    margin: 2px;
}

div {
    background-color: #ffd60a;
    color: #003566;
    padding: 1em;
}
</style>
