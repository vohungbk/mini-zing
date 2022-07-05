import Error from '@Components/Error'
import type { NextPage } from 'next'
import Head from 'next/head'
import { getHomeContent } from 'services/home'
import useSWR from 'swr'

const Home: NextPage = () => {
  const { data, error } = useSWR('home', () => getHomeContent(), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  console.log(data)

  if (error) return <Error />
  return (
    <Head>
      <title>Mini Zing Mp3</title>
      <meta name="description" content="A music player use ZingMp3 API" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
    </Head>
  )
}

export default Home
