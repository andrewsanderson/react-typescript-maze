import Cell from "../../Models/Maze/Cell";
import Maze from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";
import Node from "../../Models/Pathing/Node";

/**
 *
 * ref: <a>https://en.wikipedia.org/wiki/A*_search_algorithm</a>
 *
 * @param maze the maze to be solved using an informed algorithm that prioritises cells via a Manhattan distance calculator.
 * @returns a tree of nodes. The generator of which will return all nodes in the tree, in order to globally updates statuses.
 */
const aStarManhattan = (maze: Maze) => {
  // Get previews of neighboring cells as children.
  const getChildren: GetChildren<Cell> = (currentNode) => {
    const children = Object.values(currentNode.value.neighbors).filter(
      (neighbor) => {
        return neighbor !== null;
      }
    ) as Array<Cell>;

    return children;
  };

  const calculateManhattan = (cell: Cell, goal: Cell) => {
    return (
      Math.abs(cell.coordinates.x - goal.coordinates.x) +
      Math.abs(cell.coordinates.y - goal.coordinates.y)
    );
  };

  // insert all children into the queue.
  const insertChildren: InsertChildren<Cell> = (queue, children) => {
    queue.queue(...children);
    queue.sort((a, b) => {
      const aWeight = calculateManhattan(a.value, maze.cells.at(-1)!);
      const bWeight = calculateManhattan(b.value, maze.cells.at(-1)!);
      return aWeight === bWeight ? 0 : aWeight > bWeight ? 1 : -1;
    });
  };

  // Solution is when the last node is found
  const solver = (node: Node<Cell>) => {
    return node.value.id === maze.width * maze.height - 1;
  };

  // Create a tree forom the above settings.
  const tree = new Tree(maze.cells[0], getChildren, insertChildren, solver);

  return tree;
};

export default aStarManhattan;
