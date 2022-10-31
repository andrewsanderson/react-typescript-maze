import Plot from "../../../Models/Plot";

const defaultSolution = (plot: Plot) => {
  if (!!plot.currentNode) {
    return plot.currentNode.id === plot.maze.cells.at(-1)!.id;
  } else return false;
};

export default defaultSolution;
