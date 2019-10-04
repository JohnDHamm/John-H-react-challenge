import React from "react";
import { subTestidInit } from "../../utils";
import { Button } from "./FilterButton.styles";

interface Props {
    onClick: any,
    label: string,
    selected: boolean
}

const FilterButton: React.FC<Props & Testable> = ({testid="FilterButton", ...props}) => {
	const subTestid = subTestidInit(testid);

    return (
			<Button data-testid={subTestid(props.label)} onClick={props.onClick} selected={props.selected}>
				{props.label}
			</Button>
    )
};

export default FilterButton;
