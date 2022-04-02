import 'reflect-metadata';
import { TYPES } from 'sprotty';
import { load as loadRouting } from 'sprotty-routing-libavoid';

import { createDiagramContainer, destroyDiagramContainer } from './di-config.js';

const NODE_SIZE = 60;

export const createDiagram = async (nodesNumber, random) => {
  await loadRouting();

  let count = 2;
  function addNode(bounds, index) {
    const factor = random ? Math.random() : 0.15 + (0.09 * index);
    const newNode = {
      id: 'node' + count,
      type: 'node:square',
      position: {
        x: bounds.x + factor * (bounds.width - NODE_SIZE),
        y: bounds.y + factor * (bounds.height - NODE_SIZE),
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

  function getVisibleBounds({ canvasBounds, scroll, zoom }) {
    return {
      ...scroll,
      width: canvasBounds.width / zoom,
      height: canvasBounds.height / zoom,
    };
  }

  const container = createDiagramContainer();
  const modelSource = container.get(TYPES.ModelSource);

  // Initialize model
  const node0 = {
    id: 'node0',
    type: 'node:square',
    position: { x: 100, y: 100 },
    size: { width: NODE_SIZE, height: NODE_SIZE },
  };
  const graph = { id: 'graph', type: 'graph', children: [node0] };

  const initialViewport = await modelSource.getViewport();
  for (let i = 0; i < nodesNumber; ++i) {
    const newElements = addNode(getVisibleBounds(initialViewport), i);
    graph.children.push(...newElements);
  }

  // Run
  modelSource.setModel(graph);

  return container;
}

export const destroyDiagram = destroyDiagramContainer;
