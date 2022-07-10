import axios from 'shared/axios'
import { SEED_ARTISTS } from 'shared/constants'

type Tracks = {
  name: string
  id: string
  album: { images: { url: string }[] }
  artists: { name: string }[]
}

interface Recommendations {
  tracks: Tracks[]
}

export const getHomeContent = async () => {
  try {
    const [recommendations] = await Promise.all([
      axios
        .get<Recommendations>('/getRecommendations', {
          params: {
            seed_artists: SEED_ARTISTS,
          },
        })
        .then((res) => res.data.tracks),
    ])
    return {
      recommendations,
    }
  } catch (err) {}
}
