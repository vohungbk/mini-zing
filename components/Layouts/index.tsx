import { FunctionComponent, ReactNode } from 'react'
import Header from './components/Header'

import style from './Style.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className={style.layout}>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default Layout
