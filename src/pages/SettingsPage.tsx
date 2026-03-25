import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Shield, Bell, Moon, Trash2, 
  Save, AlertTriangle, LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { clearAllConversations, conversations } = useChatStore();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    toast.success('Parametrlər yadda saxlanıldı!');
  };

  const handleClearConversations = () => {
    clearAllConversations();
    toast.success('Bütün söhbətlər silindi!');
    setShowDeleteConfirm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-full p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Parametrlər</h1>
          <p className="text-gray-400">Hesab və tətbiq parametrlərinizi idarə edin</p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Profil</h2>
                <p className="text-sm text-gray-500">Şəxsi məlumatlarınız</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ad</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="input-field bg-white/5 cursor-not-allowed"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email dəyişdirilə bilməz</p>
              </div>
            </div>
          </motion.div>

          {/* Plan Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Plan & İstifadə</h2>
                <p className="text-sm text-gray-500">Abunəlik məlumatları</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Cari Plan</p>
                <p className="text-xl font-bold capitalize">{user?.plan}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Token İstifadəsi</p>
                <p className="text-xl font-bold">
                  {user?.tokensUsed?.toLocaleString()} / {user?.tokensLimit?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(((user?.tokensUsed || 0) / (user?.tokensLimit || 1)) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tərcihlər</h2>
                <p className="text-sm text-gray-500">Tətbiq parametrləri</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Bildirişlər</p>
                    <p className="text-sm text-gray-500">Email bildirişləri alın</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications ? 'bg-indigo-500' : 'bg-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Qaranlıq Rejim</p>
                    <p className="text-sm text-gray-500">Həmişə aktiv</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  disabled
                  className="w-12 h-6 rounded-full bg-indigo-500 cursor-not-allowed"
                >
                  <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card border-red-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-400">Təhlükəli Zona</h2>
                <p className="text-sm text-gray-500">Diqqətli olun</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="font-medium">Söhbətləri Sil</p>
                    <p className="text-sm text-gray-500">{conversations.length} söhbət</p>
                  </div>
                </div>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Sil
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearConversations}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Təsdiqlə
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Ləğv et
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Hesabdan Çıxış</span>
              </button>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleSave}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Yadda Saxla
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
