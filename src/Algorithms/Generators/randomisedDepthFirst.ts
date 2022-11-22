import { getNeighborsOfCurrentNode, randomNumber, shuffle } from ".";
import Cell from "../../Models/Maze/Cell";
import Graph from "../../Models/Maze/Graph";
import Tree, { GetChildren, InsertChildren } from "../../Models/Pathing/Tree";

/**
 *
 * ref: <a>https://en.wikipedia.org/wiki/Depth-first_search</a>
 *
 * Choose the initial cell, mark it as visited and push it to the stack
 *
 * While the stack is not empty
 *
 * &nbsp; Pop a cell from the stack and make it a current cell
 *
 * &nbsp;If the current cell has any neighbours which have not been visited
 *
 * &nbsp;&nbsp; Push the current cell to the stack
 *
 * &nbsp;&nbsp; Choose one of the unvisited neighbours
 *
 * &nbsp;&nbsp; Remove the wall between the current cell and the chosen cell
 *
 * &nbsp;&nbsp;  Mark the chosen cell as visited and push it to the stack
 *
 *
 * @param maze the maze that is to be generated using this method.
 * @returns the cells of the maze are mutated within the function so no return is necessary but the maze is returned in case the functionality needs adapting.
 */
const randomisedDepthFirst = (maze: Graph) => {
  // Method for acquiring children.
  const getChildren: GetChildren<Cell> = (currentNode) => {
    return getNeighborsOfCurrentNode(currentNode.value, maze);
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
    maze.cells[randomNumber(maze.height * maze.width - 1)],
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
