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

// const Error = ({ name } : { name: string }) => (
//     <Field
//       name={name}
//       subscription={{ touched: true, error: true }}
//       render={({ meta: { touched, error } }) =>
//         touched && error ? <span>{error}</span> : null
//       }
//     />
//   )

export default function Builder({guidance} : {guidance: Array<ProjectType>}) {

    console.log("builder function here");
    console.log(JSON.stringify(guidance));

    const onSubmit = (values : any) => {
        window.alert(JSON.stringify(values))
      }

    

    return (
        <Layout>
            <Wizard
                initialValues={{ preselectedProductId: 'TODO: get from the querystring' }}
                onSubmit={onSubmit}>
                <Wizard.Page >
                    <Step1ProjectSelect guidance={guidance} />
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