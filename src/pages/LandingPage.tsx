import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, Zap, Lock, Code, Terminal, Globe, 
  ChevronRight, Check, Star, ArrowRight,
  Cpu, Eye, Database
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    { icon: Terminal, title: 'Pentest Assistantı', desc: 'Real-time pentest məsləhətləri və tool təlimatları' },
    { icon: Code, title: 'Kod Analizi', desc: 'Security vulnerabilities tapın və düzəldin' },
    { icon: Lock, title: 'OWASP Expert', desc: 'OWASP Top 10 üzrə dərin biliklər' },
    { icon: Globe, title: 'Network Security', desc: 'Şəbəkə təhlükəsizliyi və skan metodları' },
    { icon: Database, title: 'Vulnerability DB', desc: 'CVE və exploit verilənlər bazası' },
    { icon: Eye, title: 'Reconnaissance', desc: 'OSINT və məlumat toplama texnikaları' },
  ];

  const testimonials = [
    { name: 'Əli Həsənov', role: 'Security Engineer', text: 'ARN AI pentest işlərimi 3x sürətləndirdi.' },
    { name: 'Leyla Əliyeva', role: 'CTF Player', text: 'CTF yarışlarında əvəzsiz köməkçi!' },
    { name: 'Rəşad Məmmədov', role: 'DevSecOps', text: 'Kod təhlükəsizliyi üçün ideal tool.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center animate-glow">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">ARN AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors">Xüsusiyyətlər</a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Qiymətlər</a>
          <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Rəylər</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Giriş</Link>
          <Link to="/register" className="btn-primary flex items-center gap-2">
            Başla <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-8">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">AI ilə gücləndirilmiş pentest platforması</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Kibertəhlükəsizlik</span>
              <br />
              <span className="text-white">AI Assistantınız</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Professional pentest əməliyyatları, vulnerability assessment və 
              security analysis üçün süni intellekt köməkçiniz.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg flex items-center gap-2 w-full sm:w-auto justify-center">
                <Cpu className="w-5 h-5" />
                Pulsuz Başla
              </Link>
              <a href="#features" className="btn-secondary text-lg flex items-center gap-2 w-full sm:w-auto justify-center">
                Daha Ətraflı
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Floating Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-1">
              <div className="bg-[#12121a] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-gray-500 font-mono">arn-ai-terminal</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="flex gap-2 text-gray-400 mb-2">
                    <span className="text-indigo-400">user@arn:</span>
                    <span className="text-green-400">~$</span>
                    <span className="typing-cursor">nmap scan nədir?</span>
                  </div>
                  <div className="text-gray-300 mt-4 pl-4 border-l-2 border-indigo-500">
                    <p className="text-indigo-300 font-semibold mb-2">🔍 Nmap - Network Mapper</p>
                    <p className="text-gray-400">Nmap şəbəkə kəşfiyyatı və təhlükəsizlik auditi üçün istifadə olunan açıq mənbəli vasitədir...</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Güclü Xüsusiyyətlər</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Professional pentest əməliyyatları üçün lazım olan hər şey bir platformada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Sadə Qiymətləndirmə</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Ehtiyaclarınıza uyğun plan seçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-4">
                $0<span className="text-lg text-gray-500 font-normal">/ay</span>
              </div>
              <ul className="space-y-3 mb-6">
                {['Gündəlik 1000 token', 'Əsas AI modeli', 'Pentest əsasları'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary w-full block text-center">
                Başla
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card border-indigo-500/50 relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-xs font-semibold">
                Populyar
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">
                $29<span className="text-lg text-gray-500 font-normal">/ay</span>
              </div>
              <ul className="space-y-3 mb-6">
                {['Aylıq 50,000 token', 'Bütün AI modelləri', 'Advanced Pentest', 'Kod analizi', 'Vulnerability scanner'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary w-full block text-center">
                Pro Ol
              </Link>
            </motion.div>

            {/* Max Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Max <Star className="w-4 h-4 text-yellow-500" />
              </h3>
              <div className="text-3xl font-bold mb-4">
                $99<span className="text-lg text-gray-500 font-normal">/ay</span>
              </div>
              <ul className="space-y-3 mb-6">
                {['Limitsiz token', 'Bütün modellər + Beta', 'Enterprise Pentest', 'Full API access', '24/7 Priority dəstək'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-4 h-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="w-full block text-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
                Max Ol
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">İstifadəçi Rəyləri</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card !p-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hazırsınız?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              İndi qeydiyyatdan keçin və AI ilə gücləndirilmiş pentest dünyasına qədəm qoyun
            </p>
            <Link to="/register" className="btn-primary text-lg inline-flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Pulsuz Başla
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-indigo-500" />
            <span className="font-semibold gradient-text">ARN AI</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 ARN AI. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
}
