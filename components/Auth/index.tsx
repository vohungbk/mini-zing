import {
  createContext,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import cookie from 'js-cookie'
import axios from 'axios'
import { useHttpContext } from '@Components/Http'

interface User {
  access_token: string
  expires_in: number
  token_type: string
}

interface AuthContextType {
  authenticate: (data: User) => void
}

interface ProviderProps {
  children: ReactNode
}

const initAuthContextState: AuthContextType = {
  authenticate: () => null,
}

const Context = createContext(initAuthContextState)

export const Provider: FunctionComponent<ProviderProps> = ({ children }) => {
  const { setToken } = useHttpContext()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (!cookie.get('accessToken')) {
      getUserAccount()
    }
    return () => {
      window.alert('123')

      cookie.remove('accessToken')
    }
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
    authenticate(user)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        refresh()
        cookie.remove('accessToken')
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
    authenticate(user)
  }

  const authenticate = (data: User) => {
    cookie.set('accessToken', data.access_token, { expires: data.expires_in })
  }

  const value: AuthContextType = {
    authenticate,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
