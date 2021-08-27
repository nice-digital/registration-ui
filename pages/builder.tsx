import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { fetchData } from "../lib/helpers";
import Layout from "../components/layout";
import { ProjectType } from "../lib/types";

import Wizard from '../components/Wizard';

import Step1ProjectSelect from "../components/Step1ProjectSelect";
import Step2UserDetails from "../components/Step2UserDetails";
import Step3ReviewAndSubmit from "../components/Step3ReviewAndSubmit";

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        return {
            props: { guidance: await fetchData('/api/getGuidance', { Cookie: context.req.headers.cookie})}
        }
    }
});

export default function Builder({guidance} : {guidance: Array<ProjectType>}) {

    console.log("builder function here");
    console.log(JSON.stringify(guidance));

    const onSubmit = (values : any) => {

        //todo: munge the selected project Id's into an array.

        window.alert(JSON.stringify(values));

        //todo: hit the process.env.BACKEND_URL with a POST and the json above. then show a success page.

      }    

    return (
        <Layout>
            <Wizard
                initialValues={{}}
                onSubmit={onSubmit}>
                <Wizard.Page >
                    <Step1ProjectSelect guidance={guidance} preselectedIds={["PH24"]} /> {/* TODO: get the preselected ids from the querystring */}
                </Wizard.Page>
                <Wizard.Page>
                    <Step2UserDetails/>
                </Wizard.Page>
                <Wizard.Page>
                    <Step3ReviewAndSubmit/>
                </Wizard.Page>
            </Wizard>
        </Layout>
    );
};