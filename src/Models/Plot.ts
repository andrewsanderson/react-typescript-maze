import Cell from "./Cell";
import Graph from "./Graph";

type GetChildNodes = (path: Plot) => Array<Cell>;

type InsertChildNodes = (path: Plot, children: Array<Cell>) => void;

export type SolutionFinder = {
  getChildNodes: GetChildNodes;
  insertChildNodes: InsertChildNodes;
};

class Plot {
  queued: Array<Cell> = [];
  current: Array<Cell> = [];
  exhausted: Array<Cell> = [];
  errors: Array<"string"> = [];
  solutions: Array<Array<Cell>> = [];
  maze: Graph;
  constructor(maze: Graph) {
    this.maze = maze;
    this.queued = [maze.cells[0]];
  }

  get currentNode() {
    return this.current.at(-1)!;
  }

  get currentPath() {
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

  allNodesExplored() {
    return this.exhausted.length === this.maze.cells.length - 1;
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
          const keys: keyof Plot = key as keyof Plot;
          return this[keys] === queue;
        });
      }
    }
  }
}

export default Plot;
