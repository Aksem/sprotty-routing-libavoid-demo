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
html, body {
  margin: 0;
  padding: 0;
}
</style>
