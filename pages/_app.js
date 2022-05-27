import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiProvider } from 'wagmi'
import { Provider } from 'react-redux'
import store from '../redux-store/store'
import { MoralisProvider } from "react-moralis";

import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';


const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Dree store',
  chains
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <MoralisProvider serverUrl="https://hn9a0jxn8b1z.usemoralis.com:2053/server" appId="qlhoRbMe3GWpl9wwyK9v1rXMalAAytVIn6Gn0Gcy">
          <Component {...pageProps} />
        </MoralisProvider> 
      </RainbowKitProvider>
    </WagmiProvider>
    </Provider>
    
  );
}

export default MyApp
