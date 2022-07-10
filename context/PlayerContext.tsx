import { FC, createContext, useState, ReactNode, useEffect } from 'react'

export const PlayerContext = createContext<{
  playerId: string
  setPlayerId: (value: string) => void
  isPlayerIdChanged: boolean
  setIsPlayerIdChanged: (value: boolean) => void
}>({
  playerId: '',
  setPlayerId: () => null,
  isPlayerIdChanged: false,
  setIsPlayerIdChanged: () => null,
})

export const PlayerContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playerId, setPlayerId] = useState('')
  useEffect(() => {
    if (localStorage.getItem('minizing-playing')) {
      setPlayerId(localStorage?.getItem('minizing-playing') || '')
    }
  }, [])
  const [isPlayerIdChanged, setIsPlayerIdChanged] = useState(false)

  return (
    <PlayerContext.Provider
      value={{
        playerId,
        setPlayerId,
        isPlayerIdChanged,
        setIsPlayerIdChanged,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
