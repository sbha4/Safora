import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Phone, Trash2, UserPlus } from 'lucide-react';
import { getContacts, saveContact, deleteContact, type Contact } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(getContacts());
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { t } = useLanguage();

  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) return;
    saveContact({ name: name.trim(), phone: phone.trim() });
    setContacts(getContacts());
    setName('');
    setPhone('');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteContact(id);
    setContacts(getContacts());
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">{t('emergency_contacts')}</h1>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full glass-card p-4 flex items-center justify-center gap-2 mb-4 active:scale-[0.98] transition-transform"
      >
        <UserPlus size={18} className="text-primary" />
        <span className="text-sm font-semibold text-primary">{t('add_contact')}</span>
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="glass-card p-4 mb-4 overflow-hidden"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('contact_name')}
              className="w-full bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('phone_number')}
              type="tel"
              className="w-full bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button onClick={handleAdd} className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform">
              {t('save_contact')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {contacts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            <UserPlus size={40} className="mx-auto mb-3 opacity-50" />
            <p>{t('no_contacts')}</p>
            <p className="text-xs mt-1">{t('no_contacts_desc')}</p>
          </div>
        )}
        {contacts.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {c.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.phone}</p>
            </div>
            <a href={`tel:${c.phone}`} className="p-2 rounded-xl bg-safora-green/20 text-safora-green">
              <Phone size={16} />
            </a>
            <button onClick={() => handleDelete(c.id)} className="p-2 rounded-xl bg-destructive/20 text-destructive">
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
