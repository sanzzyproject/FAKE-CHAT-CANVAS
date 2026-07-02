'use client';

import { useState, useEffect } from 'react';
import { Upload, Download, Image as ImageIcon, MessageCircle, Clock, Type, Bird, X, Mail, Globe, MapPin } from 'lucide-react';

function InputField({ label, value, onChange, placeholder, icon: Icon }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-400">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            <Icon size={18} />
          </div>
        )}
        <input
          type="text"
          className={`w-full bg-[#111111] border border-zinc-800 rounded-lg py-2.5 text-[#f1f1f1] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-400">{label}</label>
      <textarea
        className="w-full bg-[#111111] border border-zinc-800 rounded-lg px-4 py-3 text-[#f1f1f1] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all min-h-[100px] resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function ImageUploadField({ label, value, onChange }: any) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-400">{label}</label>
      <div className="relative group">
        {value ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-zinc-800 bg-[#111111] group-hover:border-zinc-600 transition-colors">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs text-[#f1f1f1] font-medium bg-black/50 px-3 py-1.5 rounded-md backdrop-blur-sm">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-32 rounded-lg border-2 border-dashed border-zinc-800 bg-[#111111] flex flex-col items-center justify-center gap-3 group-hover:border-zinc-600 group-hover:bg-[#161616] transition-colors cursor-pointer text-zinc-500 group-hover:text-zinc-300">
            <div className="p-2 bg-zinc-900 rounded-full">
              <Upload size={20} />
            </div>
            <span className="text-sm font-medium">Click to upload image</span>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
      </div>
    </div>
  );
}

function GenerateButton({ onClick, loading }: { onClick: () => void, loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full mt-2 bg-[#f1f1f1] text-[#111111] font-bold py-3.5 rounded-lg hover:bg-white active:scale-[0.99] transition-all disabled:opacity-50 disabled:active:scale-100 shadow-sm"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-[#111111]/30 border-t-[#111111] rounded-full animate-spin" />
          Processing...
        </span>
      ) : (
        'Generate Art'
      )}
    </button>
  );
}

function ResultPreview({ imageBase64 }: { imageBase64: string | null }) {
  const [downloadName, setDownloadName] = useState('generated.png');
  
  useEffect(() => {
    if (imageBase64) {
      setDownloadName(`generated-${Date.now()}.png`);
    }
  }, [imageBase64]);

  if (!imageBase64) return null;
  return (
    <div className="mt-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#f1f1f1]">Result</h3>
        <a 
          href={imageBase64} 
          download={downloadName}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-zinc-800 text-[#f1f1f1] text-sm font-medium rounded-lg border border-zinc-800 transition-colors"
        >
          <Download size={16} />
          Save Image
        </a>
      </div>
      <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#0a0a0a]">
        <img src={imageBase64} alt="Generated" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tiktok' | 'igstory' | 'whatsapp' | 'kompas'>('tiktok');
  
  // States for TikTok
  const [ttUser, setTtUser] = useState('');
  const [ttText, setTtText] = useState('');
  const [ttAvatar, setTtAvatar] = useState('');

  // States for IG Story
  const [igName, setIgName] = useState('');
  const [igUser, setIgUser] = useState('');
  const [igPhoto, setIgPhoto] = useState('');
  const [igPP, setIgPP] = useState('');

  // States for WhatsApp
  const [waText, setWaText] = useState('');
  const [waTime, setWaTime] = useState('');
  const [waImg, setWaImg] = useState('');

  // States for Kompas
  const [kpText, setKpText] = useState('');
  const [kpPhoto, setKpPhoto] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Show promo modal on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPromoModalOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'tiktok', label: 'TikTok' },
    { id: 'igstory', label: 'IG Story' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'kompas', label: 'Kompas' },
  ];

  const handleGenerate = async (endpoint: string, payload: any) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`/api/generate/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate image');
      setResult(data.image);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans selection:bg-zinc-800 flex flex-col items-center pt-12 pb-24 px-4 sm:px-6">
      <div className="w-full max-w-[540px] flex flex-col gap-8">
        
        <header className="text-center space-y-3">
          <div className="inline-flex items-center justify-center mb-2">
            <img src="https://cdn.phototourl.com/free/2026-07-02-94771b6e-00eb-4b39-acb5-a978c83d9ee3.png" alt="Logo" className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-[#f1f1f1] tracking-tight">Fake Chat Generator</h1>
          <p className="text-zinc-500 text-sm">Create beautiful mockups for social media.</p>
        </header>

        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden">
          
          <div className="flex w-full border-b border-zinc-800/80 p-2 gap-2 bg-[#0a0a0a] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setResult(null); setError(null); }}
                className={`flex-none min-w-[100px] flex-1 py-2.5 text-sm font-semibold text-center whitespace-nowrap px-4 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-[#1a1a1a] text-[#f1f1f1] shadow-sm ring-1 ring-zinc-800' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'tiktok' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <InputField label="Username" placeholder="@username" value={ttUser} onChange={setTtUser} icon={Type} />
                <TextAreaField label="Chat Text" placeholder="Enter the comment..." value={ttText} onChange={setTtText} />
                <ImageUploadField label="Avatar Image" value={ttAvatar} onChange={setTtAvatar} />
                <GenerateButton 
                  loading={loading} 
                  onClick={() => handleGenerate('tiktok', { username: ttUser || 'User', chatText: ttText || 'Hello', avatarSrc: ttAvatar })} 
                />
              </div>
            )}

            {activeTab === 'igstory' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Display Name" placeholder="Name" value={igName} onChange={setIgName} />
                  <InputField label="Username" placeholder="@user" value={igUser} onChange={setIgUser} />
                </div>
                <ImageUploadField label="Profile Picture" value={igPP} onChange={setIgPP} />
                <ImageUploadField label="Background Photo" value={igPhoto} onChange={setIgPhoto} />
                <GenerateButton 
                  loading={loading} 
                  onClick={() => handleGenerate('igstory', { 
                    nama: igName || 'User', 
                    username: igUser || '@user', 
                    ppSrc: igPP || 'https://picsum.photos/200/200', 
                    photoSrc: igPhoto || 'https://picsum.photos/800/1600' 
                  })} 
                />
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <TextAreaField label="Chat Text" placeholder="Type a message... (supports emojis)" value={waText} onChange={setWaText} />
                <InputField label="Time" placeholder="16:34" value={waTime} onChange={setWaTime} icon={Clock} />
                <ImageUploadField label="Attachment (Optional)" value={waImg} onChange={setWaImg} />
                <GenerateButton 
                  loading={loading} 
                  onClick={() => handleGenerate('whatsapp', { text: waText || 'Hello', timeStr: waTime || '12:00', imgUrl: waImg })} 
                />
              </div>
            )}

            {activeTab === 'kompas' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <TextAreaField label="Headline Text" placeholder="Breaking news..." value={kpText} onChange={setKpText} />
                <ImageUploadField label="News Photo" value={kpPhoto} onChange={setKpPhoto} />
                <GenerateButton 
                  loading={loading} 
                  onClick={() => handleGenerate('kompas', { 
                    newsText: kpText || 'Breaking News', 
                    photoSrc: kpPhoto || 'https://picsum.photos/1000/600' 
                  })} 
                />
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-950/40 border border-red-900/50 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <p className="text-red-200 text-sm leading-relaxed">{error}</p>
              </div>
            )}
            
            <ResultPreview imageBase64={result} />
          </div>
        </div>

        <footer className="text-center flex flex-col items-center gap-3 pb-8">
          <button 
            onClick={() => setIsDevModalOpen(true)}
            className="px-4 py-1.5 rounded-full border border-zinc-800 bg-[#0a0a0a] inline-flex items-center gap-2 hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Developer</span>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-[#f1f1f1] text-xs font-bold tracking-wide">SANN404 FORUM GROUP</span>
          </button>
          <p className="text-zinc-600 text-xs font-medium">
            Canvas Arts by <span className="text-zinc-300">Ditzzx & Rin</span>
          </p>
        </footer>

      </div>

      {isDevModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsDevModalOpen(false)}>
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-black border border-zinc-800 rounded-2xl shadow-2xl p-4 sm:p-6 custom-scrollbar" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsDevModalOpen(false)} className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 rounded-full transition-colors backdrop-blur-sm">
              <X size={20} />
            </button>
            <div className="w-full flex items-center justify-center">
              <img 
                src="https://cdn.phototourl.com/free/2026-07-02-aaf5620e-1c34-4430-b449-f6b21b7fe3de.png" 
                alt="Developer Info" 
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {isPromoModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsPromoModalOpen(false)}>
          <div className="relative w-full max-w-sm bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsPromoModalOpen(false)} className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white bg-black/50 rounded-full transition-colors z-10">
              <X size={18} />
            </button>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                <MessageCircle size={28} className="text-[#25D366]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Join Our Developer Channel</h3>
              <p className="text-sm text-zinc-400 mb-6">
                Get the latest updates on new web tools, open-source projects, and exclusive utilities directly from the developer!
              </p>
              <a
                href="https://whatsapp.com/channel/0029Vb6ukqnHQbS4mKP0j80L"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsPromoModalOpen(false)}
                className="w-full bg-[#25D366] text-black font-bold py-3 rounded-lg hover:bg-[#20bd5a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Join WhatsApp Channel
              </a>
              <button 
                onClick={() => setIsPromoModalOpen(false)}
                className="mt-4 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
