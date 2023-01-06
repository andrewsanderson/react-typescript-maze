import styled from "styled-components";
import { Circle } from "./CellComponent";

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20px;
  padding-right: 40px;
`;

const Label = styled("div")`
  padding-left: 20px;
  margin: 10px;
`;

// Key to outline the styles of the pathing nodes.
const KeyComponent = () => {
  return (
    <Wrapper>
      <Label>Exhausted:</Label>
      <Circle solutionIndex={-1} status="exhausted" interval={0} />
      <Label> Visited:</Label>
      <Circle solutionIndex={-1} status="touched" interval={0} />
      <Label> Queued:</Label>
      <Circle solutionIndex={-1} status="queued" interval={0} />
      <Label> Solution:</Label>
      <Circle solutionIndex={-1} status={undefined} interval={0} />
    </Wrapper>
  );
};

export default KeyComponent;
