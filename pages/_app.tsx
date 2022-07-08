import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '@Components/Layouts'
import Head from 'next/head'
import Http from '@Components/Http'
import { Provider as Auth } from '@Components/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Http token="">
      <Head>
        <title>Mini Zing Mp3</title>
        <meta name="description" content="A music player use ZingMp3 API" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </Head>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </Http>
  )
}

export default MyApp
