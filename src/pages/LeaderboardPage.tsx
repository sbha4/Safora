import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Crown } from 'lucide-react';
import { getLeaderboard, getUserLevel } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

const podiumColors = ['from-yellow-400 to-amber-500', 'from-gray-300 to-gray-400', 'from-amber-600 to-amber-700'];

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const leaderboard = getLeaderboard();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('leaderboard')}</h1>
      </div>

      <div className="flex items-end justify-center gap-3 mb-8 h-44">
        {[1, 0, 2].map((idx) => {
          const user = leaderboard[idx];
          if (!user) return null;
          const isFirst = idx === 0;
          const level = getUserLevel(user.points);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col items-center ${isFirst ? 'order-2' : idx === 1 ? 'order-1' : 'order-3'}`}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${podiumColors[idx]} flex items-center justify-center text-lg font-bold mb-1 ${isFirst ? 'w-16 h-16' : ''}`}>
                {level.icon}
              </div>
              <div className="flex items-center gap-1">
                <p className={`text-xs font-semibold text-foreground ${user.name === 'You' ? 'text-primary' : ''}`}>{user.name}</p>
                {user.isPremium && <Crown size={10} className="text-safora-yellow" />}
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">{user.points} {t('pts')}</p>
              <div className={`w-20 bg-gradient-to-t ${podiumColors[idx]} rounded-t-xl flex items-center justify-center text-primary-foreground font-bold`}
                style={{ height: isFirst ? 80 : idx === 1 ? 60 : 45 }}
              >
                #{idx + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-2">
        {leaderboard.map((user, i) => {
          const level = getUserLevel(user.points);
          const isYou = user.name === 'You';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.03 }}
              className={`glass-card p-3 flex items-center gap-3 ${isYou ? 'border-primary/50' : ''}`}
            >
              <span className="w-7 text-center text-sm font-bold text-muted-foreground">#{i + 1}</span>
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm">
                {level.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className={`text-sm font-semibold ${isYou ? 'text-primary' : 'text-foreground'}`}>{user.name}</p>
                  {user.isPremium && (
                    <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-amber-400 to-amber-600 text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      <Crown size={8} /> PLUS
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">{user.reports} {t('reports')}</p>
              </div>
              <span className="text-sm font-bold text-foreground">{user.points}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
