import { WalletProvider } from './config/WalletProvider.tsx'
import { TokenBalanceChecker } from './components/TokenBalanceChecker.tsx'

function App() {
  return (
    <WalletProvider>
    <TokenBalanceChecker />
    </WalletProvider>
  )
}

export default App