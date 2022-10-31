import { GetChildNodes, InsertChildNodes } from "..";
import Graph from "../../Models/Graph";
import Plot from "../../Models/Plot";
import step from "./Step";

export type Iterative = (maze: Graph) => Plot;

const iterativeConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solutionFinder?: (plot: Plot) => boolean
) => {
  const iterative = (maze: Graph): Plot => {
    const plot = new Plot(maze);
    while (!plot.allNodesExplored()) {
      step(plot, getChildNodes, insertChildNodes);
      if (!!solutionFinder && solutionFinder(plot)) {
        plot.solutions.push(plot.currentPath);
      }
      console.log(plot.solutions);
    }
    return plot;
  };
  return iterative;
};

export default iterativeConstructor;
