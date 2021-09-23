import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router';

import { fetchData, mungeFormValueData } from "../lib/helpers";
import Layout from "../components/layout";
import { ProjectType } from "../lib/types";

import Wizard from '../components/Wizard';

import Step1ProjectSelect from "../components/Step1ProjectSelect";
import Step2UserDetails from "../components/Step2UserDetails";
import Step3ReviewAndSubmit from "../components/Step3ReviewAndSubmit";
import { ErrorMessage } from "../components/ErrorMessage";


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        return {
            props: { guidance: await fetchData('/api/getGuidance', { Cookie: context.req.headers.cookie})}
        }
    }
});

export default function Builder({guidance} : {guidance: Array<ProjectType>}) {
    const router = useRouter();

    const onSubmit = async (values : any) => {
        const mungedData = mungeFormValueData(values, guidance);
        const mungedDataIds = mungedData.projects.map((item: any) => item.id);

        const response = await fetchData('/api/submitRegistration', {}, 'POST', JSON.stringify(mungedData));

        router.push({
            pathname: '/confirmation',
            query: { select: mungedDataIds }
        });
    }    

    const validateCheckbox = (values: any) => {
        const errors: any = {};
        const allDeselected = (!(Object.values(values).some(item => item === true)));
        const nothingSelected = (!(Object.values(values).length));

        if (nothingSelected || allDeselected) {
            errors["projectSelect"] = "Required";
        }

        return errors;
    };

    const preselectedIds = Array.isArray(router.query.select) ? router.query.select.map(item => item.toUpperCase()) : typeof(router.query.select) !== "undefined" ? [router.query.select.toUpperCase()] : null; 

    return (
        <Layout>
            <Wizard
                initialValues={{}}
                onSubmit={onSubmit}>
                {/*
                // @ts-ignore */}
                <Wizard.Page validate={(values) => validateCheckbox(values)} >
                    <ErrorMessage name="projectSelect" message="This is required"></ErrorMessage>                    
                    <Step1ProjectSelect guidance={guidance} preselectedIds={preselectedIds} />
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