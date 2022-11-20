class Node<NodeType> {
  /**
   * The status of this node in the current stack. Defaults to 'queued'.
   */
  status: "queued" | "touched" | "exhausted" = "queued";
  /**
   * The value of this node.
   */
  value: NodeType;
  /**
   * The immediate parent of this node.
   */
  readonly parent?: Node<NodeType>;
  constructor(value: NodeType, parent?: Node<NodeType>) {
    this.value = value;
    this.parent = parent;
  }
  /**
   *
   * @returns All parent nodes as an array. Current node at index 1.
   */
  get path(): Array<Node<NodeType>> {
    const parents = [];
    let currentNode: Node<NodeType> | undefined = this;
    while (currentNode !== undefined) {
      parents.push(currentNode);
      currentNode = currentNode.parent ? currentNode.parent : undefined;
    }
    return parents.reverse();
  }
}

export default Node;
