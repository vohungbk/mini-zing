import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '@Components/Layouts'
import Head from 'next/head'
import Http from '@Components/Http'
import { Provider as Auth } from '@Components/Auth'
import { PlayerContextProvider } from 'context/PlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Http token="">
      <Head>
        <title>Mini Spotify</title>
        <meta name="description" content="A music player use Spotify API" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>
      <Auth>
        <PlayerContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PlayerContextProvider>
      </Auth>
    </Http>
  )
}

export default MyApp
