import GlobalProvider from '../Providers/GlobalProvider'
import createEmotionCache from '../utils/createEmotionCache'
import { CacheProvider } from '@emotion/react';
import { MyAppProps } from '../models/Props'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'

const clientSideEmotionCache = createEmotionCache();

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <GlobalProvider>
      <CacheProvider value={emotionCache}>
        <Component {...pageProps} />
      </CacheProvider>
    </GlobalProvider>
  )
}
