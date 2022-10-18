import Map from "./Map";
import Node from "./Node";

type ChildAcquisition = (path: Pathing, maze: Map) => Array<Node>;

type PathMutation = (path: Pathing, children: Array<Node>) => void;

export type Solver = {
  childAcquisition: ChildAcquisition;
  pathMutation: PathMutation;
};

class Pathing {
  maze: Map;
  queued: Array<Node> = [];
  current: Array<Node> = [];
  exhausted: Array<Node> = [];
  constructor(maze: Map, startingNode: Node) {
    this.maze = maze;
    this.queued = [startingNode];
  }
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
  backStep() {
    this.exhausted.push(this.queued.pop()!);

    this.queued.push(this.current.pop()!);
  }
  forwardStep(pathMutation: PathMutation, children: Array<Node>) {
    this.current.push(this.queued.shift()!);
    pathMutation(this, children);
  }
  step(solver: Solver) {
    const { childAcquisition, pathMutation } = solver;
    const children = childAcquisition(this, this.maze);
    if (children.length > 0) {
      this.forwardStep(pathMutation, children);
    } else if (this.queued.length === 1) {
      console.log(this.queued);
      this.backStep();
    }
    return this.maze;
  }
}

export default Pathing;
