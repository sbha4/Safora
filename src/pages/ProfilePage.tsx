import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, FileText, CheckCircle, Crown, Gift } from 'lucide-react';
import { getProfile, getUserLevel, LEVELS, getLeaderboard } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const profile = getProfile();
  const level = getUserLevel(profile.points);
  const leaderboard = getLeaderboard();
  const rank = leaderboard.findIndex((e) => e.name === 'You') + 1;
  const { t } = useLanguage();

  const nextLevel = LEVELS.find((l) => l.minPoints > profile.points);
  const progress = nextLevel
    ? ((profile.points - (LEVELS[LEVELS.indexOf(nextLevel) - 1]?.minPoints || 0)) / (nextLevel.minPoints - (LEVELS[LEVELS.indexOf(nextLevel) - 1]?.minPoints || 0))) * 100
    : 100;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('profile')}</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-strong p-6 mb-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center text-4xl mb-3">
          {level.icon}
        </div>
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-display font-bold text-foreground">{profile.name}</h2>
          {profile.isPremium && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-600 text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">
              <Crown size={10} /> PLUS
            </span>
          )}
        </div>
        <p className="text-primary text-sm font-semibold mt-1">{level.name}</p>
        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{profile.points} {t('pts')}</span>
              <span>{nextLevel.minPoints} {t('pts')} → {nextLevel.name}</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} className="h-full gradient-primary rounded-full" />
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: t('total_points'), value: profile.points, icon: Award, color: 'text-primary' },
          { label: t('rank'), value: `#${rank}`, icon: Crown, color: 'text-safora-yellow' },
          { label: t('reports'), value: profile.reportsSubmitted, icon: FileText, color: 'text-safora-green' },
          { label: t('verifications'), value: profile.verificationsCount, icon: CheckCircle, color: 'text-safora-purple-light' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="glass-card p-4">
            <stat.icon size={18} className={stat.color + ' mb-2'} />
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-4 mb-4">
        <p className="text-sm font-semibold text-foreground mb-3">{t('level_journey')}</p>
        <div className="space-y-3">
          {LEVELS.map((l) => {
            const unlocked = profile.points >= l.minPoints;
            return (
              <div key={l.name} className={`flex items-center gap-3 ${unlocked ? '' : 'opacity-40'}`}>
                <span className="text-xl">{l.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{l.name}</p>
                  <p className="text-[10px] text-muted-foreground">{l.minPoints} {t('points')}</p>
                </div>
                {unlocked && <CheckCircle size={16} className="text-safora-green" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <button onClick={() => navigate('/rewards')} className="w-full glass-card p-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Gift size={18} className="text-primary" />
          <span className="text-sm font-semibold text-primary">{t('view_rewards')}</span>
        </button>
        {!profile.isPremium && (
          <button onClick={() => navigate('/subscription')} className="w-full gradient-primary p-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <Crown size={18} className="text-primary-foreground" />
            <span className="text-sm font-semibold text-primary-foreground">{t('upgrade_plus')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
