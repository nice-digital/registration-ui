import { Field } from 'react-final-form'

import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { ProjectType } from "../lib/types";


export default function BuilderSelect({guidance, preselectedIds} : {guidance: Array<ProjectType>, preselectedIds: string | Array<string> | undefined}) {

    //boosting the preselected guidance to the top of the page.
    let preselectedProject : ProjectType | null = null;
    console.log(preselectedIds);
    if (typeof(preselectedIds) !== "undefined" && !Array.isArray(preselectedIds)){ //currently just handling a single preselected project. todo: (in next phase) handle more.
        const foundProject = guidance.find(elem => elem.Reference === preselectedIds?.toUpperCase());
        if (typeof(foundProject) !== "undefined"){
            preselectedProject = foundProject;
            guidance = guidance.filter(elem => elem.Reference !== preselectedIds?.toUpperCase());
        }
    }

    return (
        <>
            <PageHeader heading="Builder" />
            <Grid>
                { preselectedProject !== null && (
                    <GridItem cols={12}>
                        <ul>
                            <Guideline data={preselectedProject} key={preselectedProject.Reference} />
                        </ul>                    
                    </GridItem>
                )}
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

    let formattedDate = "";
    if (data.PublishedDate !== null){
        const parsedDate = new Date(data.PublishedDate);
        formattedDate = parsedDate.toLocaleDateString();
    }

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
            label: "Reference",
            value: data.Reference,
        },        
        {
            label: "Expected publication date",
            value: `Expected publication date: ${formattedDate}`,
        }
    ];

    const reference = data.Reference === "41" ? "DG41" : data.Reference; //todo: fix the indev feed which is returning a reference of "41" for DG41 - which screws up the javascript property which can't handle starting with a number.

    return (
        <li>
            <Field  name={reference}
                    component="input"
                    type="checkbox"
                />
            <Card headingText={data.Title} metadata={usersListMetadata} />
        </li>
    );
};