import React from "react";
import FilterButton from "../FilterButton/FilterButton";
import { FiltersContainer } from './Filters.styles';

interface Props {
	activeFilters: Array<string>
	onChange: any
}

const Filters: React.FC<Props & Testable> = (props) => {
	const filterTypes = ['pending', 'approved', 'in progress', 'finalized'];

	const isSelected = (filter: string) => {
			return props.activeFilters.includes(filter);
	}

	return (
		<FiltersContainer data-testid={"Filters"}>
			{filterTypes.map((filter, index): JSX.Element => (
				<FilterButton
					key={index}
					onClick={() => props.onChange(filter)}
					selected={isSelected(filter)}
					label={filter}/>
				)
			)}
		</FiltersContainer>
	);
};

export default Filters;
