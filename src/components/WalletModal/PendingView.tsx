import { Connector } from '@web3-react/types';
import { ButtonEmpty, ButtonPrimary } from '@/components/Button';
import {
  RedesignVariant,
  useRedesignFlag,
} from '@/featureFlags/flags/redesign';
import { AlertTriangle } from 'react-feather';
import styled from 'styled-components/macro';

const PendingSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const WaitingToConnectSection = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const AlertTriangleIcon = styled(AlertTriangle)`
  width: 25%;
  height: 25%;
  stroke-width: 1;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.accentCritical};
`;

const LoaderContainer = styled.div`
  margin: 16px 0;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  & > * {
    padding: 1rem;
  }
`;

const ErrorGroup = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: flex-start;
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
`;

export default function PendingView({
  connector,
  error = false,
  tryActivation,
  openOptions,
}: {
  connector: Connector;
  error?: boolean;
  tryActivation: (connector: Connector) => void;
  openOptions: () => void;
}) {
  const redesignFlag = useRedesignFlag();
  const redesignFlagEnabled = redesignFlag === RedesignVariant.Enabled;

  return redesignFlagEnabled ? (
    <PendingSection>
      <LoadingMessage>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <AlertTriangleIcon />
              <p>Error connecting</p>
              <p>
                The connection attempt failed. Please click try again and follow
                the steps to connect in your wallet.
              </p>
              <ButtonPrimary
                $borderRadius="12px"
                redesignFlag={true}
                onClick={() => {
                  tryActivation(connector);
                }}
              >
                <p>Try Again</p>
              </ButtonPrimary>
              <ButtonEmpty width="fit-content" padding="0" marginTop={20}>
                <p>Back to wallet selection</p>
              </ButtonEmpty>
            </ErrorGroup>
          ) : (
            <>
              <WaitingToConnectSection>
                <p>Loading</p>
                <p>Waiting to connect</p>
                <p>Confirm this connection in your wallet</p>
              </WaitingToConnectSection>
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
    </PendingSection>
  ) : (
    <PendingSection>
      <LoadingMessage>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <p>Error connecting</p>
              <p>
                The connection attempt failed. Please click try again and follow
                the steps to connect in your wallet.
              </p>
              <ButtonPrimary
                $borderRadius="12px"
                padding="12px"
                onClick={() => {
                  tryActivation(connector);
                }}
              >
                <p>Try Again</p>
              </ButtonPrimary>
              <ButtonEmpty width="fit-content" padding="0" marginTop={20}>
                <p>Back to wallet selection</p>
              </ButtonEmpty>
            </ErrorGroup>
          ) : (
            <>
              {/* <LoaderContainer>
                <Loader stroke="currentColor" size="32px" />
              </LoaderContainer> */}
              <p>Connecting...</p>
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
    </PendingSection>
  );
}
