import Error from '@Components/Error'
import { PlayerContext } from 'context/PlayerContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { getPlaylistInfo } from 'services/playlist'
import { formatDuration } from 'shared/utils'
import useSWR from 'swr'
import style from './Style.module.scss'

const Playlist = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext)

  const router = useRouter()
  const { id } = router.query

  const { error, data } = useSWR(`album-${id}`, () =>
    getPlaylistInfo(id as string)
  )
  if (error) return <Error />
  return (
    <div className={style.playlist}>
      <div className={style.owner}>
        <Image
          src={data?.images?.[0]?.url || ''}
          width={300}
          height={300}
          objectFit="cover"
          alt=""
        />
        <h1 className={style.playlistName}>{data?.name}</h1>
        <div className={style.displayName}>{data?.owner.display_name}</div>
      </div>
      <div className={style.list}>
        {data?.tracks.items
          .filter((track) => track.track)
          .map(({ track }, index) => (
            <button
              key={track.id}
              onClick={() => {
                setPlayerId(track.id)
                setIsPlayerIdChanged(true)
              }}
              className={style.wrapper}
            >
              <div className={style.info}>
                <div className={style.no}>{index + 1}</div>
                <div>
                  <h1 className={style.trackName}>{track.name}</h1>
                  <p className={style.artistName}>
                    {track?.artists.map((artist) => artist.name).join(', ')}
                  </p>
                </div>
              </div>
              <div>{formatDuration(track.duration_ms)}</div>
            </button>
          ))}
      </div>
    </div>
  )
}

export default Playlist
