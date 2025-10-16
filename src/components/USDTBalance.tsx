import { useState } from 'react';
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
// Import ethers v5
import { ethers } from "ethers";

const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export default function USDTBalance() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function getBalance() {
    if (!isConnected || !walletProvider) {
      console.log("Wallet not connected or provider not available");
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching USDT balance for address:", address);
      // Create ethers provider from the wallet provider
      // Type assertion to tell TypeScript that walletProvider implements EIP1193Provider
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider as unknown as ethers.providers.ExternalProvider);
      console.log("Ethers provider created successfully");
      
      const signer = ethersProvider.getSigner();
      console.log("Signer created successfully");
      
      // The Contract object
      const USDTContract = new ethers.Contract(USDTAddress, USDTAbi, signer);
      console.log("USDT Contract created successfully");
      
      const USDTBalance = await USDTContract.balanceOf(address);
      console.log("Raw USDT Balance:", USDTBalance.toString());

      // Format the balance (USDT has 6 decimals, not 18)
      const formattedBalance = ethers.utils.formatUnits(USDTBalance, 6);
      console.log("Formatted USDT Balance:", formattedBalance);
      
      setUsdtBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
      setUsdtBalance("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>USDT Balance</h3>
      {isConnected ? (
        <>
          <button 
            onClick={getBalance}
            disabled={loading || !walletProvider}
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              border: '1px solid #000', 
              backgroundColor: '#000', 
              color: '#fff', 
              cursor: loading || !walletProvider ? 'not-allowed' : 'pointer',
              opacity: loading || !walletProvider ? 0.7 : 1
            }}
          >
            {loading ? 'Fetching...' : 'Get USDT Balance'}
          </button>
          {usdtBalance && (
            <p style={{ marginTop: '10px' }}>
              USDT Balance: <strong>{usdtBalance} USDT</strong>
            </p>
          )}
        </>
      ) : (
        <p>Connect wallet to check USDT balance</p>
      )}
    </div>
  );
}