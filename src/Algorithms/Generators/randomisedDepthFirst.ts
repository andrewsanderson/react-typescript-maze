import { GetChildNodes } from "..";
import Cell, { Neighbors } from "../../Models/Cell";
import Plot from "../../Models/Plot";

const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const getChildNodes: GetChildNodes = (plot: Plot) => {
  const { queued, current, exhausted, currentNode } = plot;

  // acquire children as array that are not null
  const possibleChildren: Array<Cell> = Object.keys(currentNode.neighbors)
    .map((direction) => {
      return plot.maze.findNeighbor(currentNode, direction as keyof Neighbors);
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

const insertChildNodes = (path: Plot, children: Array<Cell>) => {
  const currentNode = path.currentNode;
  currentNode.addNeighbour(children[0]);
  path.queued.push(children[0]);
};

const randomisedDepthFirst = { getChildNodes, insertChildNodes };

export default randomisedDepthFirst;
