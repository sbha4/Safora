import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, User, Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

type Phase = 'setup' | 'ringing' | 'call';

function createRingtone(): { start: () => void; stop: () => void } {
  let ctx: AudioContext | null = null;
  let osc: OscillatorNode | null = null;
  let gain: GainNode | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;

  return {
    start() {
      try {
        ctx = new AudioContext();
        gain = ctx.createGain();
        gain.connect(ctx.destination);
        gain.gain.value = 0;
        osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;
        osc.connect(gain);
        osc.start();
        let ringOn = true;
        interval = setInterval(() => {
          if (!gain || !ctx) return;
          ringOn = !ringOn;
          gain.gain.setTargetAtTime(ringOn ? 0.12 : 0, ctx.currentTime, 0.02);
        }, 600);
      } catch {}
    },
    stop() {
      if (interval) clearInterval(interval);
      if (osc) try { osc.stop(); } catch {}
      if (ctx) try { ctx.close(); } catch {}
      osc = null; gain = null; ctx = null;
    },
  };
}

export default function FakeCallPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>('setup');
  const [timer, setTimer] = useState(0);
  const [delay, setDelay] = useState(5);
  const [muted, setMuted] = useState(false);
  const ringtoneRef = useRef(createRingtone());
  const { t } = useLanguage();

  const isInstant = (location.state as { instant?: boolean })?.instant;

  useEffect(() => {
    if (isInstant) {
      setTimeout(() => setPhase('ringing'), 1000);
    }
  }, [isInstant]);

  useEffect(() => {
    if (phase === 'ringing') {
      navigator.vibrate?.([500, 200, 500, 200, 500, 200, 500]);
      ringtoneRef.current.start();
    } else {
      ringtoneRef.current.stop();
    }
    return () => ringtoneRef.current.stop();
  }, [phase]);

  useEffect(() => {
    if (phase !== 'call') return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const startCall = () => {
    setTimeout(() => setPhase('ringing'), delay * 1000);
  };

  const endCall = () => {
    ringtoneRef.current.stop();
    navigate('/');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <AnimatePresence mode="wait">
        {phase === 'setup' && !isInstant && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full max-w-sm">
            <Phone size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">{t('fake_call_title')}</h1>
            <p className="text-muted-foreground text-sm mb-8">{t('fake_call_desc')}</p>
            <div className="glass-card p-4 mb-6">
              <p className="text-sm font-medium text-foreground mb-3">{t('call_delay')}</p>
              <div className="flex gap-2">
                {[3, 5, 10, 15].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDelay(d)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${delay === d ? 'gradient-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground'}`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>
            <button onClick={startCall} className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-transform mb-3">
              {t('schedule_call')}
            </button>
            <button onClick={() => navigate('/')} className="text-sm text-muted-foreground">{t('cancel')}</button>
          </motion.div>
        )}

        {(phase === 'setup' && isInstant) && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">{t('preparing_call')}</p>
          </motion.div>
        )}

        {phase === 'ringing' && (
          <motion.div key="ringing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full max-w-sm">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <motion.div animate={{ scale: [1, 1.8], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }} className="absolute inset-0 rounded-full gradient-primary" />
              <motion.div animate={{ scale: [1, 1.5], opacity: [0.2, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut', delay: 0.3 }} className="absolute inset-0 rounded-full gradient-primary" />
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="absolute inset-2 rounded-full gradient-primary flex items-center justify-center">
                <User size={44} className="text-primary-foreground" />
              </motion.div>
            </div>

            <h2 className="text-2xl font-display font-bold text-foreground mb-1">{t('caller_name')}</h2>
            <p className="text-sm text-muted-foreground mb-1">{t('mobile')}</p>
            <motion.p animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-xs text-primary font-medium mb-10">
              {t('incoming_call')}
            </motion.p>

            <div className="flex justify-center gap-12">
              <div className="flex flex-col items-center gap-1">
                <button onClick={endCall} className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center active:scale-90 transition-transform shadow-lg">
                  <PhoneOff size={26} className="text-primary-foreground" />
                </button>
                <span className="text-[10px] text-muted-foreground">{t('decline')}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button onClick={() => setPhase('call')} className="w-16 h-16 rounded-full bg-safora-green flex items-center justify-center active:scale-90 transition-transform shadow-lg">
                  <Phone size={26} className="text-primary-foreground" />
                </button>
                <span className="text-[10px] text-muted-foreground">{t('accept')}</span>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'call' && (
          <motion.div key="call" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full max-w-sm">
            <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4">
              <User size={44} className="text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">{t('caller_name')}</h2>
            <p className="text-sm text-safora-green font-medium mb-16">{formatTime(timer)}</p>

            <div className="flex justify-center gap-8 mb-10">
              <button onClick={() => setMuted(!muted)} className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                {muted ? <MicOff size={20} className="text-destructive" /> : <Mic size={20} className="text-foreground" />}
              </button>
              <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Volume2 size={20} className="text-foreground" />
              </button>
            </div>

            <button onClick={endCall} className="w-16 h-16 rounded-full bg-destructive mx-auto flex items-center justify-center active:scale-90 transition-transform shadow-lg">
              <PhoneOff size={26} className="text-primary-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
