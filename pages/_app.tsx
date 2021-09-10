// import '../styles/globals.css'
import "@nice-digital/design-system/scss/base.scss";
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';

import "@nice-digital/nds-filters/scss/filters.scss";
import "@nice-digital/nds-checkbox/scss/checkbox.scss";

//import Amplify from 'aws-amplify';
//import config from '../aws-exports';
//Amplify.configure({
//  ...config, ssr: true
//});

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <UserProvider>      
        <Component {...pageProps} />       
    </UserProvider>
    );
}
export default MyApp
