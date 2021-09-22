import { useState } from "react";
import Link from "next/link";
import { Field } from 'react-final-form';

import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { ProjectType } from "../lib/types";
import { projectPrefix } from "../lib/helpers";

import styles from "../styles/builder.module.scss";
import FilterSearch from "./FilterSearch";

export default function BuilderSelect({guidance, preselectedIds} : {guidance: Array<ProjectType>, preselectedIds: Array<string> | null}) {    
    //boosting the preselected guidance to the top of the page.
    let preselectedProjects= [] as Array<ProjectType> ;

    if (preselectedIds){ //currently just handling a single preselected project. todo: (in next phase) handle more.
        const foundProjects = guidance.filter(elem => preselectedIds.includes(elem.Reference));
        if (typeof(foundProjects) !== "undefined"){
            preselectedProjects = foundProjects;
        }
    }
    
    const filterProjectsBySearch = (searchQuery: string) => {
        const updatedGuidance = guidance.filter(item => {
            const itemTitle = item.Title.toLowerCase();
            return itemTitle.includes(searchQuery.toLowerCase());
        });

        setProjects(updatedGuidance);
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const checkboxName = e.target.getAttribute("name")?.replace(projectPrefix, "");        
        const alreadyTicked = selected.some(item => checkboxName === item.Reference);
        const selectedProject = guidance.filter(item => checkboxName === item.Reference)[0];
        const updatedSelected = alreadyTicked ? [...selected].filter(item => selectedProject?.Reference !== item.Reference) : [...selected, selectedProject];

        setSelected(updatedSelected);
    };
    
    const [projects, setProjects] = useState<Array<ProjectType>>(guidance.sort((a, b) => (a.Title > b.Title ? 1 : -1)));
    const [selected, setSelected] = useState<Array<ProjectType>>(preselectedProjects);

    return (
        <>
            <PageHeader heading="Profile builder" />
            <Grid>
                {selected.length ? (
                    <GridItem cols={12}>
                        <h2 className="h3">Selected for your confirmation</h2>
                        <h3 className="h4">Topics of interest - showing {selected.length === 1 ? `1 item` : `${selected.length} items`}</h3>
                        {selected.map(project => (
                            <Guideline data={project} checked={true} key={project.Reference} onCheckboxChange={handleCheckboxChange} />                        
                        ))}
                    </GridItem>
                ) : null}
                <GridItem cols={12}>
                    <h2 className="h3">Related guidance</h2>                    
                    <p style={{ maxWidth: "100%" }}>Build your profile by selecting guidance which is most relevant to you. You can also be alerted on any relevant and upcoming guidance and advice for a specific topic by adding this as an &apos;Interest&apos;.</p>
                </GridItem>
                <GridItem cols={12} md={3}>
					<FilterSearch onInputChange={filterProjectsBySearch} label="Filter by topic name" />
                </GridItem>
				<GridItem cols={12} md={9}>
                    <h3 className="h4">Showing {projects.length === 1 ? `1 item` : `${projects.length} items`}</h3>
                    {projects && Array.isArray(projects) && projects.map((guideline: ProjectType) => (
                        <Guideline data={guideline} key={guideline.Reference} onCheckboxChange={handleCheckboxChange} />
                    ))}
                </GridItem>
            </Grid>
        </>
    );
}

const Guideline = ({ data, checked, onCheckboxChange }: { data: ProjectType, checked?: boolean, onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
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

    const reference = `${projectPrefix}${data.Reference}`; //data.Reference === "41" ? "DG41" : data.Reference; //todo: fix the indev feed which is returning a reference of "41" for DG41 - which screws up the javascript property which can't handle starting with a number.

    return (
        <div className={styles.projectContainer}>
            <div className={styles.projectCheckbox}>                
               <Field name={reference} type="checkbox" initialValue={checked} inputOnChange={onCheckboxChange}>
                    {({ input, inputOnChange }) => {
                        return (
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    className="checkbox__input"
                                    name={input.name}
                                    checked={input.checked}
                                    onChange={e => {
                                        input.onChange(e);
                                        inputOnChange && inputOnChange(e);
                                    }}
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