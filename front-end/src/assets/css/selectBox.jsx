import styled from "styled-components";

export const Dropdown = styled.div`
  width: 200px;
  user-select: none;
  margin: 100px auto;
  position: relative;
`;

export const DropdownBtn = styled.div`
  padding: 10px 20px;
  background: #fff;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.06);
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  padding: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: 500;
  color: #333;
  width: 100%;
  z-index: 1;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #f4f4f4;
  }
`;
