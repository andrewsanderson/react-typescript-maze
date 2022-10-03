class Node {
  uid: number = 0;
  children: { [key: string]: Node } = {};

  constructor(uid: number, children?: { [key: string]: Node }) {
    this.uid = uid;
    this.children = children || {};
  }
}

export default Node;
