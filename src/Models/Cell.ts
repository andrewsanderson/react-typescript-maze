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
  neighbors: Neighbors;
  constructor(id: number, coordinates: Coordinates, neighbors?: Neighbors) {
    this.id = id;
    this.coordinates = coordinates;
    this.neighbors = neighbors || {
      up: null,
      right: null,
      down: null,
      left: null,
    };
  }

  cellComparator(cell: Cell) {
    return (
      cell.coordinates.x === this.coordinates.x &&
      cell.coordinates.y === this.coordinates.y
    );
  }

  /**
   *
   * @param direction the initial direction.
   *
   * @returns the inverse of the provide 'direction' parameter as a string.
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

  generateCoordinates(direction: keyof Neighbors) {
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
   * @param direction the direction the cell will be added.
   * @param cell the cell to be added.
   */
  addNeighbour(cell: Cell | null, direction: keyof Neighbors) {
    const inverse = this.inverseDirection(direction);
    this.neighbors[direction] = cell;
    if (!!cell) {
      cell.neighbors[inverse] = this;
    }
  }
}

export default Cell;
