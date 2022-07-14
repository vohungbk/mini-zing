import axios from 'shared/axios'

interface Categories {
  id: string
  name: string
}

interface Playlist {
  playlists: {
    items: {
      name: string
      id: string
      images: { url: string }[]
      owner: { display_name: string }
    }[]
  }
}

export const getCategoryInfo = async (id: string) => {
  const [category, playlists] = await Promise.all([
    axios
      .get<Categories>('/getCategory', { params: { id } })
      .then((res) => res.data),
    axios
      .get<Playlist>('/getCategoryPlaylists', { params: { id } })
      .then((res) => res.data),
  ])
  return { category, playlists }
}
