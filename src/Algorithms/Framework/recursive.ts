import Graph from "../../Models/Graph";
import {
  GetChildNodes,
  InsertChildNodes,
  forwardStep,
  backStep,
  Recursive,
} from ".";
import { allNodesExplored } from ".";

const recursiveConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solver?: (maze: Graph) => boolean
) => {
  const returnFn: Recursive = (maze: Graph) => {
    if (!!solver && solver(maze)) {
      maze.pathing.solutions.push(maze.pathing.getCurrentPath());
    }
    if (!allNodesExplored(maze)) {
      return maze;
    } else {
      const children = getChildNodes(maze);
      if (children.length > 0) {
        forwardStep(insertChildNodes, maze.pathing, children);
      } else {
        backStep(maze.pathing);
      }
      return returnFn(maze);
    }
  };
  return returnFn;
};

export default recursiveConstructor;
