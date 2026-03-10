import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { UploadCloud, File, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getShelbyClient, getAptosClient, encodeShelbyFile, createRegistrationPayload } from '../lib/shelby';

export default function FileUpload() {
  const { connected, account, signAndSubmitTransaction } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [status, setStatus] = useState<'idle' | 'encoding' | 'registering' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStatus('idle');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!file || !account) return;
    
    try {
      // 1. Encoding
      setStatus('encoding');
      const commitments = await encodeShelbyFile(file);
      
      // 2. Registering (On-Chain)
      setStatus('registering');
      const payload = createRegistrationPayload(account.address, file.name, commitments);
      
      const transactionSubmitted = await signAndSubmitTransaction({
        data: payload
      });
      
      const aptosClient = getAptosClient();
      await aptosClient.waitForTransaction({
        transactionHash: transactionSubmitted.hash,
      });

      // 3. RPC Upload
      setStatus('uploading');
      const shelbyClient = getShelbyClient();
      await shelbyClient.rpc.putBlob({
        account: account.address,
        blobName: file.name,
        blobData: new Uint8Array(await file.arrayBuffer()),
      });
      
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'An error occurred during upload. Remember to secure Testnet APT and ShelbyUSD in Discord first.');
    }
  };

  if (!connected) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', margin: '40px auto', maxWidth: '600px' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--brand-primary)' 
        }}>
          <UploadCloud size={32} />
        </div>
        <h2 style={{ marginBottom: '12px', fontSize: '24px' }}>Connect Your Wallet</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          You need to connect your Aptos wallet to upload files to the Shelby network. 
          Make sure your wallet is connected to the Testnet and has APT / ShelbyUSD tokens.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '40px', margin: '40px auto', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', textAlign: 'center' }}>Upload to Shelby</h2>
      
      {!file ? (
        <label 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            border: `2px dashed ${isHovering ? 'var(--brand-primary)' : 'var(--surface-border)'}`,
            borderRadius: '16px',
            background: isHovering ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <UploadCloud size={48} style={{ color: isHovering ? 'var(--brand-primary)' : 'var(--text-secondary)', marginBottom: '16px' }} />
          <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Drag & Drop your file here</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>or click to browse</p>
          <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        </label>
      ) : (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', marginBottom: '24px' }}>
            <File size={32} color="var(--brand-primary)" />
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{formatFileSize(file.size)}</p>
            </div>
            {status === 'idle' && (
              <button 
                onClick={() => setFile(null)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px' }}
              >
                ✕
              </button>
            )}
          </div>

          {status === 'success' ? (
            <div style={{ padding: '20px', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.2)', textAlign: 'center', color: '#4ade80' }}>
              <CheckCircle2 size={48} style={{ margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: '8px' }}>Upload Successful!</h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Your file has been stored securely on the Shelby network.</p>
              <button 
                className="btn btn-outline" 
                onClick={() => {setFile(null); setStatus('idle');}}
                style={{ marginTop: '20px', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.4)' }}
              >
                Upload Another File
              </button>
            </div>
          ) : status === 'error' ? (
            <div style={{ padding: '20px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <AlertCircle size={24} />
                <h3 style={{ margin: 0 }}>Upload Failed</h3>
              </div>
              <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>{errorMsg}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" onClick={handleUpload} style={{ background: '#f43f5e', boxShadow: 'none' }}>Try Again</button>
                <button className="btn btn-outline" onClick={() => {setFile(null); setStatus('idle');}} style={{ color: 'var(--text-primary)' }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                onClick={handleUpload}
                disabled={status !== 'idle'}
              >
                {status === 'idle' ? 'Upload to Shelby' : 'Processing...'}
              </button>
              
              {status !== 'idle' && (
                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <span style={{ color: status === 'encoding' ? 'var(--brand-primary)' : 'inherit' }}>1. Encoding</span>
                    <span style={{ color: status === 'registering' ? 'var(--brand-primary)' : 'inherit' }}>2. Registering</span>
                    <span style={{ color: status === 'uploading' ? 'var(--brand-primary)' : 'inherit' }}>3. Uploading</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      background: 'var(--gradient-main)', 
                      width: status === 'encoding' ? '33%' : status === 'registering' ? '66%' : '100%',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
