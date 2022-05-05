import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
    <Page nombre={"prueba"}>
      <Component {...pageProps} />
    </Page>
    </ApolloProvider>
    )
}


