<script>
import { defineComponent } from 'vue';
import DiagramView from './components/DiagramView.vue'

export default defineComponent({
  components: {
    DiagramView
  }
})
</script>

<template>
  <DiagramView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
