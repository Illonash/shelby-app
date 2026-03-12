import { useState, useEffect, useRef } from 'react';
import WalletConnect from './components/WalletConnect';
import FileUpload from './components/FileUpload';

// Mengacu pada folder assets sesuai struktur GitHub kamu
import shelbyLogo from './assets/shelby-logo.png'; 

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi there! I'm Shelby assistant. How can I help you with your files on Shelby today?" }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fungsi auto-scroll agar pesan terbaru selalu terlihat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Tambah pesan user
    const userMsg = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const question = inputValue.toLowerCase();
    setInputValue('');

    // Simulasi respon Shelby (Bahasa Inggris)
    setTimeout(() => {
      let botResponse = "I'm here to help! Feel free to ask me anything about storing your files on our decentralized network.";
      
      if (question.includes("hello") || question.includes("hi")) {
        botResponse = "Hello! Ready to secure your files today?";
      } else if (question.includes("shelby")) {
        botResponse = "I am Shelby, your dedicated assistant for decentralized file storage. I ensure your data is handled with the highest security.";
      } else if (question.includes("how to upload") || question.includes("help")) {
        botResponse = "It's simple! Just connect your Aptos wallet using the button at the top, then drag and drop your files into the upload area.";
      } else if (question.includes("aptos") || question.includes("wallet")) {
        botResponse = "Shelby App uses Aptos wallet for secure authentication and transaction handling.";
      } else if (question.includes("secure") || question.includes("safe")) {
        botResponse = "Absolutely! Your files are stored across a decentralized network, making them much safer than traditional cloud storage.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 800);
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
          {/* LOGO DENGAN PATH ASSETS */}
          <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={shelbyLogo} 
              alt="Shelby Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
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

      {/* FLOATING CHAT ASSISTANT */}
      <div className="chat-trigger" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? '✕' : '💬'}
      </div>

      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header"><span>Shelby Assistant</span></div>
          <div className="chat-messages" style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--shelby-purple)' : '#f0f0f0',
                color: msg.role === 'user' ? 'white' : '#333',
                padding: '10px 15px',
                borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                fontSize: '0.9rem',
                lineHeight: '1.4',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
