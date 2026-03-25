import { motion } from 'framer-motion';
import { Check, X, Zap, Star, Crown, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { PLANS } from '../types';
import toast from 'react-hot-toast';

export default function PricingPage() {
  const { user, upgradePlan } = useAuthStore();

  const handleUpgrade = (planId: 'free' | 'pro' | 'max') => {
    if (planId === user?.plan) {
      toast.error('Bu plan artıq aktivdir');
      return;
    }
    
    // Simulate payment (in real app, this would redirect to payment)
    toast.success(`${planId.toUpperCase()} planına keçid edildi!`);
    upgradePlan(planId);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return Shield;
      case 'pro': return Zap;
      case 'max': return Crown;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-full p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="gradient-text">Planınızı Seçin</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Ehtiyaclarınıza uyğun plan seçin. İstənilən vaxt yüksəldə bilərsiniz.
            </p>
          </motion.div>
        </div>

        {/* Current Plan Badge */}
        {user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
              <Star className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">
                Cari plan: <span className="font-semibold text-indigo-400">{user.plan.toUpperCase()}</span>
              </span>
            </div>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PLANS.map((plan, index) => {
            const Icon = getPlanIcon(plan.id);
            const isCurrentPlan = user?.plan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.id === 'max' 
                    ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30' 
                    : plan.popular 
                    ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {/* Popular/Premium Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-center py-2 text-sm font-semibold">
                    ⭐ Ən Populyar
                  </div>
                )}
                {plan.id === 'max' && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-center py-2 text-sm font-semibold">
                    👑 Premium
                  </div>
                )}

                <div className={`p-8 ${plan.popular || plan.id === 'max' ? 'pt-14' : ''}`}>
                  {/* Plan Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.id === 'max' 
                        ? 'bg-yellow-500/20' 
                        : plan.id === 'pro' 
                        ? 'bg-indigo-500/20' 
                        : 'bg-white/10'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        plan.id === 'max' 
                          ? 'text-yellow-500' 
                          : plan.id === 'pro' 
                          ? 'text-indigo-400' 
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.tokens.toLocaleString()} token</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/ay</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.id === 'max' 
                              ? 'bg-yellow-500/20' 
                              : 'bg-green-500/20'
                          }`}>
                            <Check className={`w-3 h-3 ${
                              plan.id === 'max' ? 'text-yellow-500' : 'text-green-500'
                            }`} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                            <X className="w-3 h-3 text-gray-600" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      isCurrentPlan
                        ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                        : plan.id === 'max'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:opacity-90'
                        : plan.id === 'pro'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isCurrentPlan ? 'Cari Plan' : plan.price === 0 ? 'Pulsuz Başla' : 'Yüksəlt'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Tez-tez Soruşulan Suallar</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Token nədir?',
                a: 'Token AI ilə söhbət zamanı istifadə olunan vahiddir. Təxminən 4 simvol = 1 token.'
              },
              {
                q: 'Planımı dəyişə bilərəm?',
                a: 'Bəli, istənilən vaxt planınızı yüksəldə və ya aşağı sala bilərsiniz.'
              },
              {
                q: 'Ödəniş metodları hansılardır?',
                a: 'Visa, Mastercard və PayPal qəbul edirik.'
              },
              {
                q: 'Token bitərsə nə olur?',
                a: 'Növbəti aya qədər gözləyə və ya planınızı yüksəldə bilərsiniz.'
              }
            ].map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
