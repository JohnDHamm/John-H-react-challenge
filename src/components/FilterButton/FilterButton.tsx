import React, { useState, useEffect } from "react";

import { Button } from "./FilterButton.styles";

interface Props {
    label: string,
    selected: boolean
}

const FilterButton: React.FC<Props> = (props) => {
    return (
        <Button selected={props.selected}>
            {props.label}
        </Button>
    )
};

export default FilterButton;
