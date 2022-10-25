import iterativeConstructor from "../../Algorithms/Framework/iterative";
import recursiveConstructor from "../../Algorithms/Framework/recursive";
import randomisedDepthFirst from "../../Algorithms/Generators/randomisedDepthFirst";
import breadthFirst from "../../Algorithms/Solvers/breadthFirst";
import depthFirst from "../../Algorithms/Solvers/depthFirst";

export const options = {
  algorithmTypes: [
    { title: "Recursive", fn: recursiveConstructor },
    { title: "Iterative", fn: iterativeConstructor },
  ],
  solvers: [
    { title: "breadthFirst", fn: breadthFirst },
    { title: "depthFirst", fn: depthFirst },
  ],
  generators: [{ title: "randomisedDepthFirst", fn: randomisedDepthFirst }],
};
