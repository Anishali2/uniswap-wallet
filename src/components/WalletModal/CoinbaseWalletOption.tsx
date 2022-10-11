import { Connector } from '@web3-react/types';
// import COINBASE_ICON_URL from 'assets/images/coinbaseWalletIcon.svg'
import { coinbaseWalletConnection, ConnectionType } from '@/connection';
import { getConnectionName } from '@/connection/utils';

import Option from './Option';

const BASE_PROPS = {
  color: '#315CF5',
  icon: 'https://img.icons8.com/pastel-glyph/452/hyperlink--v2.png',
  id: 'coinbase-wallet',
};

export function OpenCoinbaseWalletOption() {
  const isActive = coinbaseWalletConnection.hooks.useIsActive();
  return (
    <Option
      {...BASE_PROPS}
      isActive={isActive}
      link="https://go.cb-w.com/mtUDhEZPy1"
      header="Open in Coinbase Wallet"
    />
  );
}

export function CoinbaseWalletOption({
  tryActivation,
}: {
  tryActivation: (connector: Connector) => void;
}) {
  const isActive = coinbaseWalletConnection.hooks.useIsActive();
  return (
    <Option
      {...BASE_PROPS}
      isActive={isActive}
      onClick={() => tryActivation(coinbaseWalletConnection.connector)}
      header={getConnectionName(ConnectionType.COINBASE_WALLET)}
    />
  );
}
