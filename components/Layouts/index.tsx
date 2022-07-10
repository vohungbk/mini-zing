import Player from '@Components/Player'
import { PlayerContext } from 'context/PlayerContext'
import { FunctionComponent, ReactNode, useContext, useEffect } from 'react'
import Header from './components/Header'

import style from './Style.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { playerId } = useContext(PlayerContext)

  useEffect(() => {
    if (playerId) {
      localStorage.setItem('minizing-playing', playerId)
    }
  }, [playerId])

  return (
    <div className={style.layout}>
      <Header />
      <div className={style.container}>{children}</div>
      {!!playerId && <Player key={playerId} />}
    </div>
  )
}

export default Layout
