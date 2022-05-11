import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

import {SessionProvider} from "next-auth/react"


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (

    <SessionProvider session={pageProps.session}>
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
    </SessionProvider>

    )
}


