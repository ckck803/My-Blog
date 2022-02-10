import React, { useCallback, useState } from "react";
import { Dropdown } from "reactstrap";
import {
  DropdownBtn,
  DropdownContent,
  DropdownItem,
} from "../../assets/css/selectBox";

const CustomSelect = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["React", "Vue", "Angular"];

  const onClickItem = useCallback(
    (option) => {
      setSelected(option);
      setIsActive(!isActive);
    },
    [isActive, setSelected]
  );

  return (
    <Dropdown style={{ width: "200px" }}>
      <DropdownBtn onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </DropdownBtn>
      {isActive && (
        <DropdownContent>
          {options.map((option) => (
            <DropdownItem key={option} onClick={(e) => onClickItem(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </Dropdown>
  );
};

export default CustomSelect;
