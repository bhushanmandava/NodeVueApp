<template>
    <div class="watchbox">
        <div v-for="watch in watches" :key="watch.serialNumber">
            <Watch :watch="watch" />
        </div>
    </div>
</template>

<script>
import Watch from './watch.vue'

export default {
    name: 'Watchbox',
    components: {
        Watch
    },
    props: {
        watches: Array
    }
}
</script>

<style scoped>
.watchbox {
    background-color: #14213d;
    padding: 1em;
    color: yellow;
}
</style>
