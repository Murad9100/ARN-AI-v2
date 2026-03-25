import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, CreditCard, Settings, LogOut, 
  Menu, X, Zap, User, ChevronDown 
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/chat', icon: MessageSquare, label: 'AI Chat' },
    { path: '/pricing', icon: CreditCard, label: 'Planlar' },
    { path: '/settings', icon: Settings, label: 'Parametrlər' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tokenPercentage = user ? (user.tokensUsed / user.tokensLimit) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed lg:relative z-40 w-[280px] h-screen bg-[#12121a] border-r border-white/10 flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <Link to="/chat" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center animate-glow">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">ARN AI</h1>
                  <p className="text-xs text-gray-500">Pentest Platform</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Token Usage */}
            <div className="p-4 border-t border-white/10">
              <div className="card !p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Token İstifadəsi</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(tokenPercentage, 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  {user?.tokensUsed?.toLocaleString()} / {user?.tokensLimit?.toLocaleString()} token
                </p>
                {user?.plan === 'free' && (
                  <Link 
                    to="/pricing" 
                    className="mt-3 block text-center text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Yüksəlt ⚡
                  </Link>
                )}
              </div>
            </div>

            {/* User Menu */}
            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.plan} Plan</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a25] border border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Çıxış</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-[#12121a]/80 backdrop-blur-lg border-b border-white/10 flex items-center px-4 lg:px-6 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              user?.plan === 'max' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' :
              user?.plan === 'pro' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
              'bg-white/10 text-gray-400'
            }`}>
              {user?.plan?.toUpperCase()}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
