import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaPlay } from 'react-icons/fa'

import style from './Style.module.scss'

interface DataGridProps {
  data: {
    id: string
    image: string
    title: string
    description?: string
  }[]
  type: 'link' | 'button'
  href?: string
  handler?: (id: string) => void
}

const DataGrid: FC<DataGridProps> = ({ data, type, href, handler }) => {
  return (
    <div className={style.grid}>
      {data?.map((item) => {
        const children = (
          <>
            <div className={style.content}>
              <Image
                className={style.image}
                src={item.image || '/image-default.png'}
                alt=""
                objectFit="cover"
                layout="fill"
                priority
              />
              <div className={style.icon}>
                <FaPlay className="fill-white w-5 h-5" />
              </div>
            </div>
            <p className={classnames([style.title], 'line-clamp-2')}>
              {item.title}
            </p>
            {!!item.description && (
              <p className={classnames([style.description, 'line-clamp-2'])}>
                {item.description}
              </p>
            )}
          </>
        )

        if (type === 'link')
          return (
            <div key={item.id}>
              <Link href={`${href}/${item.id}`}>
                <a className={style.link}>{children}</a>
              </Link>
            </div>
          )

        return (
          <div key={item.id}>
            <div onClick={() => handler?.(item.id)} className={style.item}>
              {children}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DataGrid
