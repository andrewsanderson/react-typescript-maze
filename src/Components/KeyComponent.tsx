import styled from "styled-components";
import { Circle } from "./CellComponent";

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 20px;
`;

const Label = styled("div")`
  padding: 10px;
  padding-left: 20px;
`;

const KeyComponent = () => {
  return (
    <Wrapper>
      <Label>Exhausted:</Label>
      <Circle solutionIndex={-1} status="exhausted" interval={0} />
      <Label> Visited:</Label>
      <Circle solutionIndex={-1} status="touched" interval={0} />
      <Label> Queued:</Label>
      <Circle solutionIndex={-1} status="queued" interval={0} />
      <Label> In Solution:</Label>
      <Circle solutionIndex={1} status="exhausted" interval={0} />
    </Wrapper>
  );
};

export default KeyComponent;
