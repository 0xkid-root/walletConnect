import { useState, useEffect, useCallback } from 'react'
import './App.css'
import ConnectButton from './components/ConnectButton'
import { useAppKitAccount, useAppKitNetwork, useAppKitBalance } from '@reown/appkit/react'

function App() {
  const { address, isConnected, status } = useAppKitAccount()
  const { caipNetwork } = useAppKitNetwork()
  const { fetchBalance } = useAppKitBalance()
  const [balance, setBalance] = useState<string | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(false)

  // Function to get status class based on wallet status
  const getStatusClass = () => {
    switch (status) {
      case 'connected':
        return 'status-connected'
      case 'disconnected':
        return 'status-disconnected'
      case 'connecting':
        return 'status-connecting'
      default:
        return ''
    }
  }

  // Function to get status message based on wallet status
  const getStatusMessage = () => {
    switch (status) {
      case 'connected':
        return 'Wallet is connected and unlocked'
      case 'disconnected':
        return 'Wallet is disconnected'
      case 'connecting':
        return 'Connecting to wallet...'
      default:
        return status || 'Unknown status'
    }
  }

  // Fetch balance when address or network changes
  const getBalance = useCallback(async () => {
    if (isConnected && address) {
      setBalanceLoading(true)
      try {
        const result = await fetchBalance()
        if (result?.data?.balance) {
          setBalance(result.data.balance)
        } else {
          setBalance('0')
        }
      } catch (error) {
        console.error('Error fetching balance:', error)
        setBalance('Error')
      } finally {
        setBalanceLoading(false)
      }
    } else {
      setBalance(null)
    }
  }, [isConnected, address, caipNetwork?.id])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return (
    <>      
      {/* Wallet Connection Section */}
      <div className="wallet-section">
        <h2>Wallet Connection</h2>
        {isConnected ? (
          <div>
            <p>Connected as: <span className="wallet-address">{address?.slice(0, 6)}...{address?.slice(-4)}</span></p>
            <p>Network: <strong>{caipNetwork?.name || 'Unknown'}</strong></p>
            <p>
              Balance: 
              {balanceLoading ? (
                <span> Loading...</span>
              ) : balance ? (
                <span> <strong>{balance} {caipNetwork?.nativeCurrency?.symbol || 'ETH'}</strong></span>
              ) : (
                <span> Not available</span>
              )}
            </p>
            <p>Status: <span className={getStatusClass()}>{getStatusMessage()}</span></p>
          </div>
        ) : (
          <p>Not connected to a wallet</p>
        )}
        <ConnectButton />
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App