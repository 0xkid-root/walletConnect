import { useAppKit } from "@reown/appkit/react";
import {  useAppKitAccount } from "@reown/appkit/react";
import { modal } from '../lib/appkit'; 


// Connect Button Component
export function ConnectButton() {
  // Use modal hook
  const { open, close } = useAppKit();
  const { isConnected } = useAppKitAccount();

  // Handle disconnect
  const handleDisconnect = () => {
    // Try using the modal's disconnect method if available
    if (modal && typeof modal.disconnect === 'function') {
      modal.disconnect();
    } else {
      // Fallback to close method
      close();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
      {isConnected ? (
        <button 
          onClick={handleDisconnect}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: '#dc3545', 
            color: '#fff', 
            cursor: 'pointer' 
          }}
        >
          Disconnect Wallet
        </button>
      ) : (
        <button 
          onClick={() => open()} 
          style={{ 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: '#000', 
            color: '#fff', 
            cursor: 'pointer' 
          }}
        >
          Connect Wallet
        </button>
      )}
      <button 
        onClick={() => open({ view: "Networks" })} 
        style={{ 
          padding: '10px 20px', 
          borderRadius: '8px', 
          border: '1px solid #000', 
          backgroundColor: '#fff', 
          color: '#000', 
          cursor: 'pointer' 
        }}
      >
        Switch Network
      </button>
    </div>
  );
}
