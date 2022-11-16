import { shuffle } from ".";
import Cell, { Neighbors } from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Get children by peeking over walls.
const randomisedDepthFirst = (maze: Maze) => {
  const getChildren: GetChildren<Cell> = (currentNode) => {
    const children = Object.keys(currentNode.value.neighbors)
      .map((direction) => {
        return maze.peekNeighbor(
          currentNode.value,
          direction as keyof Neighbors
        );
      })
      .filter((child) => {
        return child !== null;
      }) as Array<Cell>;
    return children;
  };

  // Insert these nodes one at a time.
  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    shuffle(children);
    const firstNode = children[0];
    !!firstNode.parent && firstNode.value.addNeighbour(firstNode.parent.value);
    queue.queue(firstNode);
  };

  // Creaete a tree from the above settings.
  const tree = new Tree(
    maze.cells[randomIntFromInterval(0, maze.height * maze.width - 1)],
    getChildren,
    insertChildren
  );

  // iterate over the nodes and return void as we don't want to do anything with them.
  for (const item of tree) {
    void item;
  }

  return maze;
};

export default randomisedDepthFirst;
