import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Web3Provider from '@/components/Web3Provider';
import { Provider } from 'react-redux';
import store from '@/state';
import { FeatureFlagsProvider } from '@/featureFlags';
import ThemeProvider, { ThemedGlobalStyle } from '../theme';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FeatureFlagsProvider>
        <Provider store={store}>
          <Web3Provider>
            <ThemeProvider>
              <ThemedGlobalStyle />
              <Component {...pageProps} />;
            </ThemeProvider>
          </Web3Provider>
        </Provider>
      </FeatureFlagsProvider>
    </>
  );
}
