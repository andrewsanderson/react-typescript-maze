import breadthFirst from "./breadthFirst";
import depthFirst from "./depthFirst";
import djikstras from "./djikstras";
import aStarManhattan from "./aStarManhattan";

const solvers = {
  "Breadth First": breadthFirst,
  "Depth First": depthFirst,
  Djikstras: djikstras,
  "A* Manhattan": aStarManhattan,
};

export default solvers;
