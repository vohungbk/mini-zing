import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '@Components/Layouts'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mini Zing Mp3</title>
        <meta name="description" content="A music player use ZingMp3 API" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
