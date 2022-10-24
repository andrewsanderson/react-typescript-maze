import Cell from "./Cell";
import Pathing from "./Pathing";

export type WinConditions = (cell: Cell) => boolean;

interface Config {
  width: number;
  height: number;
}

class Graph {
  width = 0;
  height = 0;
  cells: Array<Cell> = [];
  pathing: Pathing;

  constructor(config: Config) {
    this.width = config.width;
    this.height = config.height;
    this.initialise();
    this.pathing = new Pathing(this, this.cells[0]);
  }

  getRandomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }

  resetPath() {
    this.pathing = new Pathing(this, this.cells[0]);
  }

  /**
   * Build the cells for this Graph's configuration
   */
  initialise() {
    let id = 0;
    for (const y of [...Array(this.height).keys()]) {
      for (const x of [...Array(this.width).keys()]) {
        const cell = new Cell(
          this,
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
