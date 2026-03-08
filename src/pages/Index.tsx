import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, AlertTriangle, Phone, Users, Navigation, Crown } from 'lucide-react';
import { getProfile, getUserLevel } from '@/lib/store';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageContext';

const quickActions = [
  { labelKey: 'safe_route', icon: Navigation, path: '/map', color: 'from-emerald-500 to-emerald-700' },
  { labelKey: 'report_area', icon: AlertTriangle, path: '/report', color: 'from-amber-500 to-orange-600' },
  { labelKey: 'fake_call', icon: Phone, path: '/fake-call', color: 'from-blue-500 to-blue-700' },
  { labelKey: 'contacts', icon: Users, path: '/contacts', color: 'from-purple-500 to-purple-700' },
];

export default function Index() {
  const navigate = useNavigate();
  const profile = getProfile();
  const level = getUserLevel(profile.points);
  const safetyScore = 78;
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold gradient-text">{t('app_name')}</h1>
          <p className="text-muted-foreground text-sm">{t('app_tagline')}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button onClick={() => navigate('/profile')} className="glass-card p-2.5 rounded-xl">
            <span className="text-lg">{level.icon}</span>
          </button>
        </div>
      </motion.div>

      {/* Premium Banner */}
      {!profile.isPremium && (
        <motion.button
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/subscription')}
          className="w-full glass-card p-3 mb-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <Crown size={16} className="text-primary-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-semibold text-foreground">{t('upgrade_plus')}</p>
            <p className="text-[10px] text-muted-foreground">{t('upgrade_plus_desc')}</p>
          </div>
          <span className="text-[10px] font-bold text-primary">{t('price_monthly')} →</span>
        </motion.button>
      )}

      {/* Safety Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="glass-card p-4 mb-6 flex items-center gap-4"
      >
        <div className="relative w-14 h-14">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
            <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--safora-green))" strokeWidth="3" strokeDasharray={`${safetyScore}, 100`} strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{safetyScore}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{t('area_safety_score')}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={12} />{t('current_location_good')}</p>
        </div>
        <Shield size={20} className="text-safora-green" />
      </motion.div>

      {/* SOS Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <button
          onClick={() => navigate('/sos')}
          className="relative w-36 h-36 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center sos-glow sos-pulse active:scale-95 transition-transform"
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
            <span className="text-3xl font-display font-black tracking-wider text-primary-foreground">{t('sos')}</span>
          </div>
        </button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        {quickActions.map((action, i) => (
          <motion.button
            key={action.labelKey}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            onClick={() => navigate(action.path)}
            className="glass-card p-4 flex flex-col items-start gap-3 active:scale-[0.98] transition-transform"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <action.icon size={20} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">{t(action.labelKey)}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Stats Row */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-foreground">{profile.points}</p>
            <p className="text-[10px] text-muted-foreground">{t('points')}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-foreground">{profile.reportsSubmitted}</p>
            <p className="text-[10px] text-muted-foreground">{t('reports')}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-foreground">{level.icon} {level.name}</p>
            <p className="text-[10px] text-muted-foreground">{t('level')}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
