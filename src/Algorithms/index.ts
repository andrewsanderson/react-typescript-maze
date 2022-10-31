import Cell from "../Models/Cell";
import Plot from "../Models/Plot";
import iterativeConstructor, {
  Iterative,
} from "./Framework/IterativeConstructor";
import recursiveConstructor, {
  Recursive,
} from "./Framework/RecursiveConstructor";
import randomisedDepthFirst from "./Generators/randomisedDepthFirst";
import depthFirst from "./Solvers/depthFirst";

export type GetChildNodes = (plot: Plot) => Array<Cell>;
export type InsertChildNodes = (plot: Plot, children: Array<Cell>) => void;
export type AlgorithmConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solutionFinder?: ((plot: Plot) => boolean) | undefined
) => Recursive | Iterative;

const constructors = {
  iterative: iterativeConstructor,
  recursive: recursiveConstructor,
};

type solvers = "randomisedDepthFirst";
const solver = { randomisedDepthFirst };

type generators = "depthFirst";
const generator = { depthFirst };

const algorithms = { ...solver, ...generator };

export const builder = (
  type: "iterative" | "recursive",
  algorithm: solvers | generators,
  solution?: (plot: Plot) => boolean
) => {
  const { insertChildNodes, getChildNodes } = algorithms[algorithm];
  return constructors[type](getChildNodes, insertChildNodes, solution);
};
