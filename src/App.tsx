import { useState } from 'react'; // Tambahkan ini di paling atas
import WalletConnect from './components/WalletConnect';
import FileUpload from './components/FileUpload';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Kode Header & Main tetap sama seperti sebelumnya... */}
      <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', background: 'rgba(255, 240, 246, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', color: 'white' }}>S</div>
          <h1 style={{ fontSize: '24px', margin: 0 }} className="text-gradient">Shelby</h1>
        </div>
        <WalletConnect />
      </header>

      <main style={{ padding: '40px 20px', flex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '42px', marginBottom: '16px', lineHeight: 1.2, color: 'var(--text-primary)' }}>
            Decentralized File Storage <br/>
            Powered by <span className="text-gradient">Shelby</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Safe, secure, and smart. Let Shelby handle your data on the Antigravity network.
          </p>
        </div>
        <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
           <FileUpload />
        </div>
      </main>

      {/* --- FITUR BARU: CHAT ASSISTANT --- */}
      <div className="chat-trigger" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? '✕' : '💬'}
      </div>

      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Shelby Assistant</span>
          </div>
          <div className="chat-messages">
            <div className="message-bot">
              Halo! Saya Shelby. Butuh bantuan untuk upload file ke Antigravity hari ini?
            </div>
          </div>
          <div className="chat-input-area">
            <input type="text" placeholder="Tanya sesuatu..." />
            <button className="btn-primary" style={{ padding: '5px 15px', borderRadius: '15px' }}>Kirim</button>
          </div>
        </div>
      )}

      <footer style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--surface-border)', marginTop: 'auto' }}>
        <p>Built by <a href="https://x.com/illonashanum" target="_blank" className="footer-link">illonashanum</a></p>
      </footer>
    </>
  );
}

export default App;
