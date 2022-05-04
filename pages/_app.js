import '../styles/globals.css'
import Page from '../components/Page'

export default function MyApp({ Component, pageProps }) {
  return (
  
    <Page nombre={"prueba"}>
      <Component {...pageProps} />
    </Page>

    )
}
