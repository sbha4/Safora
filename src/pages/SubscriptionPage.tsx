import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Crown, Shield, Zap, Moon, Route, Bell, History, X, Sparkles } from 'lucide-react';
import { getProfile, setPremium } from '@/lib/store';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const profile = getProfile();
  const [selected, setSelected] = useState(1);
  const [subscribing, setSubscribing] = useState(false);
  const { t } = useLanguage();

  const features = [
    { name: t('feat_sos'), free: true, plus: true, icon: Bell },
    { name: t('feat_contacts'), free: true, plus: true, icon: Shield },
    { name: t('feat_map'), free: true, plus: true, icon: Route },
    { name: t('feat_reports'), free: true, plus: true, icon: Zap },
    { name: t('feat_fake_call'), free: true, plus: true, icon: Shield },
    { name: t('feat_ai_route'), free: false, plus: true, icon: Sparkles },
    { name: t('feat_realtime'), free: false, plus: true, icon: Bell },
    { name: t('feat_night'), free: false, plus: true, icon: Moon },
    { name: t('feat_history'), free: false, plus: true, icon: History },
    { name: t('feat_priority'), free: false, plus: true, icon: Zap },
  ];

  const plans = [
    { name: t('free_plan'), price: '$0', period: t('forever'), description: t('essential_safety'), current: true },
    { name: t('plus_monthly'), price: t('plus_monthly_price'), period: t('plus_monthly_period'), description: t('plus_monthly_desc'), highlighted: true, badge: t('most_popular') },
    { name: t('plus_annual'), price: t('plus_annual_price'), period: t('plus_annual_period'), description: t('plus_annual_desc'), badge: t('best_value') },
  ];

  const handleSubscribe = () => {
    if (selected === 0) return;
    setSubscribing(true);
    setTimeout(() => {
      setPremium(true);
      setSubscribing(false);
      toast.success('Welcome to Safora Plus! 🎉');
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('go_premium')}</h1>
      </div>

      <div className="text-center mb-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-3">
          <Crown size={28} className="text-primary-foreground" />
        </motion.div>
        <h2 className="text-lg font-display font-bold text-foreground">{t('safora_plus')}</h2>
        <p className="text-sm text-muted-foreground">{t('advanced_safety')}</p>
      </div>

      <div className="space-y-3 mb-6">
        {plans.map((plan, i) => (
          <motion.button
            key={plan.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelected(i)}
            className={`w-full text-left glass-card p-4 transition-all ${
              selected === i ? 'border-primary/60 ring-2 ring-primary/30' : ''
            } ${plan.highlighted ? 'relative overflow-hidden' : ''}`}
          >
            {plan.badge && (
              <span className="inline-block gradient-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full mb-2">
                {plan.badge}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-foreground">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-sm font-semibold text-foreground mt-1">{plan.name}</p>
            <p className="text-xs text-muted-foreground">{plan.description}</p>
            <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === i ? 'border-primary bg-primary' : 'border-muted-foreground'
            }`}>
              {selected === i && <Check size={12} className="text-primary-foreground" />}
            </div>
          </motion.button>
        ))}
      </div>

      {selected > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubscribe}
          disabled={subscribing}
          className="w-full gradient-primary text-primary-foreground font-bold py-4 rounded-2xl text-sm active:scale-[0.98] transition-transform disabled:opacity-60 mb-6 flex items-center justify-center gap-2"
        >
          {subscribing ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
          ) : (
            <>
              <Crown size={16} /> {t('subscribe_to')} {plans[selected].name}
            </>
          )}
        </motion.button>
      )}

      <div className="glass-card p-4">
        <p className="text-sm font-semibold text-foreground mb-4">{t('feature_comparison')}</p>
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span className="flex-1">{t('feature')}</span>
          <span className="w-12 text-center">{t('free')}</span>
          <span className="w-12 text-center text-primary font-semibold">{t('plus')}</span>
        </div>
        <div className="space-y-2.5">
          {features.map((f) => (
            <div key={f.name} className="flex items-center gap-2 text-xs">
              <f.icon size={12} className="text-muted-foreground flex-shrink-0" />
              <span className="flex-1 text-foreground">{f.name}</span>
              <span className="w-12 text-center">
                {f.free ? <Check size={14} className="text-safora-green mx-auto" /> : <X size={14} className="text-muted-foreground/40 mx-auto" />}
              </span>
              <span className="w-12 text-center">
                {f.plus ? <Check size={14} className="text-primary mx-auto" /> : <X size={14} className="text-muted-foreground/40 mx-auto" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] text-muted-foreground mt-4">
        {t('safety_note')}
      </p>
    </div>
  );
}
