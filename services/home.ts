import axios from 'shared/axios'
import { SEED_ARTISTS, TOP_PLAYLISTS } from 'shared/constants'

type Tracks = {
  name: string
  id: string
  album: { images: { url: string }[] }
  artists: { name: string }[]
  images: { url: string }[]
  owner: { display_name: string }
}

interface Recommendations {
  tracks: Tracks[]
}

interface NewRelease {
  albums: { items: Tracks[] }
}

interface FeaturedPlaylists {
  playlists: { items: Tracks[] }
}

interface Categories {
  categories: {
    items: { id: string; name: string; icons: { url: string }[] }[]
  }
}

export const getHomeContent = async () => {
  try {
    const [
      recommendations,
      newReleases,
      topPlaylists,
      featuredPlaylists,
      categories,
    ] = await Promise.all([
      axios
        .get<Recommendations>('/getRecommendations', {
          params: {
            seed_artists: SEED_ARTISTS,
          },
        })
        .then((res) => res.data.tracks),
      axios
        .get<NewRelease>('/getNewReleases', {
          params: {
            country: 'VN',
          },
        })
        .then((res) => res.data),
      Promise.all(
        TOP_PLAYLISTS.map((playlist) =>
          axios
            .get('/getTopPlaylists', {
              params: { playlist, fields: 'id,name,images,uri' },
            })
            .then((res) => res.data)
        )
      ),
      axios
        .get<FeaturedPlaylists>('/getFeaturedPlaylists', {
          params: {
            country: 'VN',
          },
        })
        .then((res) => res.data),
      axios
        .get<Categories>('/getCategories', { params: { country: 'US' } })
        .then((res) => res.data),
    ])

    return {
      recommendations,
      newReleases,
      topPlaylists,
      featuredPlaylists,
      categories,
    }
  } catch (err) {}
}
