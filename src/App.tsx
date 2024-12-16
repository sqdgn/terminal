import { WalletProvider } from './config/WalletProvider.tsx'
import { TokenBalanceChecker } from './components/TokenBalanceChecker.tsx'

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex items-center justify-center">
        <TokenBalanceChecker />
      </div>
    </WalletProvider>
  )
}

export default App