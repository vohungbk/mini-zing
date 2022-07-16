import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { MdRepeat, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { useContext } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'
import { IoMdPause } from 'react-icons/io'
import { RiExternalLinkLine } from 'react-icons/ri'

import Slider from '@Components/Slider'
import Spinner from '@Components/Spinner'
import { formatDuration } from 'shared/utils'
import { getTrackInfo } from 'services/track'
import { PlayerContext } from 'context/PlayerContext'

import style from './Style.module.scss'
import classnames from 'classnames'
import { useHttpContext } from '@Components/Http'

const Player: FC = () => {
  const { playerId, setIsPlayerIdChanged } = useContext(PlayerContext)
  const { token } = useHttpContext()
  const { data, error } = useSWR(`track-${playerId}`, () =>
    getTrackInfo(playerId, token)
  )

  const isLoading = !data
  // const isError = data && (error || !data?.preview_url)
  const isError = data && error

  const [isPaused, setIsPaused] = useState(!setIsPlayerIdChanged)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(
    Number(localStorage.getItem('minizing-volume')) || 0.5
  )
  const [isMuted, setIsMuted] = useState(
    !!Number(localStorage.getItem('minizing-muted')) || false
  )
  const [isLoop, setIsLoop] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPaused) audioRef.current?.pause()
    else audioRef.current?.play().catch(() => setIsPaused(true))
  }, [isPaused])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
    localStorage.setItem('minizing-volume', String(volume))
    localStorage.setItem('minizing-muted', String(+isMuted))
  }, [volume, isMuted])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsPaused((prev) => !prev)
      }
    }

    const spacePressedHandler = (e: KeyboardEvent) => {
      if (e.key === ' ') e.preventDefault()
    }

    window.addEventListener('keyup', handler)
    window.addEventListener('keydown', spacePressedHandler)

    return () => {
      window.removeEventListener('keyup', handler)
      window.removeEventListener('keydown', spacePressedHandler)
    }
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdateCapture={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
          }
        }}
        onLoadedDataCapture={() => {
          if (audioRef.current) {
            setCurrentTime(0)
            setDuration(audioRef.current.duration)
          }
        }}
        onEndedCapture={() => {
          if (!isLoop) {
            setCurrentTime(0)
            setIsPaused(true)
          }
        }}
        className="hidden"
        hidden
        src={data?.preview_url}
        loop={isLoop}
        autoPlay={false}
      ></audio>
      <div className={style.player}>
        <div className={style.trackInfo}>
          {!isLoading && !isError && (
            <>
              <Image
                src={data.album?.images?.[0]?.url}
                objectFit="cover"
                alt=""
                width={56}
                height={56}
              />
              <div className={style.wrapperInfo}>
                <h1 className="line-clamp-1">{data.name}</h1>
                <p className="text-gray-400 line-clamp-1">
                  {data.artists.map((artist, index) => (
                    <Fragment key={artist.id}>
                      {index !== 0 && <span>, </span>}
                      <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                    </Fragment>
                  ))}
                </p>
              </div>
            </>
          )}
        </div>
        <div className={style.action}>
          <div className={style.buttons}>
            <button
              data-tooltips={isLoop ? 'Disable repeat' : 'Enable repeat'}
              onClick={() => setIsLoop(!isLoop)}
              disabled={isLoading || isError}
            >
              <MdRepeat
                className={classnames([style.btnRepeat], {
                  [style.isLoop]: isLoop,
                })}
              />
            </button>
            <button
              data-tooltips={
                isError
                  ? 'Error'
                  : isLoading
                  ? 'Loading'
                  : isPaused
                  ? 'Play'
                  : 'Pause'
              }
              disabled={isLoading || isError}
              className={classnames([style.btnPlay], {
                [style.isError]: isError,
              })}
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isError ? (
                <span className="text-red-500">{`!`}</span>
              ) : isLoading ? (
                <Spinner />
              ) : isPaused ? (
                <FaPlay className="fill-white w-3 h-3" />
              ) : (
                <IoMdPause className="fill-white w-3 h-3" />
              )}
            </button>
            <a
              data-tooltips="Open in Spotify"
              href={data?.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className={
                (isLoading || isError) && !data?.external_urls.spotify
                  ? 'pointer-events-none'
                  : ''
              }
            >
              <RiExternalLinkLine className="fill-white w-5 h-5" />
            </a>
          </div>
          <div
            className={classnames([style.slider], {
              ['pointer-events-none']: isLoading || isError,
            })}
          >
            <span className={style.time}>
              {formatDuration(currentTime * 1000)}
            </span>
            <Slider
              className="flex-grow max-w-400px"
              width={duration !== 0 ? (currentTime / duration) * 100 : 0}
              setWidth={(val: number) => {
                setCurrentTime((val / 100) * duration)
                if (audioRef.current) {
                  audioRef.current.currentTime = (val / 100) * duration
                }
              }}
            />
            <span className={style.time}>
              {formatDuration(duration * 1000)}
            </span>
          </div>
        </div>
        <div className={style.volume}>
          {!isLoading && !isError && (
            <>
              <button
                data-tooltips={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
                onClick={() => {
                  if (volume === 0) {
                    setIsMuted(false)
                    setVolume(1)
                  } else setIsMuted((prev) => !prev)
                }}
                style={{ height: '20px' }}
              >
                {isMuted || volume === 0 ? (
                  <MdVolumeOff className="fill-white w-5 h-5" />
                ) : (
                  <MdVolumeUp className="fill-white w-5 h-5" />
                )}
              </button>
              <div className={style.sliderWrapper}>
                <Slider
                  className="w-100px"
                  width={isMuted ? 0 : volume * 100}
                  setWidth={(val: number) => {
                    setVolume(val / 100)
                    setIsMuted(false)
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Player
