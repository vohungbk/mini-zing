import { FC, Fragment, useContext } from 'react'
import Error from '@Components/Error'
import { PlayerContext } from 'context/PlayerContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAlbumInfo } from 'services/album'
import useSWR from 'swr'

import style from './Style.module.scss'
import { formatDuration } from 'shared/utils'

const Album: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext)

  const router = useRouter()
  const { id } = router.query

  const { error, data } = useSWR(`album-${id}`, () =>
    getAlbumInfo(id as string)
  )

  if (error) return <Error />

  return (
    <div className={style.album}>
      <div className={style.cover}>
        <Image
          src={data?.images?.[0]?.url || '/public/image_default'}
          alt=""
          objectFit="cover"
          width={300}
          height={300}
        />
        <h1 className={style.name}>{data?.name}</h1>
        <div className={style.artists}>
          {data?.artists.map((artist, index: number) => (
            <Fragment key={artist.id}>
              {index !== 0 && <span>, </span>}
              <Link href={''}>{artist.name}</Link>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={style.list}>
        {data?.tracks.items.map((track) => (
          <button
            key={track.id}
            className={style.wrapper}
            onClick={() => {
              setPlayerId(track.id)
              setIsPlayerIdChanged(true)
            }}
          >
            <div className={style.tracks}>
              <div className={style.trackNumber}>{track.track_number}</div>
              <div>
                <h1 className={style.trackName}>{track.name}</h1>
                <p className={style.artistName}>
                  {track?.artists?.map((artist) => artist.name).join(', ')}
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
export default Album
