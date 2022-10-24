import Graph from "./Graph";
import Map from "./Graph";

export interface Coordinates {
  x: number;
  y: number;
}

export type Neighbors = {
  up: Cell | null;
  right: Cell | null;
  down: Cell | null;
  left: Cell | null;
};

class Cell {
  id: number;
  coordinates: Coordinates;
  neighbors: Neighbors = {
    up: null,
    right: null,
    down: null,
    left: null,
  };
  maze: Graph;

  constructor(maze: Graph, id: number, coordinates: Coordinates) {
    this.maze = maze;
    this.id = id;
    this.coordinates = coordinates;
  }

  /**
   *
   * @param direction the initial direction.
   *
   * @returns the inverse of the provided 'direction' parameter as a string.
   */
  inverseDirection(direction: keyof Neighbors): keyof Neighbors {
    switch (direction) {
      case "up":
        return "down";
      case "right":
        return "left";
      case "down":
        return "up";
      case "left":
        return "right";
    }
  }

  /**
   *
   * @param cell the cell to compare this one to.
   * @returns true if they share x and y coordinates, otherwise it returns false.
   */
  compareToCell(cell: Cell): boolean {
    return (
      cell.coordinates.x === this.coordinates.x &&
      cell.coordinates.y === this.coordinates.y
    );
  }

  /**
   *
   * @param maze the maze the cell exists within
   * @param direction the direction from the current cell of the neighbor we're searching for.
   * @returns the neighboring cell if the cell has one ni that direction, otherwise it returns null.
   */
  findNeighbor(maze: Map, direction: keyof Neighbors) {
    const neighborCoordinates = this.generateNeighborCoordinates(direction);
    return (
      maze.cells.find((Cell) => {
        return (
          JSON.stringify(neighborCoordinates) ===
          JSON.stringify(Cell.coordinates)
        );
      }) || null
    );
  }

  /**
   *
   * @param direction the direction from the current cell we're generating coordinates for.
   * @returns assumed coordinates of the neighbororing cell to the current cell in the provided direction. Will not throw errors if coordinates are out of bounds.
   */
  generateNeighborCoordinates(direction: keyof Neighbors) {
    let { x, y } = { ...this.coordinates };
    switch (direction) {
      case "up":
        y--;
        break;
      case "right":
        x++;
        break;
      case "down":
        y++;
        break;
      case "left":
        x--;
        break;
    }
    return { x, y };
  }

  /**
   *
   * @param cell the cell we're looking to discern the direction of, when compared to the current cell.
   * @returns the direction of the supplied cell if it is neighboring the current cell, otherwise it will log the error.
   */
  getCellDirection(cell: Cell) {
    const xdif = this.coordinates.x - cell.coordinates.x;
    const ydif = this.coordinates.y - cell.coordinates.y;

    if (xdif > 1 || ydif > 1) {
      console.log("OOB non-neighbor");
    } else {
      switch ([xdif, ydif].toString()) {
        // up
        case [0, 1].toString():
          return "up";
        // right
        case [-1, 0].toString():
          return "right";
        // down
        case [0, -1].toString():
          return "down";
        // left
        case [1, 0].toString():
          return "left";
      }
    }
  }

  /**
   *
   * @param direction the direction the Cell will be added.
   * @param Cell the Cell to be added.
   */
  addNeighbour(cell: Cell) {
    const direct = this.getCellDirection(cell)!;
    const inverse = this.inverseDirection(direct);
    this.neighbors[direct] = cell;
    if (!!cell) {
      cell.neighbors[inverse] = this;
    }
  }
}

export default Cell;
