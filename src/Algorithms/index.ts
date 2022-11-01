import Cell from "../Models/Cell";
import Plot from "../Models/Plot";
import iterative, { Iterative } from "./Framework/IterativeConstructor";
import recursive, { Recursive } from "./Framework/RecursiveConstructor";
import randomisedDepthFirst from "./Generators/randomisedDepthFirst";
import depthFirst from "./Solvers/depthFirst";

export type GetChildNodes = (plot: Plot) => Array<Cell>;
export type InsertChildNodes = (plot: Plot, children: Array<Cell>) => void;
export type AlgorithmConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solutionFinder?: ((plot: Plot) => boolean) | undefined
) => Recursive | Iterative;

export const constructors = {
  iterative,
  recursive,
};

export const generators = { randomisedDepthFirst };

export const solvers = { depthFirst };

export type algorithmType = keyof typeof algorithms;
export const algorithms = { ...solvers, ...generators };

export const algorithmBuilder = (
  type: keyof typeof constructors,
  algorithm: algorithmType,
  solution?: (plot: Plot) => boolean
): Recursive | Iterative => {
  const { insertChildNodes, getChildNodes } = algorithms[algorithm];
  return constructors[type](getChildNodes, insertChildNodes, solution);
};
