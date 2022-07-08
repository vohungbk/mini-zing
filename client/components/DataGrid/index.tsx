import Image from 'next/image'
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
  handler: (id: string) => void
}

const DataGrid: FC<DataGridProps> = ({ data, handler }) => {
  return (
    <div className={style.grid}>
      {data?.map((item) => {
        const children = (
          <>
            <div className={style.content}>
              <Image
                className={style.image}
                src={item.image}
                alt=""
                objectFit="cover"
                layout="fill"
                priority
              />
              <div className={style.icon}>
                <FaPlay className="fill-white w-5 h-5" />
              </div>
            </div>
            <p className={style.title}>{item.title}</p>
            {!!item.description && (
              <p className={style.description}>{item.description}</p>
            )}
          </>
        )

        return (
          <div key={item.id}>
            <div onClick={() => handler(item.id)} className={style.item}>
              {children}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DataGrid
