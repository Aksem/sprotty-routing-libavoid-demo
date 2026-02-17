import { Container, ContainerModule } from "inversify";
import {
  TYPES,
  configureViewerOptions,
  SGraphView,
  ConsoleLogger,
  LogLevel,
  loadDefaultModules,
  LocalModelSource,
  RectangularNode,
  configureModelElement,
  SGraphImpl,
  PolylineEdgeView,
  EdgeRouterRegistry,
} from "sprotty";
import {
  LibavoidRouter,
  RouteType,
  LibavoidEdge,
  LibavoidEllipseAnchor,
  LibavoidDiamondAnchor,
  LibavoidRectangleAnchor,
} from "sprotty-routing-libavoid";

import { MainNodeView } from "./views.js";

const exampleGraphModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.log);

    bind(LibavoidRouter).toSelf().inSingletonScope();
    bind(TYPES.IEdgeRouter).toService(LibavoidRouter);
    bind(TYPES.IAnchorComputer).to(LibavoidDiamondAnchor).inSingletonScope();
    bind(TYPES.IAnchorComputer).to(LibavoidEllipseAnchor).inSingletonScope();
    bind(TYPES.IAnchorComputer).to(LibavoidRectangleAnchor).inSingletonScope();

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, "graph", SGraphImpl, SGraphView);
    configureModelElement(
      context,
      "node:square",
      RectangularNode,
      MainNodeView
    );
    configureModelElement(
      context,
      "edge:straight",
      LibavoidEdge,
      PolylineEdgeView,
      {}
    );
    configureViewerOptions(context, {
      needsClientLayout: false,
    });
  }
);

export const createDiagramContainer = () => {
  const container = new Container();
  loadDefaultModules(container);
  container.load(exampleGraphModule);

  const router = container.get(LibavoidRouter);
  router.setOptions({
    routingType: RouteType.Orthogonal,
    segmentPenalty: 50,
    idealNudgingDistance: 4,
    nudgeOrthogonalSegmentsConnectedToShapes: true,
    nudgeOrthogonalTouchingColinearSegments: true,
  });

  return container;
};

export const destroyDiagramContainer = (container) => {
  container.unbindAll();
  container.unload(exampleGraphModule);
};
