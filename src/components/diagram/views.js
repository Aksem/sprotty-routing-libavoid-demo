import { injectable } from 'inversify';
import { h } from 'snabbdom';
import { ShapeView } from 'sprotty';


@injectable()
export class MainNodeView extends ShapeView {
  render(node, context) {
    if (!this.isVisible(node, context)) {
      return undefined;
    }
    const size = this.getSize(node);
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
            x: size,
            y: size + 7,
            'class-sprotty-text': true,
          },
        },
        node.id.substr(4)
      ),
    ]);
  }

  getSize(node) {
    const d = Math.min(node.size.width, node.size.height);
    return d > 0 ? d / 2 : 0;
  }
}
