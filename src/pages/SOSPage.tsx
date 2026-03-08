import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, CheckCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { addSOSEvent, getContacts } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

type Phase = 'confirm' | 'locating' | 'alerting' | 'done';

export default function SOSPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('confirm');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const contacts = getContacts();
  const { t } = useLanguage();

  const triggerSOS = () => {
    setPhase('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        addSOSEvent(latitude, longitude);
        setPhase('alerting');
        setTimeout(() => setPhase('done'), 2000);
      },
      () => {
        setCoords({ lat: 6.8390, lng: 79.8660 });
        addSOSEvent(6.8390, 79.8660);
        setPhase('alerting');
        setTimeout(() => setPhase('done'), 2000);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        {phase !== 'confirm' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 20, opacity: 0.1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-destructive"
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <button onClick={() => navigate('/')} className="absolute -top-16 left-0 glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>

        <AnimatePresence mode="wait">
          {phase === 'confirm' && (
            <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <AlertTriangle size={48} className="text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">{t('emergency_sos')}</h1>
              <p className="text-muted-foreground text-sm mb-8">{t('sos_description')}</p>
              <button
                onClick={triggerSOS}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 mx-auto flex items-center justify-center sos-glow active:scale-95 transition-transform"
              >
                <span className="text-3xl font-display font-black text-primary-foreground">{t('sos')}</span>
              </button>
              <p className="text-xs text-muted-foreground mt-6">{t('sos_press')}</p>
            </motion.div>
          )}

          {phase === 'locating' && (
            <motion.div key="locating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-16 h-16 border-4 border-destructive border-t-transparent rounded-full mx-auto mb-6" />
              <h2 className="text-xl font-display font-bold text-foreground mb-2">{t('sos_locating')}</h2>
              <p className="text-sm text-muted-foreground">{t('sos_gps')}</p>
            </motion.div>
          )}

          {phase === 'alerting' && (
            <motion.div key="alerting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <Phone size={48} className="text-destructive mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-display font-bold text-foreground mb-2">{t('sos_sending')}</h2>
              <p className="text-sm text-muted-foreground">
                {contacts.length ? t('sos_notifying', { count: contacts.length }) : t('sos_notifying_your')}
              </p>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                <CheckCircle size={64} className="text-safora-green mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">{t('sos_sent')}</h2>
              <p className="text-sm text-muted-foreground mb-6">{t('sos_sent_desc')}</p>
              {coords && (
                <div className="glass-card p-4 mb-6 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{t('sos_location_shared')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
                </div>
              )}
              <button onClick={() => navigate('/')} className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform">
                {t('return_home')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
