import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Aptos Wallet Adapter
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>,
);
