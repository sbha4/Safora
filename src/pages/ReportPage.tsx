import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Send, CheckCircle, Shield, AlertTriangle, XCircle } from 'lucide-react';
import { addReport } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ReportPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<'safe' | 'moderate' | 'unsafe' | null>(null);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const { t } = useLanguage();

  const ratings = [
    { value: 'safe' as const, labelKey: 'safe', icon: Shield, color: 'text-safora-green border-safora-green bg-safora-green/10' },
    { value: 'moderate' as const, labelKey: 'moderate', icon: AlertTriangle, color: 'text-safora-yellow border-safora-yellow bg-safora-yellow/10' },
    { value: 'unsafe' as const, labelKey: 'unsafe', icon: XCircle, color: 'text-safora-red border-safora-red bg-safora-red/10' },
  ];

  const getLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocating(false); },
      () => { setCoords({ lat: 6.8390, lng: 79.8660 }); setLocating(false); },
      { timeout: 5000 }
    );
  };

  const handleSubmit = () => {
    if (!rating || !coords) return;
    addReport({ lat: coords.lat, lng: coords.lng, rating, description: description.trim() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <CheckCircle size={64} className="text-safora-green mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">{t('report_submitted')}</h2>
          <p className="text-muted-foreground text-sm mb-2">{t('report_thanks')}</p>
          <p className="text-primary text-sm font-semibold mb-6">{t('points_earned')}</p>
          <button onClick={() => navigate('/')} className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl">
            {t('back_home')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('report_area')}</h1>
      </div>

      <div className="glass-card p-4 mb-4">
        <p className="text-sm font-semibold text-foreground mb-3">{t('location')}</p>
        {coords ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="text-primary" />
            <span>{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
          </div>
        ) : (
          <button onClick={getLocation} disabled={locating} className="w-full bg-secondary/50 text-foreground py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <MapPin size={16} className="text-primary" />
            {locating ? t('getting_location') : t('use_current_location')}
          </button>
        )}
      </div>

      <div className="glass-card p-4 mb-4">
        <p className="text-sm font-semibold text-foreground mb-3">{t('safety_rating')}</p>
        <div className="grid grid-cols-3 gap-2">
          {ratings.map((r) => (
            <button
              key={r.value}
              onClick={() => setRating(r.value)}
              className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all active:scale-[0.98] ${
                rating === r.value ? r.color : 'border-border bg-secondary/30 text-muted-foreground'
              }`}
            >
              <r.icon size={20} />
              <span className="text-xs font-medium">{t(r.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-4 mb-6">
        <p className="text-sm font-semibold text-foreground mb-3">{t('description_optional')}</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('description_placeholder')}
          rows={3}
          maxLength={500}
          className="w-full bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!rating || !coords}
        className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-transform"
      >
        <Send size={16} />
        {t('submit_report')}
      </button>
    </div>
  );
}
