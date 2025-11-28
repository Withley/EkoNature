import { useState } from 'react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setError('');
        alert('Uğurla daxil oldunuz!');
      }
    } catch (err) {
      setError('Serverə qoşulmaq mümkün olmadı');
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#1A2324] rounded-[16px] p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
          <h2 className="text-[#E1E1E1] text-center mb-8">Giriş</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2F3B3C] text-[#E1E1E1] px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A]" required />
            </div>

            <div>
              <label>Şifrə</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2F3B3C] text-[#E1E1E1] px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A]" required />
            </div>

            {error && <div className="text-red-400 text-center">{error}</div>}

            <button type="submit" className="w-full bg-[#00C57A] text-[#101415] py-3 rounded-[12px] hover:bg-[#7DF2C6]">Giriş et</button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-[#E1E1E1] opacity-70">Hesabınız yoxdur? </span>
            <button onClick={() => onNavigate('register')} className="text-[#00C57A] hover:text-[#7DF2C6]">Qeydiyyatdan keçin</button>
          </div>
        </div>
      </div>
    </div>
  );
}
