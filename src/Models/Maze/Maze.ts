import Cell from "./Cell";

interface MazeConfig {
  width: number;
  height: number;
}

class Maze {
  width = 0;
  height = 0;
  cells: Array<Cell> = [];

  constructor(config: MazeConfig) {
    this.width = config.width;
    this.height = config.height;
    this.create();
  }

  /**
   * Build the cells for this maze's configuration
   */
  create() {
    let id = 0;
    for (const x of [...Array(this.height).keys()]) {
      for (const y of [...Array(this.width).keys()]) {
        const cell = new Cell(
          id++, // unique cell id
          { x, y } //cooldinates
          // No neighbours to start with
        );
        this.cells.push(cell);
      }
    }
  }

  /**
   *
   * @returns Cells grouped by columns for easier rendering
   */
  rows(): Array<Array<Cell>> {
    return [...Array(this.height).keys()].map((y) => {
      return this.cells
        .filter((cell) => cell.coordinates.y === y)
        .sort((a, b) => a.coordinates.y - b.coordinates.y);
    });
  }
}

export default Maze;
