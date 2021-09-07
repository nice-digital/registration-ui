import { useState } from "react";
import Link from "next/link";
import { Field } from 'react-final-form'

import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { ProjectType } from "../lib/types";

import styles from "../styles/builder.module.scss";
import React from 'react';


export default function BuilderSelect({guidance, preselectedIds} : {guidance: Array<ProjectType>, preselectedIds: string | Array<string> | undefined}) {
    const [selected, setSelected] = useState<Array<string>>([]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const checkboxName = e.target.name;
        const alreadyTicked = selected.some(item => checkboxName === item);
        const updatedSelected = alreadyTicked ? [...selected].filter(item => checkboxName !== item) : [...selected, checkboxName];

        setSelected(updatedSelected);
    };


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
            <PageHeader heading="Profile builder" />
            <Grid>
                { preselectedProject !== null && (
                    <GridItem cols={12}>
                        <Guideline data={preselectedProject} key={preselectedProject.Reference} checked={true} onCheckboxChange={handleCheckboxChange} />                        
                    </GridItem>
                )}
                <GridItem cols={12} md={3}>
					<p>Filter</p>
                </GridItem>
				<GridItem cols={12} md={9}>
                        <Field name="ticked"
                            component="input"
                            type="hidden"
                            value={selected.length ? selected.length : undefined}
                        />
                        {guidance && Array.isArray(guidance) && guidance.map((guideline: ProjectType) => {
                            const checked = selected.some(item => guideline.Reference === item);

                            return <Guideline data={guideline} key={guideline.Reference} checked={checked} onCheckboxChange={handleCheckboxChange} />;
                        })}
                    
                </GridItem>
            </Grid>
        </>
    );
}

const Guideline = ({ data, checked, onCheckboxChange  }: { data: ProjectType, checked: boolean, onCheckboxChange: Function }) => {
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

    const reference = `PROJECT-${data.Reference}`; //data.Reference === "41" ? "DG41" : data.Reference; //todo: fix the indev feed which is returning a reference of "41" for DG41 - which screws up the javascript property which can't handle starting with a number.

    return (
        <div className={styles.projectContainer}>
            <div className={styles.projectCheckbox}>                
               <Field name={reference} type="checkbox" checked={checked}>
                    {({ input }) => {
                        return (
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    className="checkbox__input"
                                    name={input.name}
                                    value={input.name}
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