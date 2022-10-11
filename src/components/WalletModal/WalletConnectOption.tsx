import { Connector } from '@web3-react/types';
import { ConnectionType, walletConnectConnection } from '@/connection';
import { getConnectionName } from '@/connection/utils';

import Option from './Option';

const BASE_PROPS = {
  color: '#4196FC',
  icon: 'https://img.icons8.com/pastel-glyph/452/hyperlink--v2.png',
  id: 'wallet-connect',
};

export function WalletConnectOption({
  tryActivation,
}: {
  tryActivation: (connector: Connector) => void;
}) {
  const isActive = walletConnectConnection.hooks.useIsActive();
  return (
    <Option
      {...BASE_PROPS}
      isActive={isActive}
      onClick={() => tryActivation(walletConnectConnection.connector)}
      header={getConnectionName(ConnectionType.WALLET_CONNECT)}
    />
  );
}