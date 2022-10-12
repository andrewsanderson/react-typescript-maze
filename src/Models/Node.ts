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

class Node {
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

  NodeComparator(Node: Node) {
    return (
      Node.coordinates.x === this.coordinates.x &&
      Node.coordinates.y === this.coordinates.y
    );
  }

  /**
   * This finds neigubors based of the coordinates of the current node
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

  getNodeDirection(node: Node) {
    const xdif = this.coordinates.x - node.coordinates.x;
    const ydif = this.coordinates.y - node.coordinates.y;

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
      default:
        console.log("OOB non-neighbor");
    }
  }

  /**
   *
   * @param direction the direction the Node will be added.
   * @param Node the Node to be added.
   */
  addNeighbour(Node: Node) {
    const direct = this.getNodeDirection(Node)!;
    const inverse = this.inverseDirection(direct);
    this.neighbors[direct] = Node;
    if (!!Node) {
      Node.neighbors[inverse] = this;
    }
  }
}

export default Node;
