import Node from "./Node";
import map from "./Map";

export default interface Solver {
  solve(map: map, start: Node, end: Node): Array<Node> | false;
}
