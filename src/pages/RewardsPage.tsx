import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, Lock, CheckCircle, ShoppingBag, Star, BadgeCheck } from 'lucide-react';
import { getProfile, REWARDS, SAFETY_SHOP } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

type Tab = 'rewards' | 'shop';

export default function RewardsPage() {
  const navigate = useNavigate();
  const profile = getProfile();
  const [redeemed, setRedeemed] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('rewards');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('rewards_shop')}</h1>
      </div>

      <div className="glass-card p-4 mb-4 flex items-center gap-3">
        <Gift size={20} className="text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">{t('your_points')}: {profile.points}</p>
          <p className="text-xs text-muted-foreground">{t('redeem_desc')}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {[
          { key: 'rewards' as Tab, labelKey: 'marketplace', icon: Gift },
          { key: 'shop' as Tab, labelKey: 'safety_shop', icon: ShoppingBag },
        ].map((ti) => (
          <button
            key={ti.key}
            onClick={() => setTab(ti.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === ti.key ? 'gradient-primary text-primary-foreground' : 'glass-card text-muted-foreground'
            }`}
          >
            <ti.icon size={14} />
            {t(ti.labelKey)}
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-3 mb-4 flex items-center gap-3 border-safora-blue/20">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <BadgeCheck size={18} className="text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-foreground">{t('sponsored_safe_ride')}</p>
          <p className="text-[10px] text-muted-foreground">PickMe – {t('verified_night_partner')}</p>
        </div>
        <span className="text-[8px] text-muted-foreground/60 uppercase">{t('ad')}</span>
      </motion.div>

      {tab === 'rewards' ? (
        <div className="space-y-3">
          {REWARDS.map((reward, i) => {
            const canRedeem = profile.points >= reward.points;
            const isRedeemed = redeemed === reward.id;
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="text-3xl">{reward.image}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{reward.name}</p>
                  <p className="text-xs text-muted-foreground">{reward.category} • {reward.points} {t('pts')}</p>
                </div>
                {isRedeemed ? (
                  <CheckCircle size={20} className="text-safora-green" />
                ) : canRedeem ? (
                  <button onClick={() => setRedeemed(reward.id)} className="gradient-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl active:scale-95 transition-transform">
                    {t('redeem')}
                  </button>
                ) : (
                  <Lock size={16} className="text-muted-foreground" />
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {SAFETY_SHOP.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="text-3xl">{product.image}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{product.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-primary">{product.price}</span>
                  <span className="flex items-center gap-0.5 text-[10px] text-safora-yellow">
                    <Star size={10} className="fill-current" /> {product.rating}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{t('partner')}: {product.partner}</p>
              </div>
              <button className="bg-secondary text-foreground text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-transform">
                {t('view')}
              </button>
            </motion.div>
          ))}

          <div className="glass-card p-3 flex items-center gap-3 border-safora-blue/20">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BadgeCheck size={14} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-foreground">{t('verified_night_partner')}</p>
              <p className="text-[9px] text-muted-foreground">SafeGuard LK – {t('safety_shop')}</p>
            </div>
            <span className="text-[8px] text-muted-foreground/60 uppercase">{t('sponsored')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
