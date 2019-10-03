import styled from "styled-components";

const getColor = (selected: boolean) => selected ? '#008000' : '#ccc';

export const Button = styled.div`
    margin: 0.25rem;
    padding: 0.4rem 0.75rem;
    border-width: 1px;
    border-style: solid;
    border-radius: 16px;
    border-color: ${(props: {selected: boolean}): string => getColor(props.selected)};
    color: ${(props: {selected: boolean}): string => getColor(props.selected)};
    font-size: 0.9rem;

    :hover {
        cursor: pointer;
        box-shadow: 2px 4px 5px rgba(125, 125, 125, 0.25);
    }
`;
