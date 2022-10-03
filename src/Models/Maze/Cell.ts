import Node from "../Pathing/Node";

interface Coordinates {
  x: number;
  y: number;
}

type Neighbours = {
  up?: Cell;
  right?: Cell;
  down?: Cell;
  left?: Cell;
};

type direction = "up" | "right" | "down" | "left";

/**
 * @param id unique id of the cell
 * @param coordinates the x and y value of the
 * @param neighbours
 */
class Cell extends Node {
  coordinates: Coordinates = { x: 0, y: 0 };
  neighbours: Neighbours = {};

  /**
   *
   * @param id cell
   * @param coordinates
   * @param neighbours
   */
  constructor(id: number, coordinates: Coordinates, neighbours?: Neighbours) {
    super(id, neighbours);
    this.coordinates = coordinates;
  }

  /**
   *
   * @param direction the initial direction.
   *
   * @returns the inverse of the provide 'direction' parameter as a string.
   */
  inverseDirection(direction: direction): direction {
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
   * @param direction the direction the cell will be added.
   * @param cell the cell to be added.
   */
  addNeighbour(direction: direction, cell: Cell) {
    const inverse = this.inverseDirection(direction);
    this.neighbours[direction] = cell;
    cell.neighbours[inverse] = this;
  }
}

export default Cell;
