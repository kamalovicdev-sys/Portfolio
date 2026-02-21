import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Terminal, CheckCircle2 } from 'lucide-react';

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
        setFormData({ name: '', email: '', message: '' }); // Formani tozalash

        // 3 soniyadan keyin muvaffaqiyat xabarini yo'qotish
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-slate-900 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-100 mb-4 flex items-center justify-center gap-3 tracking-wide">
            <Mail className="text-blue-500" />
            Bog'lanish
          </h2>
          <p className="text-slate-400 tracking-wide">
            Yangi loyihalar, ma'lumotlar tahlili va backend arxitekturasi bo'yicha hamkorlikka tayyorman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Chap qism: Aloqa formasi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950 p-8 rounded-xl border border-slate-800 shadow-lg relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Ism</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm tracking-wide"
                  placeholder="Ismingizni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm tracking-wide"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Xabar</label>
                <textarea
                  rows="4"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm resize-none tracking-wide"
                  placeholder="Xabaringizni yozing..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 tracking-wide"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">Yuborilmoqda...</span>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={18} />
                    Yuborildi!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Xabarni yuborish
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* O'ng qism: Ijtimoiy tarmoqlar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center space-y-8 pl-0 md:pl-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2 tracking-wide">
                <Terminal size={20} className="text-green-400" />
                Tarmoqlar
              </h3>
              <div className="flex flex-col space-y-4">
                <a href="https://github.com/kamalovicdev=sys" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors p-3 hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700">
                  <Github size={24} className="text-slate-300" />
                  <span className="font-mono text-sm tracking-wide">github.com/kamalovicdev-sys</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors p-3 hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700">
                  <Linkedin size={24} className="text-blue-400" />
                  <span className="font-mono text-sm tracking-wide">linkedin.com/in/kamalovic</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors p-3 hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700">
                  <Send size={24} className="text-blue-500" />
                  <span className="font-mono text-sm tracking-wide">kama1ovic</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;