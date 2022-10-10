import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Web3Provider from '@/components/Web3Provider';
import { Provider } from 'react-redux';
import store from '@/state';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Web3Provider>
          <Component {...pageProps} />;
        </Web3Provider>
      </Provider>
    </>
  );
}
