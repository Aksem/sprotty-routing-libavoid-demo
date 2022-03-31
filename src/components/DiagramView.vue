<template>
  <div class="sprotty-diagram">
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
    }
  },

  mounted() {
    const func = async () => {
      this.container = await createDiagram();
    }
    func();
  },

  beforeUnmount() {
    if (this.container) {
      destroyDiagram(this.container);
    }
  }
});
</script>

<style>
.sprotty {
  height: 100%;
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
