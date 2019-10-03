import styled from "styled-components";

const getColor = (selected: boolean) => selected ? 'green' : 'grey';

export const Button = styled.div`
    margin: 0.25rem;
    padding: 0.5rem;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    border-color: ${(props: {selected: boolean}): string => getColor(props.selected)};
    color: ${(props: {selected: boolean}): string => getColor(props.selected)};

    :hover {
        cursor: pointer;
        border-color: blue;
    }
`;
