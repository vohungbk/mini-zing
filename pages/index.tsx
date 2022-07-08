import { useContext } from 'react'
import classnames from 'classnames'
import type { NextPage } from 'next'
import { getHomeContent } from 'services/home'
import useSWR from 'swr'
import Error from '@Components/Error'
import DataGrid from '@Components/DataGrid'
import { PlayerContext } from 'context/PlayerContext'

const Home: NextPage = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext)

  const { data, error } = useSWR('home', () => getHomeContent(), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  console.log(data)

  if (error) return <Error />

  if (!data?.recommendations.length) {
    return null
  }

  return (
    <div className={classnames('mx-5vw', 'pb-6')}>
      <h1 className="mt-10 mb-3 text-2xl">Recommended</h1>

      <DataGrid
        type="button"
        handler={(id: string) => {
          setPlayerId(id)
          setIsPlayerIdChanged(true)
        }}
        data={data?.recommendations
          .filter((track) => track.name)
          .map((track) => ({
            id: track.id,
            image: track?.album?.images?.[0]?.url,
            title: track.name,
            description: track?.artists.length
              ? track?.artists.map((artist) => artist.name).join(', ')
              : '',
          }))}
      />
    </div>
  )
}

export default Home
