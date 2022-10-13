import Node from "./Node";

export type WinConditions = (node: Node) => boolean;

interface Config {
  width: number;
  height: number;
}

class Map {
  width = 0;
  height = 0;
  nodes: Array<Node> = [];

  constructor(config: Config) {
    this.width = config.width;
    this.height = config.height;
    this.initialise();
  }

  /**
   * Build the nodes for this Map's configuration
   */
  initialise() {
    let id = 0;
    for (const y of [...Array(this.height).keys()]) {
      for (const x of [...Array(this.width).keys()]) {
        const node = new Node(
          id++, // unique Node id
          { x, y } //coordinates
          // No neighbours to start with
        );
        this.nodes.push(node);
      }
    }
  }
}

export default Map;