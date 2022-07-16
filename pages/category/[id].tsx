import DataGrid from '@Components/DataGrid'
import Error from '@Components/Error'
import { useHttpContext } from '@Components/Http'
import Loading from '@Components/Loading'
import { useRouter } from 'next/router'
import { getCategoryInfo } from 'services/categories'
import useSWR from 'swr'

import style from './Style.module.scss'

const Categories = () => {
  const { token } = useHttpContext()
  const router = useRouter()
  const { id } = router.query

  const { error, data } = useSWR(`category-${id}`, () =>
    getCategoryInfo(id as string, token)
  )

  if (error) return <Error />

  if (!data) return <Loading />

  return (
    <div className={style.category}>
      <h1 className={style.title}>Category: {data?.category.name}</h1>
      {data && (
        <DataGrid
          type="link"
          href="/playlist"
          data={data?.playlists.playlists.items
            ?.filter((playlist) => playlist.name)
            ?.map((playlist) => ({
              id: playlist.id,
              image: playlist.images?.[0]?.url,
              title: playlist.name,
              description: playlist?.owner?.display_name,
            }))}
        />
      )}
    </div>
  )
}

export default Categories
