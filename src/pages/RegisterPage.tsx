import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Check, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [error, setError] = useState('');
  
  const { register, verifyEmail, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Bütün sahələri doldurun');
      return;
    }

    if (password.length < 6) {
      setError('Şifrə minimum 6 simvol olmalıdır');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifrələr uyğun gəlmir');
      return;
    }

    try {
      const code = await register(email, password, name);
      setSentCode(code);
      setStep('verify');
      toast.success(`Təsdiq kodu: ${code}`, { duration: 10000, icon: '📧' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verificationCode.length !== 6) {
      setError('6 rəqəmli kod daxil edin');
      return;
    }

    const success = await verifyEmail(verificationCode);
    
    if (success) {
      toast.success('Email təsdiqləndi!');
      navigate('/chat');
    } else {
      setError('Kod yanlışdır');
    }
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid flex items-center justify-center px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center animate-glow">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold gradient-text">ARN AI</span>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 'register' ? 'text-indigo-400' : 'text-green-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'register' ? 'bg-indigo-500' : 'bg-green-500'}`}>
              {step === 'verify' ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="text-sm hidden sm:inline">Qeydiyyat</span>
          </div>
          <div className="w-12 h-px bg-white/20" />
          <div className={`flex items-center gap-2 ${step === 'verify' ? 'text-indigo-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'verify' ? 'bg-indigo-500' : 'bg-white/10'}`}>
              2
            </div>
            <span className="text-sm hidden sm:inline">Təsdiq</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {step === 'register' ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h1 className="text-2xl font-bold text-center mb-2">Qeydiyyat</h1>
                <p className="text-gray-400 text-center mb-8">Yeni hesab yaradın</p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 text-red-400"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adınız"
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Şifrə</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="input-field pl-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Password Strength */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                strength >= level
                                  ? strength <= 1 ? 'bg-red-500'
                                  : strength === 2 ? 'bg-yellow-500'
                                  : strength === 3 ? 'bg-blue-500'
                                  : 'bg-green-500'
                                  : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          {strength <= 1 && 'Zəif'}
                          {strength === 2 && 'Orta'}
                          {strength === 3 && 'Güclü'}
                          {strength === 4 && 'Çox güclü'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Şifrəni Təsdiqlə</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="input-field pl-12"
                      />
                      {confirmPassword && password === confirmPassword && (
                        <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Davam Et
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Email Təsdiqləmə</h1>
                  <p className="text-gray-400">
                    <span className="text-indigo-400">{email}</span> ünvanına göndərilən 6 rəqəmli kodu daxil edin
                  </p>
                </div>

                {/* Show verification code for demo */}
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl mb-6">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Demo Təsdiq Kodu</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-center text-green-300">{sentCode}</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 text-red-400"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleVerify} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-center">Təsdiq Kodu</label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="input-field text-center text-2xl font-mono tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || verificationCode.length !== 6}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Təsdiqlə
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('register')}
                    className="w-full text-center text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    ← Geri qayıt
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 'register' && (
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Artıq hesabınız var?{' '}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Daxil olun
                </Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
