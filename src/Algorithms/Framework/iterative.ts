import Graph from "../../Models/Graph";
import { GetChildNodes, InsertChildNodes, forwardStep, backStep } from ".";
import { allNodesExplored } from ".";

const iterativeConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solver?: (maze: Graph) => boolean
) => {
  const returnFn = (maze: Graph) => {
    while (!allNodesExplored(maze)) {
      const { current, queued } = maze.pathing;
      current.push(queued.shift()!);
      if (!!solver && solver(maze)) {
        maze.pathing.solutions.push(maze.pathing.getCurrentPath());
        console.log("sol", maze.pathing.solutions);
      }

      const children = getChildNodes(maze)!;
      if (children.length > 0) {
        forwardStep(insertChildNodes, maze.pathing, children);
      } else {
        backStep(maze.pathing);
      }
    }
    return maze;
  };
  return returnFn;
};

export default iterativeConstructor;
