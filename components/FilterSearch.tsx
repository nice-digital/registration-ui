import React from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-forms";

type FilterSearchProps = {
	onInputChange: (searchQuery: string) => void;
	label: string;
};

export default function FilterSearch({onInputChange, label}: FilterSearchProps) {
	let typingTimer = 0;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.trim();

		clearTimeout(typingTimer);

		typingTimer = window.setTimeout(() => {
			onInputChange(val);
		}, 1000);
	};

	return (
		<Panel>
			<Input
				type="search"
				label={label}
				unique="filterSearch"
				name="filter-search"
				onChange={handleInputChange}
				autoComplete="off"
				data-qa-sel="filter-search-input"
			/>
		</Panel>
	);
};
