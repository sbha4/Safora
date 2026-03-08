import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function QuickEscapeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on certain pages
  if (['/sos', '/fake-call', '/'].includes(location.pathname)) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
      onClick={() => navigate('/fake-call', { state: { instant: true } })}
      className="fixed right-4 bottom-24 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg sos-glow active:scale-90 transition-transform"
      aria-label="Quick Escape"
    >
      <Phone size={22} className="text-primary-foreground" />
    </motion.button>
  );
}
