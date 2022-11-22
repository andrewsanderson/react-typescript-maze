import Cell, { Neighbors } from "./Cell";

interface Config {
  width: number;
  height: number;
}

class Graph {
  width = 0;
  height = 0;
  cells: Array<Cell> = [];

  constructor(config: Config) {
    this.width = config.width;
    this.height = config.height;
    this.initialise();
  }

  getRandomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }

  /**
   *
   * @param maze the maze the cell exists within
   * @param direction the direction from the current cell of the neighbor we're searching for.
   * @returns the neighboring cell if the cell has one ni that direction, otherwise it returns null.
   */
  peekNeighbor(cell: Cell, direction: keyof Neighbors) {
    const neighborCoordinates = cell.generateNeighborCoordinates(direction);
    return (
      this.cells.find((cell) => {
        return (
          JSON.stringify(neighborCoordinates) ===
          JSON.stringify(cell.coordinates)
        );
      }) || null
    );
  }

  /**
   * Build the cells for this Maze's configuration
   */
  initialise() {
    let id = 0;
    for (const y of [...Array(this.height).keys()]) {
      for (const x of [...Array(this.width).keys()]) {
        const cell = new Cell(
          id++, // unique Cell id
          { x, y } //coordinates
          // No neighbours to start with
        );
        this.cells.push(cell);
      }
    }
  }
}

export default Graph;
