import axios from 'shared/axios'

interface Playlist {
  id: string
  images: { url: string }[]
  name: string
  owner: { display_name: string }
  tracks: {
    items: {
      id: string
      track_number: number
      name: string
      duration_ms: number
      artists: { name: string }[]
      track: {
        id: string
        name: string
        duration_ms: number
        artists: { name: string }[]
      }
    }[]
  }
}

export const getPlaylistInfo = async (id: string, token: string) => {
  const album = axios
    .get<Playlist>('/getPlaylist', {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

  return album
}
