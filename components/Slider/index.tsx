import classnames from 'classnames'
import { FC, useRef } from 'react'
import style from './Style.module.scss'

interface SliderProps {
  className?: string
  width: number
  setWidth: (value: number) => void
}

const Slider: FC<SliderProps> = ({ className, width, setWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        if (containerRef.current) {
          let width =
            ((e.clientX - containerRef.current.getBoundingClientRect().left) /
              containerRef.current.offsetWidth) *
            100

          width = width < 0 ? 0 : width > 100 ? 100 : width
          setWidth(width)

          const moveHandler = (e: MouseEvent) => {
            if (containerRef.current) {
              let width =
                ((e.clientX -
                  containerRef.current.getBoundingClientRect().left) /
                  containerRef.current.offsetWidth) *
                100

              width = width < 0 ? 0 : width > 100 ? 100 : width
              setWidth(width)
            }
          }

          window.addEventListener('mousemove', moveHandler)

          window.addEventListener(
            'mouseup',
            () => {
              window.removeEventListener('mousemove', moveHandler)
            },
            { once: true }
          )
        }
      }}
      className={classnames([style.container, className])}
    >
      <div className={classnames([style.content, className])}>
        <div style={{ width: `${width}%` }} className={style.item}></div>
      </div>
    </div>
  )
}

export default Slider
