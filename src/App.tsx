import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import FileUpload from './components/FileUpload';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Fungsi untuk menangani pengiriman pesan (simulasi)
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      alert(`Shelby received: ${inputValue}\n(Connection to AI coming soon!)`);
      setInputValue('');
    }
  };

  return (
    <>
      <header style={{ 
        padding: '20px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--surface-border)',
        background: 'rgba(255, 240, 246, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '10px', 
            background: 'var(--gradient-main)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: 'white',
            boxShadow: '0 4px 14px 0 rgba(255, 126, 182, 0.39)'
          }}>
            S
          </div>
          <h1 style={{ fontSize: '24px', margin: 0 }} className="text-gradient">Shelby App</h1>
        </div>
        <WalletConnect />
      </header>

      <main style={{ padding: '40px 20px', flex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '42px', marginBottom: '16px', lineHeight: 1.2, color: 'var(--text-primary)' }}>
            Decentralized File Storage <br/>
            Powered by <span className="text-gradient">Shelby</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Upload your files securely to the fastest decentralized storage network. 
            Connect your Aptos wallet to get started.
          </p>
        </div>

        <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
           <FileUpload />
        </div>
      </main>

      {/* FLOATING CHAT BUTTON */}
      <div className="chat-trigger" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? '✕' : '💬'}
      </div>

      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Shelby Assistant</span>
          </div>
          <div className="chat-messages" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="message-bot">
              Hi there! I'm Shelby assistant. How can I help you with your files on Shelby today?
            </div>
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button className="btn-primary" onClick={handleSendMessage} style={{ padding: '5px 15px', borderRadius: '15px' }}>
              Send
            </button>
          </div>
        </div>
      )}

      <footer style={{ 
        padding: '24px', 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        borderTop: '1px solid var(--surface-border)', 
        marginTop: 'auto' 
      }}>
        <p>
          Built by <a href="https://x.com/illonashanum" target="_blank" rel="noopener noreferrer" className="footer-link">illonashanum</a>, 
          powered by <a href="https://x.com/shelbyserves" target="_blank" rel="noopener noreferrer" className="footer-link">Shelby</a>
        </p>
      </footer>
    </>
  );
}

export default App;
