import axios from 'shared/axios'

interface Artist {
  name: string
  images: { url: string }[]
  followers: { total: number }
  popularity: number
}

interface TopTrack {
  tracks: {
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
    album: { images: { url: string }[] }
  }[]
}
interface RelatedArtist {
  artists: {
    name: string
    type: string
    id: string
    images: { url: string }[]
    followers: { total: number }
  }[]
}

interface Album {
  items: {
    name: string
    id: string
    images: { url: string }[]
    artists: { name: string }[]
  }[]
}

export const getArtistInfo = async (id: string) => {
  const [artist, topTrack, albums, relatedArtists] = await Promise.all([
    axios
      .get<Artist>('/getArtist', {
        params: {
          id,
        },
      })
      .then((res) => res.data),
    axios
      .get<TopTrack>('/getTopTrack', {
        params: {
          id,
        },
      })
      .then((res) => res.data),
    axios
      .get<Album>('/getAlbumArtists', {
        params: {
          id,
        },
      })
      .then((res) => res.data),
    axios
      .get<RelatedArtist>('/getRelatedArtists', {
        params: {
          id,
        },
      })
      .then((res) => res.data),
  ])

  return { artist, topTrack, albums, relatedArtists }
}
