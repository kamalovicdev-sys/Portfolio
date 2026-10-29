import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/contexts';

// Ish joylari matni (lavozim, kompaniya, davr, tafsilotlar) tarjimada: t.experience.items[id].
// Ta'lim ro'yxati ham tarjimada: t.experience.educationItems
const experienceData = [
  {
    id: "mehrzod",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]"
  },
  {
    id: "freelance",
    color: "text-yellow-800 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.2)]"
  },
  {
    id: "solar",
    color: "text-green-800 dark:text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.2)]"
  }
];

// Animatsiya sozlamalari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemLeftVariants = {
  hidden: { opacity: 0, x: -30, y: 10 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const itemRightVariants = {
  hidden: { opacity: 0, x: 30, y: 10 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-16 md:py-24 px-4 md:px-6 bg-surface dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 overflow-hidden relative">

      {/* Orqa fon uchun yengil nur (Glow) effekti */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Chap ustun: Ish tajribasi */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 md:mb-10 flex items-center gap-3 tracking-wide">
              <Briefcase className="text-blue-500" size={28} />
              {t.experience.title}
            </h2>

            {/* Timeline konteyneri */}
            <div className="space-y-8 md:space-y-10 relative before:absolute before:inset-0 before:left-[15px] md:before:left-[19px] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-500/40 before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
              {experienceData.map((item) => {
                const job = t.experience.items[item.id];
                return (
                  <motion.article
                    key={item.id}
                    variants={itemLeftVariants}
                    whileHover={{ y: -5 }}
                    className="relative flex items-start w-full group cursor-default"
                  >
                    {/* Timeline Nuqtasi */}
                    <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-surface dark:border-slate-950 ${item.bgColor} ${item.color} absolute left-0 shrink-0 z-10 transition-transform duration-300 group-hover:scale-110`}>
                      <Briefcase size={14} className="md:w-4 md:h-4" />
                    </div>

                    {/* Kartochka */}
                    <div className={`w-[calc(100%-2.5rem)] md:w-[calc(100%-3.5rem)] ml-10 md:ml-14 bg-surface-card dark:bg-slate-900 p-5 md:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 ${item.hoverShadow} hover:border-slate-300 dark:hover:border-slate-700`}>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 tracking-wide mb-1">{job.role}</h3>
                          <span className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium">{job.company}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${item.bgColor} ${item.color} ${item.borderColor} border font-mono text-xs md:text-sm whitespace-nowrap w-fit`}>
                          <Calendar size={12} />
                          {job.period}
                        </span>
                      </div>

                      <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-[15px] leading-relaxed">
                        {job.details.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight size={16} className={`shrink-0 mt-0.5 ${item.color}`} />
                            <span className="opacity-90">{desc}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          {/* O'ng ustun: Ta'lim */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 md:mb-10 flex items-center gap-3 tracking-wide">
              <GraduationCap className="text-green-500" size={28} />
              {t.experience.education}
            </h2>

            <div className="space-y-4 md:space-y-5">
              {t.experience.educationItems.map((item, index) => (
                <motion.article
                  key={index}
                  variants={itemRightVariants}
                  whileHover={{ x: 5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-surface-card/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-green-500/30 hover:bg-surface-card dark:hover:bg-slate-900 transition-all flex items-center gap-4 md:gap-5 shadow-lg group cursor-pointer"
                >
                  <div className="p-3 md:p-4 bg-surface dark:bg-slate-950 rounded-xl shrink-0 border border-slate-200 dark:border-slate-800 group-hover:border-green-500/30 transition-colors">
                    <GraduationCap className="text-green-600 dark:text-green-400 w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 tracking-wide mb-1 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors">
                      {item.degree}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">{item.institution}</span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                      <span className="font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
