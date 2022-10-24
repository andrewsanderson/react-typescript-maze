import Map from "./Graph";
import Node from "./Cell";

type GetChildNodes = (path: Pathing) => Array<Node>;

type InsertChildNodes = (path: Pathing, children: Array<Node>) => void;

export type SolutionFinder = {
  getChildNodes: GetChildNodes;
  insertChildNodes: InsertChildNodes;
};

class Pathing {
  maze: Map;
  queued: Array<Node> = [];
  current: Array<Node> = [];
  exhausted: Array<Node> = [];
  errors: Array<"string"> = [];
  solutions: Array<Array<Node>> = [];
  constructor(maze: Map, startingNode: Node) {
    this.maze = maze;
    this.queued = [startingNode];
  }

  getCurrentNode() {
    return this.current.at(-1)!;
  }

  getCurrentPath() {
    return [...this.current];
  }

  getSolutions(nodeId: number) {
    const solutionsIncludingNode: Array<number> = [];
    for (const [index, solution] of this.solutions.entries()) {
      for (const node of solution) {
        if (node.id === nodeId) {
          solutionsIncludingNode.push(index);
        }
      }
    }
    return solutionsIncludingNode;
  }

  // returns the status of the node by it's id.
  getStatus(id: number) {
    for (const queue of [this.queued, this.current, this.exhausted]) {
      if (
        queue.find((node) => {
          return node.id === id;
        })
      ) {
        return Object.keys(this).find((key) => {
          const keys: keyof Pathing = key as keyof Pathing;
          return this[keys] === queue;
        });
      }
    }
  }
}

export default Pathing;
