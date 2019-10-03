import React from "react";
import { Button } from "./FilterButton.styles";

interface Props {
    onClick: any,
    label: string,
    selected: boolean
}

const FilterButton: React.FC<Props> = (props) => {
    return (
        <Button onClick={props.onClick} selected={props.selected}>
            {props.label}
        </Button>
    )
};

export default FilterButton;
