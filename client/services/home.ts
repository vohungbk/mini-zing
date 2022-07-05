import { zing } from 'zingmp3-api-next'


export const getHomeContent = async () => {
  const data = await zing.get_home()

  return data
}
