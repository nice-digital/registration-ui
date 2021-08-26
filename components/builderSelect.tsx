import Link from "next/link";
//import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { Button } from "@nice-digital/nds-button";
// import { Input } from "@nice-digital/nds-input";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

//import { fetchData } from "../lib/helpers";
//import Layout from "../components/layout";
import { GuidelineType } from "../lib/types";

// export const getServerSideProps = withPageAuthRequired({
//     async getServerSideProps(context) {
//         return {
//             props: { guidance: await fetchData(context, '/api/getGuidance')}
//         }
//     }
// });

export default function BuilderSelect({guidance} : {guidance: Array<GuidelineType>}) {

    return (
        <>
            <PageHeader heading="Builder" />
            <Grid>
                <GridItem cols={12} md={3}>
					<p>Filter</p>
                </GridItem>
				<GridItem cols={12} md={9}>
                    <ul>
                        {guidance && guidance.map((guideline: GuidelineType) => (
                            <Guideline data={guideline} key={guideline.id} />
                        ))}
                    </ul>
                </GridItem>
            </Grid>
        </>
    );
}

const Guideline = ({ data }: { data: GuidelineType }) => {
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
            value: data.status,
        },
        {
            label: "Type",
            value: data.guidanceType,
        },
        {
            label: "Expected publication date",
            value: `Expected publication date: ${data.expectedPublicationDate}`,
        }
    ];
    
    return (
        <li>
            <input type="checkbox" />
            <Card headingText={data.title} metadata={usersListMetadata} />
        </li>
    );
};