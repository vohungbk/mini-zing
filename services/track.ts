import axios from 'shared/axios'

type Track = {
  preview_url: string
  artists: [
    {
      external_urls: {
        spotify: string
      }
      uri: 'spotify:artist:5Rl15oVamLq7FbSb0NNBNy'
      id: string
      name: string
    }
  ]
  album: { images: { url: string }[] }
  name: string
  external_urls: { spotify: string }
}

export const getTrackInfo = async (id: string, token: string) => {
  const track = await axios
    .get<Track>('/getTrack', {
      params: { trackId: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  return track
}
