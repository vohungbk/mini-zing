import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { useHttpContext } from '@Components/Http'

interface User {
  access_token: string
  expires_in: number
  token_type: string
}

interface ProviderProps {
  children: ReactNode
}

export const Provider: FunctionComponent<ProviderProps> = ({ children }) => {
  const { setToken } = useHttpContext()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    getUserAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserAccount = async () => {
    const user: User = await axios
      .request({
        method: 'post',
        url: process.env.NEXT_PUBLIC_ACCOUNT_URL,
        data: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BASE_AUTHOR}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data)
    setUser(user)
    setToken(user.access_token)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        refresh()
      }, user?.expires_in * 1000)
    }
  }, [user])

  const refresh = async () => {
    const user: User = await axios
      .request({
        method: 'post',
        url: process.env.NEXT_PUBLIC_ACCOUNT_URL,
        data: 'grant_type=refresh_token',
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BASE_AUTHOR}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data)
    sessionStorage.setItem('accessToken', user.access_token)
  }

  if (!user) {
    return null
  }

  return <React.Fragment>{children}</React.Fragment>
}
