import Plot from "../../../Models/Plot";

/**
 *
 * @param plot in question.
 * @returns a boolean denoting if the current node in the path is the bottom-leftmost cell in the maze.
 */
const defaultSolution = (plot: Plot) => {
  if (!!plot.currentNode) {
    return plot.currentNode.id === plot.maze.cells.at(-1)!.id;
  } else return false;
};

export default defaultSolution;
