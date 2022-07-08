import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { SWRConfig } from 'swr'

const HTTP_DEFAULT_CONFIG = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

interface HttpContextType {
  token: string
  setToken: (token: string) => void
}

const initHttpContext: HttpContextType = { token: '', setToken: () => null }

const Context = createContext(initHttpContext)
export const useHttpContext = (): HttpContextType => useContext(Context)

interface HttpProps {
  token: string
  children: ReactNode
}

const Http: FunctionComponent<HttpProps> = (props) => {
  const [token, setToken] = useState<string>('')

  useEffect(() => setToken(props.token), [props.token])

  return (
    <SWRConfig
      value={{
        ...HTTP_DEFAULT_CONFIG,
      }}
    >
      <Context.Provider value={{ token, setToken }}>
        {props.children}
      </Context.Provider>
    </SWRConfig>
  )
}

export default Http
