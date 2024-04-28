<template>
  <div class="container">
    <!-- #3 must use the component-->
    <Header mytitle="Watch Collection" 
      aboutpage ="About Watches" />
    
    <Watchbox :watches="watches"/>
    <About aboutme="About" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import About from './components/About.vue'
import Watchbox from './components/Watchbox.vue'

export default {
  name: 'App',
  components: {
    Header,
    Watchbox,
    About
  },
  data(){
    return {
      watches: []
    }
  },
  methods: {
    async fetchWatches(){
      try {
        const res = await fetch('https://final-node-mluu.onrender.com/api')
        const data = await res.json()
        return data
      } catch (error) {
        console.error('Error fetching watch data:', error)
        return []
      }
    }
  },
  async created(){
    this.watches = await this.fetchWatches()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: #e5e5e5;
}

.container {
  max-width: 400px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 0.3em solid black;
  padding: 30px;
  border-radius: 5px;
  background-color: #fca311;
}

div {
  margin-bottom: 0.5em;
}
</style>
