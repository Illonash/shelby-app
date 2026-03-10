import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';

export default function WalletConnect() {
  const { account, connected, disconnect, connect, wallets } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  // Helper to format address nicely
  const formatAddress = (address: any) => {
    const addrStr = address?.toString() || '';
    return `${addrStr.slice(0, 6)}...${addrStr.slice(-4)}`;
  };

  if (connected && account) {
    return (
      <div className="wallet-connected glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', borderRadius: '30px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 8px #4ade80' }}></div>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>{formatAddress(account.address)}</span>
        <button 
          onClick={() => disconnect()} 
          className="btn btn-outline"
          style={{ padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '4px' }}
          title="Disconnect Wallet"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button 
        className="btn btn-primary" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px 24px', borderRadius: '30px' }}
      >
        <Wallet size={18} />
        Connect Wallet
        <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{ 
          position: 'absolute', 
          top: 'calc(100% + 12px)', 
          right: 0, 
          width: '240px', 
          padding: '8px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <h3 style={{ fontSize: '12px', padding: '8px 12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available Wallets</h3>
          {wallets?.map((wallet: any) => (
            <button
              key={wallet.name}
              onClick={() => {
                connect(wallet.name);
                setIsOpen(false);
              }}
              className="btn btn-outline"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px',
                border: 'none',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <img src={wallet.icon} alt={wallet.name} style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
              <span>{wallet.name}</span>
            </button>
          ))}
          {(!wallets || wallets.length === 0) && (
            <div style={{ padding: '12px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              No wallets detected. Please install Petra Wallet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
