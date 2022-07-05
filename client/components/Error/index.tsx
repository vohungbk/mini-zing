import Image from 'next/image'
import style from './Style.module.scss'

const Error = () => {
  return (
    <div className={style.error}>
      <Image width={200} height={200} src="/error.png" alt="Error" />
      <h1 className={style.text}>Something went wrong</h1>
    </div>
  )
}
export default Error
