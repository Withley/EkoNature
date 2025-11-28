import { useState } from 'react';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Şifrələr uyğun gəlmir');
      return;
    }

    if (password.length < 6) {
      setError('Şifrə ən azı 6 simvol olmalıdır');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setSuccess('Uğurla qeydiyyatdan keçdi!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError('Serverə qoşulmaq mümkün olmadı');
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#1A2324] rounded-[16px] p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
          <h2 className="text-[#E1E1E1] text-center mb-8">Qeydiyyat</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[#E1E1E1] mb-2">Ad Soyad</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#2F3B3C] text-[#E1E1E1] px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A]" required />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#E1E1E1] mb-2">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2F3B3C] text-[#E1E1E1] px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A]" required />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#E1E1E1] mb-2">Şifrə</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2F3B3C] text-[#E1E1E1] px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A]" required />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[#E1E1E1] mb-2">Şifrəni Təsdiq Et</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#2F3B3C] text-[#E1E1E1] px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A]" required />
            </div>

            {error && <div className="text-red-400 text-center">{error}</div>}
            {success && <div className="text-green-400 text-center">{success}</div>}

            <button type="submit" className="w-full bg-[#00C57A] text-[#101415] py-3 rounded-[12px] hover:bg-[#7DF2C6]">Qeydiyyatdan Keç</button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-[#E1E1E1] opacity-70">Hesabınız var? </span>
            <button onClick={() => onNavigate('login')} className="text-[#00C57A] hover:text-[#7DF2C6]">Giriş edin</button>
          </div>
        </div>
      </div>
    </div>
  );
}
