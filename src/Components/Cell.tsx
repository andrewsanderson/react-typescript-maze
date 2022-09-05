import styled from "styled-components";

interface CellProps {
  cell: Cell;
}

const CellContainer = styled("div")<{ cell: Cell }>`
  width: 40px;
  height: 40px;
  border-top: ${(props) =>
    props.cell.walls[0] ? "1px solid black" : "1px solid white"};
  border-right: ${(props) =>
    props.cell.walls[1] ? "1px solid black" : "1px solid white"};
  border-bottom: ${(props) =>
    props.cell.walls[2] ? "1px solid black" : "1px solid white"};
  border-left: ${(props) =>
    props.cell.walls[3] ? "1px solid black" : "1px solid white"};
`;

const Cell = (cellProps: CellProps) => {
  const { cell } = cellProps;
  const { coordinates } = cell;
  return (
    <CellContainer cell={cell}>{JSON.stringify(coordinates)}</CellContainer>
  );
};

export default Cell;
