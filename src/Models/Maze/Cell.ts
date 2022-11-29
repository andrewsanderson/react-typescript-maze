export interface Coordinates {
  x: number;
  y: number;
}

export type Neighbors = {
  top: Cell | null;
  right: Cell | null;
  bottom: Cell | null;
  left: Cell | null;
};

class Cell {
  id: number;
  coordinates: Coordinates;
  neighbors: Neighbors = {
    top: null,
    right: null,
    bottom: null,
    left: null,
  };

  constructor(id: number, coordinates: Coordinates) {
    this.id = id;
    this.coordinates = coordinates;
  }

  /**
   *
   * @param direction the initial direction.
   * @returns the inverse of the provided 'direction' parameter, as a string.
   */
  inverseDirection(direction: keyof Neighbors): keyof Neighbors {
    const directions = ["top", "right", "bottom", "left"];
    const currentDirectionIndex = directions.indexOf(direction);
    return directions[(currentDirectionIndex + 2) % 4] as keyof Neighbors;
  }

  /**
   *
   * @param direction the direction from the current cell we're generating coordinates for.
   * @returns assumed coordinates of the neighbororing cell to the current cell in the provided direction. Will not throw errors if coordinates are out of bounds.
   */
  generateNeighborCoordinates(direction: keyof Neighbors) {
    let { x, y } = { ...this.coordinates };
    switch (direction) {
      case "top":
        y--;
        break;
      case "right":
        x++;
        break;
      case "bottom":
        y++;
        break;
      case "left":
        x--;
        break;
    }
    return { x, y };
  }

  get cellString() {
    return (
      this.id +
      ":" +
      JSON.stringify(
        Object.values(this.neighbors).map((node) => {
          return node?.id;
        })
      )
    );
  }

  /**
   *
   * @param cell the cell we're looking to discern the direction of, when compared to the current cell.
   * @returns the direction of the stopplied cell if it is neighboring the current cell, otherwise it will log the error.
   */
  getCellDirection(cell: Cell | null) {
    if (cell !== null) {
      const xdif = this.coordinates.x - cell.coordinates.x;
      const ydif = this.coordinates.y - cell.coordinates.y;

      // Switch case hell, fix some how
      if (xdif > 1 || ydif > 1) {
        console.log("OOB non-neighbor");
      } else {
        switch ([xdif, ydif].toString()) {
          // top
          case [0, 1].toString():
            return "top";
          // right
          case [-1, 0].toString():
            return "right";
          // bottom
          case [0, -1].toString():
            return "bottom";
          // left
          case [1, 0].toString():
            return "left";
        }
      }
    } else {
      return undefined;
    }
  }

  /**
   *
   * @param direction the direction the Cell will be added.
   * @param Cell the Cell to be added.
   */
  addNeighbour(cell: Cell) {
    if (!!cell) {
      const direct = this.getCellDirection(cell)!;
      const inverse = this.inverseDirection(direct);
      this.neighbors[direct] = cell;

      cell.neighbors[inverse] = this;
    }
  }
}

export default Cell;
