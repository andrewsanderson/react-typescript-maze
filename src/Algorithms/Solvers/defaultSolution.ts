import Graph from "../../Models/Graph";

const defaultSolution = (maze: Graph) => {
  if (maze.pathing.getCurrentNode().id === maze.cells.at(-1)!.id) {
    return true;
  } else {
    return false;
  }
};

export default defaultSolution;
