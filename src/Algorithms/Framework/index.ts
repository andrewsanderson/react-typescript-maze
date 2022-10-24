import Cell from "../../Models/Cell";
import Graph from "../../Models/Graph";
import Pathing from "../../Models/Pathing";

export type GetChildNodes = (maze: Graph) => Array<Cell>;

export type InsertChildNodes = (path: Pathing, children: Array<Cell>) => void;

export type Recursive = (maze: Graph) => Graph | Recursive;

export type Iterative = (maze: Graph) => Graph;

export type Condition = (maze: Graph) => boolean;

export type algorithmConstructor = (
  getChildNodes: GetChildNodes,
  insertChildNodes: InsertChildNodes,
  solver?: (maze: Graph) => boolean
) => Recursive | Iterative;

export type Conditions = Array<Condition>;

export type SolveResult = { finished: boolean; solved: boolean };

// Conditions should have a reason to stop and then a success value denoting whether we reached a solution.

export const allNodesExplored = (maze: Graph) => {
  if (maze.pathing.exhausted.length >= maze.cells.length - 1) {
    return true;
  } else {
    return false;
  }
};

export const backStep = (pathing: Pathing) => {
  const { exhausted, queued, current } = pathing;
  exhausted.push(current.pop()!);

  if (queued.length === 0) {
    queued.push(current.pop()!);
  }
};

export const forwardStep = (
  insertChildNodes: InsertChildNodes,
  pathing: Pathing,
  children: Array<Cell>
) => {
  insertChildNodes(pathing, children);
};
