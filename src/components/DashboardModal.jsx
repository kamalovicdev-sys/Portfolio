import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, LayoutDashboard } from 'lucide-react';
import { useLanguage, useTheme } from '../context/contexts';

// Metabase public havolasini sayt mavzusiga mos (kunduzgi / tungi) ochish
const toEmbedUrl = (url, isDark) => `${url}#bordered=false${isDark ? '&theme=night' : ''}`;

const DashboardModal = ({ project, onClose }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Esc tugmasi bilan yopish va orqa fon scrollini to'xtatish
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-title"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl h-[85vh] bg-surface-card dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <h3 id="dashboard-title" className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 min-w-0">
                <LayoutDashboard className="text-green-600 dark:text-green-400 shrink-0" size={20} />
                <span className="truncate">{project.title}</span>
              </h3>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={project.dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-green-800 dark:hover:text-green-400 border border-slate-300 dark:border-slate-700 hover:border-green-400/40 rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">{t.projects.openInNewTab}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.projects.close}
                  className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-surface-muted dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <iframe
              src={toEmbedUrl(project.dashboardUrl, isDark)}
              title={`${project.title} — Metabase dashboard`}
              className="flex-grow w-full bg-surface dark:bg-slate-950"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardModal;
