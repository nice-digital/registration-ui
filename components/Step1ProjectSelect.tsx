import { useState } from "react";
import Link from "next/link";
import { Field } from 'react-final-form'

import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { ProjectType } from "../lib/types";

import styles from "../styles/builder.module.scss";
import FilterSearch from "./FilterSearch";

export default function BuilderSelect({guidance, preselectedIds} : {guidance: Array<ProjectType>, preselectedIds: string | Array<string> | undefined}) {
    const [projects, setProjects] = useState<Array<ProjectType>>(guidance);

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

    const filterProjectsBySearch = (searchQuery: string) => {
        const updatedGuidance = guidance.filter(item => item.Title.includes(searchQuery));
        setProjects(updatedGuidance);
    };

    return (
        <>
            <PageHeader heading="Profile builder" />
            <Grid>
                {preselectedProject !== null && (
                    <GridItem cols={12}>
                        <Guideline data={preselectedProject} checked={true} key={preselectedProject.Reference} />                        
                    </GridItem>
                )}
                <GridItem cols={12} md={3}>
					<FilterSearch onInputChange={filterProjectsBySearch} label="Filter by name" />
                </GridItem>
				<GridItem cols={12} md={9}>
                    {projects && Array.isArray(projects) && projects.map((guideline: ProjectType) => {
                        return <Guideline data={guideline} key={guideline.Reference} />;
                    })}
                </GridItem>
            </Grid>
        </>
    );
}

const Guideline = ({ data, checked }: { data: ProjectType, checked?: boolean }) => {
    let formattedDate = "";
    if (data.PublishedDate !== null){
        const parsedDate = new Date(data.PublishedDate);
        formattedDate = parsedDate.toLocaleDateString();
    }

    const guidelineLink = {
        link: {
            elementType: Link,
            destination: `/project/${data.Reference}`,
            method: "href"
        },
    };

    const guidelineMetadata = [
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
        <div className={styles.projectContainer}>
            <div className={styles.projectCheckbox}>                
               <Field name={reference} type="checkbox" initialValue={checked}>
                    {({ input }) => {
                        return (
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    className="checkbox__input"
                                    name={input.name}
                                    checked={input.checked}
                                    onChange={input.onChange}
                                />
                                <label className="checkbox__label" htmlFor={input.name}>&nbsp;</label>
                            </div>
                        );
                    }}
                </Field>
            </div>
            <div className={styles.projectCard}>
                <Card {...guidelineLink} headingText={data.Title} metadata={guidelineMetadata} />
            </div>
        </div>
    );
};