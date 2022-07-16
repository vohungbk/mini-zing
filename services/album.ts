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

export const getAlbumInfo = async (albumId: string, token: string) => {
  const album = axios
    .get<Album>('/getAlbum', {
      params: {
        albumId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

  return album
}
