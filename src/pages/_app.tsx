// Components import
import GlobalProvider from '../Providers/GlobalProvider';
import createEmotionCache from '../utils/createEmotionCache'
import { CacheProvider } from '@emotion/react';
import { MyAppProps } from '../models/Props'
import store from '../redux/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'

const clientSideEmotionCache = createEmotionCache();

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <GlobalProvider>
        <CacheProvider value={emotionCache}>
          <div style={{ display: "flex", flexDirection: "column", height: "calc(var(--vh, 1vh) * 100)" }}>
            <Component {...pageProps} />
          </div>
        </CacheProvider>
      </GlobalProvider>
    </Provider>
  )
}

export default App
