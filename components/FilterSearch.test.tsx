import React from "react";
import { render, screen } from "@testing-library/react";
import FilterSearch from "./FilterSearch";

const props = {
	onInputChange: jest.fn(),
	label: "Filter by topic name"
};

describe("FilterSearch", () => {
	it("renders a heading", () => {

		render(<FilterSearch {...props} />);

		const heading = screen.getByText("Something that isn't the correct label", {
			selector: ".input__label",
		})

		expect(heading).toBeInTheDocument();
	});

	it("should match snapshot for main content", () => {
		render(<FilterSearch {...props} />);

		expect(document.body).toMatchSnapshot();
	});
})