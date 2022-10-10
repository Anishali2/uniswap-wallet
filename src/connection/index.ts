import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { SupportedChainId } from '@/constants/chains';
import { RPC_URLS } from '@/constants/networks';
import { RPC_PROVIDERS } from '@/constants/providers';

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({ actions, urlMap: RPC_PROVIDERS, defaultChainId: 1 }),
);
export const networkConnection: Connection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
};

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError }),
);
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
};

const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector<GnosisSafe>(
  (actions) => new GnosisSafe({ actions }),
);
export const gnosisSafeConnection: Connection = {
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: ConnectionType.GNOSIS_SAFE,
};

const [web3WalletConnect, web3WalletConnectHooks] =
  initializeConnector<WalletConnect>(
    (actions) =>
      new WalletConnect({
        actions,
        options: {
          rpc: RPC_URLS,
          qrcode: true,
        },
        onError,
      }),
  );
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
};

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] =
  initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: RPC_URLS[SupportedChainId.MAINNET][0],
          appName: 'Uniswap',
          appLogoUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logodesign.net%2Flogos&psig=AOvVaw2f37124t-7UmU2jYAtQZSd&ust=1665292776738000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPD36pTxz_oCFQAAAAAdAAAAABAE",
          reloadOnDisconnect: false,
        },
        onError,
      }),
  );
export const coinbaseWalletConnection: Connection = {
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
};
