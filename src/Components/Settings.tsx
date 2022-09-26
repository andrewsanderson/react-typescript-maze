import React from "react";
import styled from "styled-components";

interface ConfigProps {
  height: number,
  setHeight: React.Dispatch<React.SetStateAction<number>>,
  width: number,
  setWidth: React.Dispatch<React.SetStateAction<number>>,
}

const Label = styled.div`
  padding-left: 15px;
  padding-right: 5px;
`;

const ConfigContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px;
  background-color: #e3e3e3;
`;

const Config = ({height, setHeight, width, setWidth}: ConfigProps) => {

  return (
    <ConfigContainer>
      <Label>height</Label>
      <input
        type="number"
        data-setting="height"
        defaultValue={height}
        onChange={e => setHeight(parseInt(e.target.value))}
      />
      <Label>width</Label>
      <input
        type="number"
        data-setting="width"
        defaultValue={width}
        onChange={e => setWidth(parseInt(e.target.value))}
      />
    </ConfigContainer>
  );
};

export default Config;
