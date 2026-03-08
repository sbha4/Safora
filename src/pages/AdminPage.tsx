import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, FileText, AlertTriangle, Bell, TrendingUp, MapPin, Building2, Crown } from 'lucide-react';
import { getReports, getSOSEvents, getLeaderboard } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

export default function AdminPage() {
  const navigate = useNavigate();
  const reports = getReports();
  const sosEvents = getSOSEvents();
  const leaderboard = getLeaderboard();
  const { t } = useLanguage();

  const stats = [
    { label: t('total_users'), value: leaderboard.length, icon: Users, color: 'text-primary' },
    { label: t('safety_reports'), value: reports.length + 47, icon: FileText, color: 'text-safora-green' },
    { label: t('sos_alerts'), value: sosEvents.length + 12, icon: Bell, color: 'text-safora-red' },
    { label: t('high_risk_areas'), value: reports.filter(r => r.rating === 'unsafe').length + 6, icon: AlertTriangle, color: 'text-safora-yellow' },
  ];

  const engagementData = [
    { label: 'Mon', value: 65 }, { label: 'Tue', value: 82 }, { label: 'Wed', value: 71 },
    { label: 'Thu', value: 93 }, { label: 'Fri', value: 88 }, { label: 'Sat', value: 56 }, { label: 'Sun', value: 42 },
  ];

  const trendData = [
    { label: 'Jan', reports: 34, sos: 5 }, { label: 'Feb', reports: 42, sos: 3 }, { label: 'Mar', reports: 58, sos: 7 },
    { label: 'Apr', reports: 51, sos: 4 }, { label: 'May', reports: 67, sos: 6 }, { label: 'Jun', reports: 72, sos: 8 },
  ];

  const maxValue = Math.max(...engagementData.map(d => d.value));
  const maxTrend = Math.max(...trendData.map(d => d.reports));

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('admin_dashboard')}</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 mb-6 border-primary/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <Building2 size={18} className="text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground">{t('city_safety_insights')}</p>
          <p className="text-[10px] text-muted-foreground">{t('city_safety_desc')}</p>
        </div>
        <span className="text-[9px] text-primary font-bold">B2B</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
            <stat.icon size={18} className={stat.color + ' mb-2'} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-primary" />
          <p className="text-sm font-semibold text-foreground">{t('weekly_engagement')}</p>
        </div>
        <div className="flex items-end gap-2 h-32">
          {engagementData.map((d, i) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
              <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / maxValue) * 100}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }} className="w-full gradient-primary rounded-t-md min-h-[4px]" />
              <span className="text-[9px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-safora-green" />
          <p className="text-sm font-semibold text-foreground">{t('monthly_trends')}</p>
        </div>
        <div className="flex items-end gap-2 h-28">
          {trendData.map((d, i) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 justify-center" style={{ height: '100%', alignItems: 'flex-end' }}>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.reports / maxTrend) * 100}%` }} transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }} className="w-1/2 bg-primary/70 rounded-t-sm min-h-[2px]" />
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.sos / maxTrend) * 100}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }} className="w-1/2 bg-safora-red/70 rounded-t-sm min-h-[2px]" />
              </div>
              <span className="text-[9px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-primary/70" /> {t('reports')}</span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-safora-red/70" /> {t('sos_alerts')}</span>
        </div>
      </div>

      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-safora-red" />
          <p className="text-sm font-semibold text-foreground">{t('risk_heatmap')}</p>
        </div>
        <div className="relative w-full h-40 rounded-xl bg-secondary/30 overflow-hidden">
          <div className="absolute w-16 h-16 rounded-full bg-safora-red/30 blur-xl" style={{ top: '20%', left: '30%' }} />
          <div className="absolute w-20 h-20 rounded-full bg-safora-red/20 blur-xl" style={{ top: '50%', left: '60%' }} />
          <div className="absolute w-12 h-12 rounded-full bg-safora-yellow/30 blur-xl" style={{ top: '60%', left: '20%' }} />
          <div className="absolute w-14 h-14 rounded-full bg-safora-yellow/20 blur-xl" style={{ top: '30%', left: '70%' }} />
          <div className="absolute w-10 h-10 rounded-full bg-safora-green/30 blur-xl" style={{ top: '70%', left: '45%' }} />
          <p className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">{t('community_reported')}</p>
        </div>
      </div>

      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Crown size={16} className="text-safora-yellow" />
          <p className="text-sm font-semibold text-foreground">{t('premium_members')}</p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-foreground">23%</p>
            <p className="text-[10px] text-muted-foreground">{t('conversion_rate')}</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">142</p>
            <p className="text-[10px] text-muted-foreground">{t('plus_members')}</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">$4.2k</p>
            <p className="text-[10px] text-muted-foreground">MRR</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm font-semibold text-foreground mb-3">{t('recent_sos')}</p>
        {sosEvents.length === 0 ? (
          <p className="text-xs text-muted-foreground">{t('no_sos')}</p>
        ) : (
          <div className="space-y-2">
            {sosEvents.slice(-3).reverse().map((e) => (
              <div key={e.id} className="flex items-center gap-3 p-2 rounded-lg bg-destructive/10">
                <Bell size={14} className="text-destructive" />
                <div className="flex-1">
                  <p className="text-xs text-foreground">{e.lat.toFixed(4)}, {e.lng.toFixed(4)}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(e.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
