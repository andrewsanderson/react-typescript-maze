import Graph from "../../Models/Graph";
import { GetChildNodes, InsertChildNodes, forwardStep, backStep } from ".";
import { allNodesExplored } from ".";

const iterativeConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solver?: (maze: Graph) => boolean
) => {
  const returnFn = (maze: Graph, steps?: number): Graph => {
    let i = !!steps ? steps : 999;
    while (!allNodesExplored(maze) && i > 0) {
      const { current, queued } = maze.pathing;
      current.push(queued.shift()!);
      if (!!solver && solver(maze)) {
        maze.pathing.solutions.push(maze.pathing.getCurrentPath());
      }

      const children = getChildNodes(maze)!;
      if (children.length > 0) {
        forwardStep(insertChildNodes, maze.pathing, children);
      } else {
        backStep(maze.pathing);
      }
      i--;
    }
    return maze;
  };
  return returnFn;
};

export default iterativeConstructor;
