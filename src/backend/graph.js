class Node {
  name: string;
  rule: Function;

  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

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
