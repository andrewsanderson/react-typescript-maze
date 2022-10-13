import e from "express";
import Map from "./Map";

export interface Coordinates {
  x: number;
  y: number;
}

export type Neighbors = {
  up: Node | null;
  right: Node | null;
  down: Node | null;
  left: Node | null;
};

/**
 *
 * @param direction the initial direction.
 *
 * @returns the inverse of the provided 'direction' parameter as a string.
 */
const inverseDirection = (direction: keyof Neighbors): keyof Neighbors => {
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
};

class Node {
  id: number;
  coordinates: Coordinates;
  neighbors: Neighbors = {
    up: null,
    right: null,
    down: null,
    left: null,
  };

  constructor(id: number, coordinates: Coordinates) {
    this.id = id;
    this.coordinates = coordinates;
  }

  /**
   *
   * @param node the node to compare this one to.
   * @returns true if they share x and y coordinates, otherwise it returns false.
   */
  compareToNode(node: Node): boolean {
    return (
      node.coordinates.x === this.coordinates.x &&
      node.coordinates.y === this.coordinates.y
    );
  }

  /**
   *
   * @param maze the maze the node exists within
   * @param direction the direction from the current node of the neighbor we're searching for.
   * @returns the neighboring cell if the node has one ni that direction, otherwise it returns null.
   */
  findNeighbor(maze: Map, direction: keyof Neighbors) {
    const neighborCoordinates = this.generateNeighborCoordinates(direction);
    return (
      maze.nodes.find((Node) => {
        return (
          JSON.stringify(neighborCoordinates) ===
          JSON.stringify(Node.coordinates)
        );
      }) || null
    );
  }

  /**
   *
   * @param direction the direction from the current node we're generating coordinates for.
   * @returns assumed coordinates of the neighbororing cell to the current node in the provided direction. Will not throw errors if coordinates are out of bounds.
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
   * @param node the node we're looking to discern the direction of, when compared to the current node.
   * @returns the direction of the supplied node if it is neighboring the current node, otherwise it will log the error.
   */
  getNodeDirection(node: Node) {
    const xdif = this.coordinates.x - node.coordinates.x;
    const ydif = this.coordinates.y - node.coordinates.y;

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
   * @param direction the direction the Node will be added.
   * @param Node the Node to be added.
   */
  addNeighbour(Node: Node) {
    const direct = this.getNodeDirection(Node)!;
    const inverse = inverseDirection(direct);
    this.neighbors[direct] = Node;
    if (!!Node) {
      Node.neighbors[inverse] = this;
    }
  }
}

export default Node;
