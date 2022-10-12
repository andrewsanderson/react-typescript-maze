import Cell from "./Cell";
import { Neighbors } from "./Cell";

interface MazeConfig {
  width: number;
  height: number;
}

class Maze {
  width = 0;
  height = 0;
  nodes: Array<Cell> = [];

  constructor(config: MazeConfig) {
    this.width = config.width;
    this.height = config.height;
    this.create();
    this.generateNeighbors();
    console.log(this.nodes);
  }
  /**
   * Build the nodes for this maze's configuration
   */
  create() {
    let id = 0;
    for (const x of [...Array(this.height).keys()]) {
      for (const y of [...Array(this.width).keys()]) {
        const cell = new Cell(
          id++, // unique cell id
          { x, y } //coordinates
          // No neighbours to start with
        );
        this.nodes.push(cell);
      }
    }
  }

  generateNeighbors() {
    this.nodes.map((node) => {
      return Object.keys(node.neighbors).map((direction) => {
        const neighborsCoordinates = node.generateCoordinates(
          direction as keyof Neighbors
        );
        const neighbor =
          this.nodes.find((cell) => {
            return (
              JSON.stringify(neighborsCoordinates) ===
              JSON.stringify(cell.coordinates)
            );
          }) || null;
        return node.addNeighbour(neighbor, direction as keyof Neighbors);
      });
    });
  }

  winConditions(node: Cell) {
    return node.cellComparator(this.nodes[this.nodes.length - 1]);
  }

  // given a iterative cycler solve the solution here
  solve() {}
}

export default Maze;
