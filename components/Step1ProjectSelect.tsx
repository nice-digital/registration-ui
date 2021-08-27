import { Field } from 'react-final-form'

import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { ProjectType } from "../lib/types";


export default function BuilderSelect({guidance, preselectedIds} : {guidance: Array<ProjectType>, preselectedIds: Array<string>}) {

    //todo: boost the preselected guidance to the top of the page.

    return (
        <>
            <PageHeader heading="Builder" />
            <Grid>
                <GridItem cols={12} md={3}>
					<p>Filter</p>
                </GridItem>
				<GridItem cols={12} md={9}>
                    <ul>
                        {guidance && Array.isArray(guidance) && guidance.map((guideline: ProjectType) => (
                            <Guideline data={guideline} key={guideline.Reference} />
                        ))}
                    </ul>
                </GridItem>
            </Grid>
        </>
    );
}

const Guideline = ({ data }: { data: ProjectType }) => {
    // const usersListHeading = {
    //     headingText: data.title
    //     link: {
    //         elementType: Link,
    //         destination: `/users/${userId}`,
    //     },
    // };

    const usersListMetadata = [
        {
            label: "Status",
            value: data.Status,
        },
        {
            label: "Project Type",
            value: data.ProjectType,
        },
        {
            label: "Expected publication date",
            value: `Expected publication date: ${data.PublishedDate}`,
        }
    ];
    
    return (
        <li>
            <Field  name={`ID_${data.Reference}`} //todo: get rid of the ID_ thing. i think there might be references starting with numbers in the resultset, which make invalid javascript properties.
                    component="input"
                    type="checkbox"
                />
            <Card headingText={data.Title} metadata={usersListMetadata} />
        </li>
    );
};