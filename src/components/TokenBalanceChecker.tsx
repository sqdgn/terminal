import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { formatUnits } from 'ethers';
import './styles/TokenBalanceChecker.css';
import { useState } from 'react';

const TARGET_TOKEN_ADDRESS = '0x4674F73545F1db4036250ff8C33A39ad1678D864'
const MINIMUM_TOKEN_THRESHOLD = 100_000; // 100,000 tokens

export function TokenBalanceChecker() {
  const { address, isConnected } = useAccount();
  const [userInput, setUserInput] = useState('');
  
  const { data: tokenBalance, isLoading } = useBalance({
    address,
    token: TARGET_TOKEN_ADDRESS,
    chainId: base.id,
    query: {
      enabled: isConnected
    }
  });
  const meetsTokenGate = () => {
    if (!tokenBalance) return false;
    
    // Convert balance to a human-readable number
    const balanceAmount = parseFloat(
      tokenBalance.formatted
    );

    return balanceAmount >= MINIMUM_TOKEN_THRESHOLD;
  };

  const renderContent = () => {
    // Not connected
    if (!isConnected) {
      return (
        <div className="token-gate-message">
          <p>Please connect your wallet to access the token-gated feature.</p>
        </div>
      );
    }

    // Loading balance
    if (isLoading) {
      return (
        <div className="token-gate-message">
          <p>Checking token balance...</p>
        </div>
      );
    }

    // Insufficient tokens
    if (!meetsTokenGate()) {
      return (
        <div className="token-gate-message">
          <p>Insufficient token balance. You need at least {MINIMUM_TOKEN_THRESHOLD} tokens to access this feature.</p>
        </div>
      );
    }

    return (
      <div className="token-gated-input-container">
        <input 
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt here"
          className="token-gated-input"
        />
        <button className="submit-button">Submit</button>
      </div>
    );
  };

  return (
    <div className="main-container">
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
        <div className="balance-card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}