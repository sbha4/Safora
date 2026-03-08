import { Home, Map, AlertTriangle, User, Trophy } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const tabs = [
  { path: '/', icon: Home, labelKey: 'nav_home' },
  { path: '/map', icon: Map, labelKey: 'nav_map' },
  { path: '/report', icon: AlertTriangle, labelKey: 'nav_report' },
  { path: '/leaderboard', icon: Trophy, labelKey: 'nav_ranks' },
  { path: '/profile', icon: User, labelKey: 'nav_profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (['/sos', '/fake-call'].includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card-strong rounded-none rounded-t-3xl bottom-nav-safe">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 gradient-primary rounded-2xl opacity-20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={22}
                className={active ? 'text-primary relative z-10' : 'text-muted-foreground relative z-10'}
              />
              <span className={`text-[10px] font-medium relative z-10 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
