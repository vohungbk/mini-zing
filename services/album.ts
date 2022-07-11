import axios from 'shared/axios'

interface Album {
  name: string
  images: { url: string }[]
  artists: { id: string; name: string }[]
  tracks: {
    items: {
      id: string
      track_number: number
      name: string
      duration_ms: number
      artists: { name: string }[]
    }[]
  }
}

export const getAlbumInfo = async (albumId: string) => {
  const album = axios
    .get<Album>('/getAlbum', {
      params: {
        albumId,
      },
    })
    .then((res) => res.data)

  return album
}
