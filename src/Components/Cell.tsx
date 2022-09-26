import styled from "styled-components";
import Cell from "../Models/Cell"
interface CellProps {
  cell: Cell;
}

const CellContainer = styled("div")<{ cell: Cell }>`
  width: 60px;
  height: 60px;
  border-top: ${(props) =>
    props.cell.neighbours.up ?  "1px solid transparent" : "1px solid black"};
  border-right: ${(props) =>
    props.cell.neighbours.right ?  "1px solid transparent" : "1px solid black"};
  border-bottom: ${(props) =>
    props.cell.neighbours.down ?  "1px solid transparent" : "1px solid black"};
  border-left: ${(props) =>
    props.cell.neighbours.left ?  "1px solid transparent" : "1px solid black"};
`;

const CellComponent = ({cell}: CellProps) => {
  return (
    <CellContainer cell={cell}>{cell.coordinates.x}, {cell.coordinates.y}</CellContainer>
  );
};

export default CellComponent;
