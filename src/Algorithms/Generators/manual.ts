import { getNeighborsOfCurrentNode } from ".";
import Cell from "../../Models/Maze/Cell";
import Graph from "../../Models/Maze/Graph";
import Node from "../../Models/Pathing/Node";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";

const manual = (maze: Graph, startCell: Cell, endCell: Cell) => {
  const getChildren: GetChildren<Cell> = (currentNode) => {
    return getNeighborsOfCurrentNode(currentNode.value, maze);
  };

  const calculateStraightLine = (cell: Cell, goal: Cell) => {
    const xDif = Math.abs(cell.coordinates.x - goal.coordinates.x);
    const yDif = Math.abs(cell.coordinates.y - goal.coordinates.y);

    return Math.sqrt(xDif * xDif + yDif * yDif);
  };

  // Solution is when the last node is found
  const solver = (node: Node<Cell>) => {
    return node.value === endCell;
  };

  // insert all children into the queue.
  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    const nChildren: Array<Node<Cell>> = [...children];
    nChildren.sort((a, b) => {
      const aWeight = calculateStraightLine(a.value, endCell);
      const bWeight = calculateStraightLine(b.value, endCell);

      return aWeight === bWeight ? 0 : aWeight > bWeight ? 1 : -1;
    });

    const firstNode = nChildren[0];
    queue.queue(firstNode);
    !!firstNode.parent && firstNode.value.addNeighbour(firstNode.parent.value);
  };

  const tree = new Tree(startCell, getChildren, insertChildren, solver);

  // iterate over the nodes and return void as we don't want to do anything with them.
  for (const item of tree) {
    void item;
  }

  return maze;
};

export default manual;
