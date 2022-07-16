import { useContext } from 'react'
import classnames from 'classnames'
import type { NextPage } from 'next'
import { getHomeContent } from 'services/home'
import useSWR from 'swr'
import Error from '@Components/Error'
import DataGrid from '@Components/DataGrid'
import { PlayerContext } from 'context/PlayerContext'
import Loading from '@Components/Loading'
import { useHttpContext } from '@Components/Http'

const Home: NextPage = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext)
  const { token } = useHttpContext()

  const { data, error } = useSWR('home', () => getHomeContent(token), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  if (error) return <Error />

  if (!data) return <Loading />

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

      <h1 className="mt-5 mb-3 text-2xl">New Releases</h1>
      <DataGrid
        type="link"
        href="/album"
        data={data.newReleases.albums.items
          .filter((album) => album.name)
          .map((album) => ({
            id: album.id,
            image: album.images?.[0]?.url,
            title: album.name,
            description: album?.artists
              ?.map((artist) => artist?.name)
              ?.join(', '),
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Top Playlists</h1>
      <DataGrid
        type="link"
        href="/playlist"
        data={data.topPlaylists
          .filter((playlist) => playlist.name)
          .map((playlist) => ({
            id: playlist.id,
            image: playlist.images?.[0]?.url,
            title: playlist.name,
            description: playlist?.owner?.display_name,
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Featured Playlists</h1>
      <DataGrid
        type="link"
        href="/playlist"
        data={data.featuredPlaylists.playlists.items
          .filter((playlist) => playlist.name)
          .map((playlist) => ({
            id: playlist.id,
            image: playlist.images?.[0]?.url,
            title: playlist.name,
            description: playlist?.owner?.display_name,
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Suggested Artists</h1>
      <DataGrid
        type="link"
        href="/artist"
        data={data.artists.artists
          .filter((artist) => artist.name)
          .map((artist) => ({
            id: artist.id,
            image: artist.images?.[0]?.url,
            title: artist.name,
            description: artist?.type,
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Categories</h1>
      <DataGrid
        type="link"
        href="/category"
        data={data.categories.categories.items.map((category) => ({
          id: category.id,
          image: category?.icons?.[0]?.url,
          title: category.name,
        }))}
      />
    </div>
  )
}

export default Home
