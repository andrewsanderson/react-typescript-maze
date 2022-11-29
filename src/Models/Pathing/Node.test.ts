import Node from "./Node";

export let testNode = new Node("A");
export let testChildren = ["B", "C"].map((value) => {
  return new Node(value, testNode);
});

describe("Node", () => {
  beforeEach(() => {
    testNode = new Node("A");
    testChildren = ["B", "C"].map((value) => {
      return new Node(value, testNode);
    });
  });
  test("path", () => {
    expect(testChildren[0].path).toEqual([testNode, testChildren[0]]);
  });
});
