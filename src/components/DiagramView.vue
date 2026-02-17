<template>
  <div class="sprotty-diagram">
    <input v-model="nodes" type="number"> Nodes
    <input v-model="randomNodes" type="checkbox"> Random
    <button @click="updateDiagram">Update</button>
    <div id="sprotty" class="sprotty" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import "sprotty/css/sprotty.css";

import { createDiagram, destroyDiagram } from './diagram/diagram.js';

export default defineComponent({
  name: 'DiagramView',

  data() {
    return {
      container: null,
      nodes:25,
      randomNodes: false,
    }
  },

  watch: {
    nodes(newValue) {
      try {
        localStorage.setItem('nodes', JSON.stringify(newValue));
      } catch (e) {
        console.log(e);
        console.log('LS is unavailable');
      }
      this.updateDiagram();
    },

    randomNodes(newValue) {
      try {
        localStorage.setItem('randomNodes', JSON.stringify(newValue));
      } catch (e) {
        console.log(e);
        console.log('LS is unavailable');
      }
      this.updateDiagram();
    }
  },

  mounted() {
    try {
      const randomNodesRawValue = localStorage.getItem('randomNodes');
      this.randomNodes = randomNodesRawValue !== null ? JSON.parse(randomNodesRawValue) : false;
      const nodesRawValue = localStorage.getItem('nodes');
      this.nodes = nodesRawValue !== null ? JSON.parse(nodesRawValue) : 25;
    } catch (e) {
      console.log(e);
      console.log('LS is unavailable');
    }

    this.updateDiagram();
  },

  beforeUnmount() {
    if (this.container) {
      destroyDiagram(this.container);
    }
  },

  methods: {
    async updateDiagram() {
      console.log('update');
      if (this.container) {
        console.log('destroy')
        destroyDiagram(this.container);
      }

      this.container = await createDiagram(this.nodes, this.randomNodes);
    },
  },
});
</script>

<style>
.sprotty-diagram {
  height: 100vh;
}

.sprotty {
  height: calc(100% - 34px);
}

.sprotty-diagram svg {
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.sprotty-diagram svg:focus {
  outline: none;
}

.sprotty-diagram rect {
  stroke: #ccc;
  fill: transparent;
}

.sprotty-node {
  fill: #aae;
  stroke: #66b;
  stroke-width: 3;
}

.sprotty-text {
    font-size: 16pt;
    text-anchor: middle;
}

.sprotty-edge {
    fill: none;
    stroke: #488;
    stroke-width: 2;
}

.sprotty-node.mouseover {
    stroke-width: 6;
}

.sprotty-node.selected {
    stroke: #dd8;
    stroke-width: 6;
}

.sprotty-missing {
    stroke-width: 1;
    stroke: #f00;
    fill: #f00;
    font-family: SansSerif;
    font-size: 14pt;
    text-anchor: middle;
}
</style>
