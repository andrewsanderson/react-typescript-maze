import Cell from "../Maze/Cell";
import Node from "./Node";

export type GetChildren<NodeValue> = (
  current: Node<NodeValue>
) => Array<NodeValue>;
export type InsertChildren<NodeValue> = (
  stack: Stack<NodeValue>,
  children: Array<Node<NodeValue>>
) => void;
export type MutateChildren<NodeValue> = (node: Node<NodeValue>) => void;
export type SolutionFinder<NodeValue> = (node: Node<NodeValue>) => boolean;

/**
 * Provides class functionality for modifying the queue via pushing and sorting.
 */
class Stack<NodeType> {
  #nodes: Array<Node<NodeType>> = [];
  constructor(rootNode: Node<NodeType>) {
    this.#nodes.push(rootNode);
  }

  private *generator() {
    while (!!this.nextNode) {
      yield this.nextNode;
    }
  }

  *[Symbol.iterator]() {
    yield* this.generator();
  }

  get nextNode() {
    const queuedNode = this.#nodes.find((node) => {
      return node.status === "queued";
    });
    const touchedNode = this.#nodes.reverse().find((node) => {
      return node.status === "touched";
    });
    this.#nodes.reverse();

    return queuedNode || touchedNode || false;
  }

  queue(...nodes: Array<Node<NodeType>>) {
    for (const node of nodes) {
      this.#nodes.push(node);
    }
  }

  sort(sortMethod: (a: Node<NodeType>, b: Node<NodeType>) => number) {
    const firstQueuedIndex = this.#nodes.findIndex((node) => {
      return node.status === "queued";
    });
    const queueSize = this.#nodes.length - firstQueuedIndex;
    const queuedNodes = this.#nodes.splice(firstQueuedIndex, queueSize);
    queuedNodes.sort(sortMethod);
    this.#nodes.push(...queuedNodes);
  }

  hasValue(value: NodeType) {
    return !!this.#nodes.find((node) => {
      return node.value === value;
    });
  }
  values() {
    const ret: Array<Node<NodeType>> = this.#nodes.map((node) => {
      return Object.assign(Object.create(Object.getPrototypeOf(node)), node);
    });
    return ret;
  }
}

/**
 * An iteratable object that builds a tree while it searches for the provided solution.
 */
class Tree<NodeType> {
  /**
   * The stack of nodes represented as a 1D array.
   */
  stack: Stack<NodeType>;

  /**
   * The method used to acquire children when provided the context of the current node.
   */
  getChildren: GetChildren<NodeType>;

  /**
   * How children acquired from the current node context will be inserted into the stack.
   * Mutate the node at this stage if necessary
   */
  insertChildren: InsertChildren<NodeType>;

  /**
   * Method used to identify if the current node is the 'solution' to the tree.
   */
  solutionFinder?: SolutionFinder<NodeType>;

  /**
   * An array containing the path to the solution. The end node (solution) will come first.
   */
  solution?: Array<Node<NodeType>>;

  constructor(
    rootValue: NodeType,
    getChildren: GetChildren<NodeType>,
    insertChildren: InsertChildren<NodeType>,
    solutionFinder?: SolutionFinder<NodeType>
  ) {
    const rootNode: Node<NodeType> = new Node(rootValue);
    this.stack = new Stack(rootNode);
    this.getChildren = getChildren;
    this.insertChildren = insertChildren;
    this.solutionFinder = solutionFinder;
  }

  /**
   * Iterates over the nodes in the stack, modifying it while progressing.
   */
  *generator() {
    for (const currentNode of this.stack) {
      // If the current node is the solution, push the solution up.
      if (!!this.solutionFinder && this.solutionFinder(currentNode)) {
        this.solution = currentNode.path;
      }

      // Get children of the current node.
      const children = this.getChildren(currentNode);

      // Filter out children that are already in the queue. Create Nodes from the remainder.
      const filteredChildren = children
        .filter((child) => {
          return !this.stack.hasValue(child);
        })
        .map((filteredChild) => {
          return new Node(filteredChild, currentNode);
        });

      // If there are new children then insert them into the stack using the defined method.
      // Otherwise mark the current node as exhausted and progress.
      if (filteredChildren.length > 0) {
        currentNode.status = "touched";
        this.insertChildren(this.stack, filteredChildren);
      } else {
        currentNode.status = "exhausted";
      }
      // Return the current node.
      yield this.stack.values();
    }
  }

  *[Symbol.iterator]() {
    yield* this.generator();
  }
}

export default Tree;
