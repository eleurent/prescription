/**
 * A Node represents a single decision in a Decision Graph.
 *
 * It is identified by a name, and its decision rule is a function
 * that takes a context as an input, optionally modified it, and returns
 * the name of a child Node in the graph, if any.
 */
class Node {
  name: string;
  rule: Function;

  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

/**
 * A full Decision Graph representing a series of decisions.
 *
 * It is defined by its set of Nodes, and its root, the initial node.
 */
class Graph {
  root: string;
  nodes: Array<Node>;

  constructor(root, nodes) {
    this.nodes = new Map(nodes.map(node => [node.name, node]));
    this.root = this.nodes.get(root)
  };

  traverse(data) {
    let path = [];
    let context = {...data};
    let node = {...this.root};
    while (node) {
      let next = ("rule" in node) ? node.rule(context) : null;
      path.push({node: node, context: {...context}});
      if (this.nodes.has(next))
        node = {...this.nodes.get(next)};
      else {
        node.terminal = true;
        node = null;
      }
    }
    return path
  }
}

export {Node, Graph};
