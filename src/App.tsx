import WalletConnect from './components/WalletConnect';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <>
      <header style={{ 
        padding: '20px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--surface-border)',
        background: 'rgba(10, 10, 15, 0.8)',
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
            boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)'
          }}>
            S
          </div>
          <h1 style={{ fontSize: '24px', margin: 0 }} className="text-gradient">Shelby App</h1>
        </div>
        
        <WalletConnect />
      </header>

      <main style={{ padding: '40px 20px', flex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '42px', marginBottom: '16px', lineHeight: 1.2 }}>
            Decentralized File Storage <br/>
            Powered by <span className="text-gradient">Shelby Protocol</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Upload your files securely to the fastest decentralized storage network. 
            Connect your Aptos wallet to get started.
          </p>
        </div>

        <FileUpload />
      </main>

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
