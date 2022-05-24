import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiProvider } from 'wagmi'
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
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp
