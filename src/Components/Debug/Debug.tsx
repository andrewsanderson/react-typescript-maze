import styled from "styled-components";

// Generating:
// time taken
// stack size

// Solving:
// stack Size
// time taken

// first or best

const InfoBox = styled("div")`
  border: 1px solid white;
  height: 100%;
  width: 100%;
  font-family: monospace;
  padding: 20px;
`;

const DebugWrapper = styled("div")`
  display: flex;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 20px;
`;

const Debug = () => {
  return (
    <DebugWrapper>
      <InfoBox>
        Generator Debug:
        <p>
          Algorithm:<br></br>
          Time Taken:<br></br>
          Stack Size:
        </p>
      </InfoBox>
      <InfoBox>
        Solver Debug:
        <p>
          Algorithm:<br></br>
          Time Taken:<br></br>
          Stack Size:
        </p>
      </InfoBox>
    </DebugWrapper>
  );
};

export default Debug;
