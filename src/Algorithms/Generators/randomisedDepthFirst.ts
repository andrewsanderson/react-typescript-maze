import Pathing from "../../Models/Pathing";
import Map from "../../Models/Graph";
import Cell, { Neighbors } from "../../Models/Cell";
import { shuffle } from "../../utils";
import { algorithmConstructor } from "../Framework";

const childAcquisition = (maze: Map) => {
  const { pathing } = maze;
  const { queued, current, exhausted } = pathing;

  const currentNode = pathing.getCurrentNode();

  // acquire children as array that are not null
  const possibleChildren: Array<Cell> = Object.keys(currentNode.neighbors)
    .map((direction) => {
      return currentNode.findNeighbor(maze, direction as keyof Neighbors);
    })
    .filter((node): node is Cell => !!node);

  // filter children out that are already queued, in the current branch, already exhausted
  const useableChildren = possibleChildren.filter((child) => {
    return !(
      queued.includes(child) ||
      current.includes(child) ||
      exhausted.includes(child)
    );
  });
  const shuffledChildren = shuffle(useableChildren);
  return shuffledChildren;
};

const pathMutation = (path: Pathing, children: Array<Cell>) => {
  const currentNode = path.current.at(-1)!;
  currentNode.addNeighbour(children[0]);
  path.queued.push(children[0]);
};

const randomisedDepthFirst = (constructor: algorithmConstructor) => {
  return constructor(childAcquisition, pathMutation);
};

export default randomisedDepthFirst;
