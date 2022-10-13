import Node from "./Node";

class Path {
  queued: Array<Node> = [];
  traversed: Array<Node> = [];
  exhausted: Array<Node> = [];
  constructor(startingNode: Node) {
    this.queued = [startingNode];
  }
  backStep() {}
  forwardStep() {
    // get first one in queue
  }
  childAcquisition = () => {};

  pathMutation = () => {};
}

export default Path;
