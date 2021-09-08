import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router'

import { fetchData, mungeFormValueData } from "../lib/helpers";
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
    const router = useRouter()

    const onSubmit = async (values : any) => {

        //todo: munge the selected project Id's into an array.
        const mungedData = mungeFormValueData(values, guidance);

        //window.alert(JSON.stringify(mungedData));

        const response = await fetchData('/api/submitRegistration', {}, 'POST', JSON.stringify(mungedData));

        console.log("response:" + response);

        router.push('/confirmation');
      }    

    return (
        <Layout>
            <Wizard
                initialValues={{}}
                onSubmit={onSubmit}>
                <Wizard.Page>
                    <Step1ProjectSelect guidance={guidance} preselectedIds={router.query.select} />
                </Wizard.Page>
                <Wizard.Page>
                    <Step2UserDetails/>
                </Wizard.Page>
                <Wizard.Page>
                    <Step3ReviewAndSubmit guidance={guidance}/>
                </Wizard.Page>
            </Wizard>
        </Layout>
    );
};