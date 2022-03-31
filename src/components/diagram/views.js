// import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from 'inversify';
import { h } from 'snabbdom';
import { ShapeView } from 'sprotty';

/**
 * A very simple example node consisting of a plain circle.
 */
@injectable()
export class CircleNodeView extends ShapeView {
  render(node, context) {
    if (!this.isVisible(node, context)) {
      return undefined;
    }
    const radius = this.getRadius(node);
    return h('g', {}, [
      h('rect', {
        attrs: {
          'class-sprotty-node': true,
          'class-selected': node.selected,
          'class-mouseover': node.hoverFeedback,
          width: node.size.width,
          height: node.size.height,
          rx: 8,
          ry: 8,
        },
      }),
      h(
        'text',
        {
          attrs: {
            x: radius,
            y: radius + 7,
            'class-sprotty-text': true,
          },
        },
        node.id.substr(4)
      ),
    ]);
  }

  getRadius(node) {
    const d = Math.min(node.size.width, node.size.height);
    return d > 0 ? d / 2 : 0;
  }
}
