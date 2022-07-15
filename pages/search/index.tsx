import DataGrid from '@Components/DataGrid'
import Error from '@Components/Error'
import Loading from '@Components/Loading'
import { PlayerContext } from 'context/PlayerContext'
import { useRouter } from 'next/router'
import { FC, useContext } from 'react'
import { searchByKeywords } from 'services/search'
import { formatNumber } from 'shared/utils'
import useSWR from 'swr'

import style from './Styled.module.scss'

const Search: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext)
  const router = useRouter()

  const { q } = router.query

  const { data, error } = useSWR(`search-${q}`, () =>
    searchByKeywords(q as string)
  )

  if (error) return <Error />

  if (!data) return <Loading />

  return (
    <div className={style.search}>
      <h1 className={style.title}>Search result for: {q}</h1>
      <h1 className="mt-5 mb-2 text-2xl">Tracks</h1>
      <DataGrid
        type="button"
        handler={(id: string) => {
          setPlayerId(id)
          setIsPlayerIdChanged(true)
        }}
        data={data.tracks?.items
          ?.filter((track) => track.name)
          .map((track) => ({
            id: track.id,
            image: track?.album?.images?.[0]?.url,
            title: track.name,
            description: track?.artists.map((artist) => artist.name).join(', '),
          }))}
      />
      <h1 className="mt-5 mb-2 text-2xl">Artists</h1>
      <DataGrid
        type="link"
        href={'/artist'}
        data={data.artists?.items
          .splice(0, 7)
          .filter((artist) => artist.name)
          .map((artist) => ({
            id: artist.id,
            image: artist?.images?.[0]?.url,
            title: artist.name,
            description: `${formatNumber(artist.followers.total)} followers`,
          }))}
      />
      <h1 className="mt-5 mb-2 text-2xl">Albums</h1>
      <DataGrid
        type="link"
        href="/album"
        data={data.albums?.items
          .splice(0, 7)
          .filter((album) => album.name)
          .map((album) => ({
            id: album.id,
            image: album?.images?.[0]?.url,
            title: album.name,
            description: `${formatNumber(album.total_tracks)} tracks`,
          }))}
      />

      <h1 className="mt-5 mb-2 text-2xl">Playlists</h1>
      <DataGrid
        type="link"
        href="/playlist"
        data={data.playlists?.items
          .splice(0, 7)
          .filter((playlist) => playlist.name)
          .map((playlist) => ({
            id: playlist.id,
            image: playlist?.images?.[0]?.url,
            title: playlist.name,
            description: `By ${playlist.owner.display_name}`,
          }))}
      />
    </div>
  )
}

export default Search
