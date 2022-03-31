import 'reflect-metadata';
import { TYPES } from 'sprotty';
import { load as loadRouting } from 'sprotty-routing-libavoid';

import { createDiagramContainer, destroyDiagramContainer } from './di-config.js';

const NODE_SIZE = 60;

export const createDiagram = async () => {
  await loadRouting();

  let count = 2;
  function addNode(bounds) {
    const newNode = {
      id: 'node' + count,
      type: 'node:circle',
      position: {
        x: bounds.x + Math.random() * (bounds.width - NODE_SIZE),
        y: bounds.y + Math.random() * (bounds.height - NODE_SIZE),
      },
      size: {
        width: NODE_SIZE,
        height: NODE_SIZE,
      },
    };
    const newEdge = {
      id: 'edge' + count,
      type: 'edge:straight',
      sourceId: 'node0',
      targetId: 'node' + count,
      routerKind: "libavoid",
    };
    count++;
    return [newNode, newEdge];
  }

//   function focusGraph() {
//     const graphElement = document.getElementById('graph');
//     if (graphElement !== null && typeof graphElement.focus === 'function') graphElement.focus();
//   }

  function getVisibleBounds({ canvasBounds, scroll, zoom }) {
    return {
      ...scroll,
      width: canvasBounds.width / zoom,
      height: canvasBounds.height / zoom,
    };
  }

  const container = createDiagramContainer();
//   const dispatcher = container.get(TYPES.IActionDispatcher);
  const modelSource = container.get(TYPES.ModelSource);

  // Initialize model
  const node0 = {
    id: 'node0',
    type: 'node:circle',
    position: { x: 100, y: 100 },
    size: { width: NODE_SIZE, height: NODE_SIZE },
  };
  const graph = { id: 'graph', type: 'graph', children: [node0] };

  const initialViewport = await modelSource.getViewport();
  for (let i = 0; i < 32; ++i) {
    const newElements = addNode(getVisibleBounds(initialViewport));
    graph.children.push(...newElements);
  }

  // Run
  modelSource.setModel(graph);

  return container;
}

export const destroyDiagram = destroyDiagramContainer;
