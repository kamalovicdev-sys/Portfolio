import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Terminal, CheckCircle2, XCircle } from 'lucide-react';

// Ijtimoiy tarmoqlar uchun ma'lumotlar massivi (Kod toza bo'lishi uchun)
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/kamalovicdev-sys",
    icon: <Github size={22} className="text-slate-300" />,
    handle: "github.com/kamalovicdev-sys",
    hoverClass: "hover:border-slate-500 hover:shadow-[0_0_15px_-3px_rgba(148,163,184,0.2)]"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kamalovic",
    icon: <Linkedin size={22} className="text-blue-400" />,
    handle: "linkedin.com/in/kamalovic",
    hoverClass: "hover:border-blue-500/50 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"
  },
  {
    name: "Telegram",
    url: "https://t.me/kama1ovic",
    icon: <Send size={22} className="text-blue-500" />,
    handle: "@kama1ovic",
    hoverClass: "hover:border-blue-500/50 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"
  }
];

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
    <section id="contact" className="py-20 px-6 bg-slate-900 border-t border-slate-800 relative overflow-hidden">

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
          <h2 className="text-3xl font-bold text-slate-100 mb-4 flex items-center justify-center gap-3 tracking-wide">
            <Mail className="text-blue-500" />
            Contact
          </h2>
          <p className="text-slate-400 tracking-wide max-w-lg mx-auto">
            Yangi loyihalar, ma'lumotlar tahlili va backend arxitekturasi bo'yicha hamkorlikka tayyorman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Chap qism: Aloqa formasi */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Ism</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)] transition-all font-mono text-sm tracking-wide"
                  placeholder="Ismingizni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)] transition-all font-mono text-sm tracking-wide"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Xabar</label>
                <textarea
                  rows="4"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)] transition-all font-mono text-sm resize-none tracking-wide"
                  placeholder="Xabaringizni yozing..."
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
                    Yuborilmoqda...
                  </span>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={18} />
                    Muvaffaqiyatli yuborildi!
                  </>
                ) : status === 'error' ? (
                  <>
                    <XCircle size={18} />
                    Xatolik yuz berdi. Qayta urinib ko'ring.
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Xabarni yuborish
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* O'ng qism: Ijtimoiy tarmoqlar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8 pl-0 md:pl-8 mt-8 md:mt-0"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2 tracking-wide">
                <Terminal size={20} className="text-green-400" />
                Tarmoqlar
              </h3>

              <div className="flex flex-col space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-4 text-slate-400 hover:text-white transition-all duration-300 p-3.5 bg-slate-950/50 hover:bg-slate-900 rounded-xl border border-slate-800 ${social.hoverClass} group`}
                  >
                    <div className="p-2 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    <span className="font-mono text-sm tracking-wide">{social.handle}</span>
                  </motion.a>
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
