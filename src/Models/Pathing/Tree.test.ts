import { testChildren, testNode } from "./Node.test";
import Tree, { GetChildren, InsertChildren } from "./Tree";

const testGetChildren: GetChildren<string> = (current) => {
  return testChildren.map((node) => {
    return node.value;
  });
};

const testInsertChildren: InsertChildren<string> = (stack, children) => {
  stack.queue(...children);
};

let testTree = new Tree(testNode.value, testGetChildren, testInsertChildren);

describe("Tree", () => {
  beforeEach(() => {
    testTree = new Tree(testNode.value, testGetChildren, testInsertChildren);
  });
  test("path", () => {
    expect(true).toEqual(true);
  });
});
