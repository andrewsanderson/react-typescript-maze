// import Cell, { Neighbors } from "../../Models/Maze/Cell";
// import Maze from "../../Models/Maze/Graph";
// // Start with a grid full of cells
// // Pick a cell, mark it as part of the maze. Add the neighbors of the cell to the neighbor.
// // While there are cells in the list:
// // Pick a random cell from the list. If only of the nieghbors is viisted
// // Make the wall a passage and mark the unvisited cell as part of the maze.
// // Add the neighboring walls of the cell to the wall list.
// // Remove the wall from the list.

// const randomIntFromInterval = (min: number, max: number) => {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const modifiedPrims = (maze: Maze) => {
//   let count = 100;
//   const getChildren = (currentNode: Cell) => {
//     return Object.keys(currentNode.neighbors)
//       .map((direction) => {
//         return maze.peekNeighbor(currentNode, direction as keyof Neighbors);
//       })
//       .filter((child) => {
//         return child !== null;
//       }) as Array<Cell>;
//   };
//   const mazeContains = (cell: Cell) => {
//     return !!mazeCells.includes(cell);
//   };
//   const mazeCells = [maze.cells[0]];
//   const queue = [...getChildren(mazeCells[0])];
//   while (queue.length > 0 && count > 0) {
//     // get random node from queue
//     const currentIndex = randomIntFromInterval(0, queue.length - 1);
//     const currentNode = queue[currentIndex];

//     console.log(mazeCells[mazeCells.length - 1]);
//     console.log("q", queue);

//     // get it's neighbors
//     const currentNeighbors = getChildren(currentNode);

//     // find which of these neighbors are in the maze
//     const possibleRoutes = Object.values(currentNode.neighbors).filter(
//       (cell) => cell !== null
//     ) as Array<Cell>;
//     count--;

//     // if only one of it's neighbors is in the maze
//     if (possibleRoutes.length > 0 && possibleRoutes.length < 2) {
//       // break the wall between a random neighbor in the maze and this
//       currentNode.addNeighbour(
//         possibleRoutes[randomIntFromInterval(0, possibleRoutes.length - 1)]
//       );

//       // add the current node to the maze
//       mazeCells.push(...queue.splice(currentIndex, 1));

//       // add the neighbors to the queue if they aren't already in the maze
//       queue.push(
//         ...currentNeighbors.filter((neighbor) => {
//           return !mazeContains(neighbor);
//         })
//       );
//     }
//   }
// };

// export default modifiedPrims;

export {};
