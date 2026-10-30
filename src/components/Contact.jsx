import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, BookOpen, Terminal, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../context/contexts';
import TiltCard from './TiltCard';

// Ijtimoiy tarmoqlar uchun ma'lumotlar massivi (Kod toza bo'lishi uchun)
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/kamalovicdev-sys",
    icon: <Github size={22} className="text-slate-700 dark:text-slate-300" />,
    handle: "github.com/kamalovicdev-sys",
    hoverClass: "hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-[0_0_15px_-3px_rgba(148,163,184,0.2)]"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kamalovic",
    icon: <Linkedin size={22} className="text-blue-600 dark:text-blue-400" />,
    handle: "linkedin.com/in/kamalovic",
    hoverClass: "hover:border-blue-500/50 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"
  },
  {
    name: "Blog",
    url: "https://blog.kamalovic.uz/",
    icon: <BookOpen size={22} className="text-orange-500 dark:text-orange-400" />,
    handle: "blog.kamalovic.uz",
    hoverClass: "hover:border-orange-500/50 hover:shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]"
  },
  {
    name: "Telegram",
    url: "https://t.me/kama1ovic",
    icon: <Send size={22} className="text-blue-500" />,
    handle: "@kama1ovic",
    hoverClass: "hover:border-blue-500/50 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"
  }
];

// Forma maydonlari uchun umumiy klasslar
const inputClass = "w-full bg-surface dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)] transition-all font-mono text-sm tracking-wide";

// Animatsiya sozlamalari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'submitting', 'success', 'error'
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '1ee8a368-3559-4c1c-9560-6da14c0a3de8',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-surface-alt dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">

      {/* Orqa fon uchun yengil nur (Glow) effekti */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">

        {/* Sarlavha qismi animatsiyasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-center gap-3 tracking-wide">
            <Mail className="text-blue-500" />
            {t.contact.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 tracking-wide max-w-lg mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Chap qism: Aloqa formasi (3D: yozishga xalaqit bermasligi uchun juda yengil og'adi) */}
          <TiltCard
            maxTilt={3}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface-card dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 ml-1">{t.contact.name}</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 ml-1">{t.contact.email}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 ml-1">{t.contact.message}</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide ${
                  status === 'error'
                    ? 'bg-red-500/10 text-red-500 border border-red-500/50'
                    : status === 'success'
                    ? 'bg-green-500/10 text-green-500 border border-green-500/50'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] disabled:bg-blue-600/50 disabled:shadow-none'
                }`}
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse flex items-center gap-2">
                    {t.contact.sending}
                  </span>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={18} />
                    {t.contact.success}
                  </>
                ) : status === 'error' ? (
                  <>
                    <XCircle size={18} />
                    {t.contact.error}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t.contact.submit}
                  </>
                )}
              </motion.button>
            </form>
          </TiltCard>

          {/* O'ng qism: Ijtimoiy tarmoqlar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8 pl-0 md:pl-8 mt-8 md:mt-0"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2 tracking-wide">
                <Terminal size={20} className="text-green-600 dark:text-green-400" />
                {t.contact.networks}
              </h3>

              <div className="flex flex-col space-y-4">
                {socialLinks.map((social, index) => (
                  <TiltCard key={index} variants={itemVariants} maxTilt={14} className="rounded-xl">
                    <motion.a
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-[color,background-color,border-color,box-shadow] duration-300 transform-3d p-3.5 bg-surface-card/60 dark:bg-slate-950/50 hover:bg-surface-card dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 ${social.hoverClass} group`}
                    >
                      <div className="p-2 bg-surface-muted dark:bg-slate-900 rounded-lg translate-z-8 group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                      <span className="font-mono text-sm tracking-wide translate-z-4">{social.handle}</span>
                    </motion.a>
                  </TiltCard>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
