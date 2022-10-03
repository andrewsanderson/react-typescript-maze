import Node from "./Node";
import Solver from "./Solver";

class Map {
  nodes: Array<Node>;

  constructor(nodes: Array<Node>) {
    this.nodes = nodes;
  }

  /**
   * Run a solver on the current maze
   *
   * @param start starting Node
   * @param end ending Node
   * @param solver the algorithm being used to solve this maze
   * @returns A solved path in the form of an array of Nodes or false if there's no solution
   */
  solve(start: Node, end: Node, solver: Solver): Array<Node> | false {
    return solver.solve(this, start, end);
  }
}

export default Map;
