import { Container, ContainerModule } from "inversify";
import {
    TYPES, configureViewerOptions, SGraphView, ConsoleLogger, LogLevel, loadDefaultModules,
    LocalModelSource, CircularNode, configureModelElement, SGraph, PolylineEdgeView
} from 'sprotty';
import { LibavoidRouter, RouteType, LibavoidEdge } from 'sprotty-routing-libavoid';

import { CircleNodeView } from "./views.js";

const circlegraphModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.log);

    bind(LibavoidRouter).toSelf().inSingletonScope();
    bind(TYPES.IEdgeRouter).toService(LibavoidRouter);

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, SGraphView);
    configureModelElement(context, 'node:circle', CircularNode, CircleNodeView);
    configureModelElement(context, 'edge:straight', LibavoidEdge, PolylineEdgeView, {
        // disable: [selectFeature]
    });
    configureViewerOptions(context, {
        needsClientLayout: false
    });
});

export const createDiagramContainer = () => {
    const container = new Container();
    loadDefaultModules(container);
    container.load(circlegraphModule);

    const router = container.get(LibavoidRouter);
    router.setOptions({
        routingType: RouteType.Orthogonal,
        segmentPenalty: 50,
        idealNudgingDistance: 4,
        nudgeOrthogonalSegmentsConnectedToShapes: true,
        nudgeOrthogonalTouchingColinearSegments: true
    });

    return container;
};

export const destroyDiagramContainer = (container) => {
    container.unbindAll();
    container.unload(circlegraphModule);
}
