import DataGrid from '@Components/DataGrid'
import Error from '@Components/Error'
import { useHttpContext } from '@Components/Http'
import Loading from '@Components/Loading'
import { PlayerContext } from 'context/PlayerContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { getArtistInfo } from 'services/artist'
import { formatNumber } from 'shared/utils'
import useSWR from 'swr'

import style from './Style.module.scss'

const Artist = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext)
  const { token } = useHttpContext()
  const router = useRouter()
  const { id } = router.query
  const { error, data } = useSWR(`album-${id}`, () =>
    getArtistInfo(id as string, token)
  )
  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <div className={style.artist}>
      <div className={style.info}>
        <Image
          width={250}
          height={250}
          src={data.artist?.images?.[0]?.url}
          className={style.image}
          alt=""
        />
        <div className={style.content}>
          <h1 className={style.name}>{data.artist.name}</h1>
          <p className={style.text}>
            {formatNumber(data.artist.followers.total)} followers
          </p>
          <p className={style.text}>
            Popularity: {data.artist.popularity} / 100
          </p>
        </div>
      </div>
      {data?.topTrack.tracks.length ? (
        <>
          <h1 className="mt-5 mb-3 text-2xl">Top Tracks</h1>
          <DataGrid
            type="button"
            handler={(id: string) => {
              setPlayerId(id)
              setIsPlayerIdChanged(true)
            }}
            data={data?.topTrack.tracks
              .filter((track) => track.name)
              .map((track) => ({
                id: track.id,
                image: track?.album?.images?.[0]?.url,
                title: track.name,
                description: track?.artists
                  .map((artist) => artist.name)
                  .join(', '),
              }))}
          />
        </>
      ) : (
        ''
      )}

      {data.albums.items.length ? (
        <>
          <h1 className="mt-5 mb-3 text-2xl">Albums</h1>
          <DataGrid
            type="link"
            href="/album"
            data={data.albums.items
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
        </>
      ) : (
        ''
      )}

      {data.relatedArtists.artists.length ? (
        <>
          <h1 className="mt-5 mb-2 text-2xl">Related Artists</h1>
          <DataGrid
            type="link"
            href="/artist"
            data={data.relatedArtists.artists
              .filter((artist) => artist.name)
              .map((artist) => ({
                id: artist.id,
                image: artist.images?.[0]?.url,
                title: artist.name,
                description: `${formatNumber(
                  artist.followers.total
                )} followers`,
              }))}
          />
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default Artist
