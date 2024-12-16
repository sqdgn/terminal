import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { formatUnits } from 'ethers';
import './styles/TokenBalanceChecker.css';

const TARGET_TOKEN_ADDRESS = '0x4674F73545F1db4036250ff8C33A39ad1678D864'

export function TokenBalanceChecker() {
  const { address, isConnected } = useAccount();
  
  const { data: tokenBalance, isLoading } = useBalance({
    address,
    token: TARGET_TOKEN_ADDRESS,
    chainId: base.id,
    query: {
      enabled: isConnected
    }
  });

  return (
    <div>
      <div className="wallet-connect-button">
        <ConnectButton 
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full'
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true
          }}
        />
      </div>

      <div className="balance-content">
        {isConnected && (
          <div className="balance-card">
            {isLoading ? (
              <p>Loading token balance...</p>
            ) : tokenBalance?.value ? (
              <div>
                <h2>Token Balance</h2>
                <div className="balance-display">
                  <p>
                    {parseFloat(formatUnits(tokenBalance.value, tokenBalance.decimals)).toFixed(4)} {" "}
                    <span className="token-symbol">{tokenBalance.symbol}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p>No token balance found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}