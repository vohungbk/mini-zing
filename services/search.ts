import axios from 'shared/axios'

interface Data {
  artists: {
    items: {
      name: string
      id: string
      images: { url: string }[]
      followers: { total: number }
    }[]
  }
  albums: {
    items: {
      name: string
      images: { url: string }[]
      id: string
      total_tracks: number
    }[]
  }
  playlists: {
    items: {
      name: string
      images: { url: string }[]
      id: string
      owner: { display_name: string }
    }[]
  }
  tracks: {
    items: {
      name: string
      id: string
      album: { images: { url: string }[] }
      artists: { name: string }[]
    }[]
  }
}

export const searchByKeywords = async (q: string, token: string) => {
  const result = await axios
    .get<Data>('/search', {
      params: {
        q,
        types: ['artist', 'track', 'album', 'playlist'],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

  return result
}
