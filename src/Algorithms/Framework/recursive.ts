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
    // If a solution is found, push it to the solutions.
    if (!!solver && solver(maze)) {
      const isFound = maze.pathing.solutions.find((solution) => {
        return (
          solution
            .map((node) => {
              return node.id;
            })
            .toString() ===
          maze.pathing.current
            .map((node) => {
              return node.id;
            })
            .toString()
        );
      });
      console.log(isFound);
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
