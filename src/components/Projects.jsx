import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
// Agar siz 'lucide-react' ishlatayotgan bo'lsangiz, importlar shunday bo'ladi:
import { Building2, FolderGit2, ExternalLink, Users, Stethoscope, Truck, Pill, Sun, LayoutDashboard } from 'lucide-react';
import DashboardModal from './DashboardModal';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/contexts';

// url — ishlayotgan ilova, dashboardUrl — Metabase public dashboard (sayt ichida ochiladi).
// Tavsiflar tarjimada: t.projects.items[id]
const projects = [
  {
    id: "myteam",
    title: "MyTeam",
    tech: ["Django REST", "React", "Ant Design", "Yandex Maps"],
    category: "dev",
    url: "https://hr.my-team.uz/",
    icon: <Users className="text-purple-600 dark:text-purple-400" size={24} />
  },
  {
    id: "myteamPlus",
    title: "MyTeam Plus",
    tech: ["Django REST", "React", "Ant Design", "Payme"],
    category: "dev",
    url: "https://app.my-team.uz/",
    icon: <Stethoscope className="text-pink-600 dark:text-pink-400" size={24} />
  },
  {
    id: "smartDistribution",
    title: "Smart Distribution",
    tech: ["React", "TypeScript", "Telegram Mini App", "TanStack Query"],
    category: "dev",
    url: "https://app.mydistribution.uz/",
    icon: <Truck className="text-orange-600 dark:text-orange-400" size={24} />
  },
  {
    id: "realEstate",
    title: "Real Estate",
    tech: ["Metabase", "Python ETL", "SQL", "Forecasting"],
    category: "analytics",
    dashboardUrl: "https://analytics.kamalovic.uz/public/dashboard/0accd4ba-2a8d-4223-998d-87bf69d352ef",
    icon: <Building2 className="text-yellow-600 dark:text-yellow-400" size={24} />
  },
  {
    id: "pharm",
    title: "Pharm Analytics",
    tech: ["Metabase", "SQL", "Sales Analytics", "Inventory"],
    category: "analytics",
    dashboardUrl: "https://analytics.kamalovic.uz/public/dashboard/0aca9e3a-1e86-4aea-aa85-f156f36dd393",
    icon: <Pill className="text-green-600 dark:text-green-400" size={24} />
  },
  {
    id: "solar",
    title: "Solar Analytics",
    tech: ["Metabase", "SQL", "NASA POWER", "PVGIS"],
    category: "analytics",
    dashboardUrl: "https://analytics.kamalovic.uz/public/dashboard/75b46627-b70e-4188-9af6-016ebc30701f",
    icon: <Sun className="text-yellow-600 dark:text-yellow-400" size={24} />
  }
];

const categories = ["all", "dev", "analytics"];

// 1. Konteyner uchun variantlar (Stagger effekti uchun)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Har bir karta 0.2 soniya farq bilan chiqadi
    },
  },
};

// 2. Har bir karta uchun variantlar
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Karta ichidagi tugmalar (Dashboard / Ilova) uchun umumiy klasslar
const actionClass = "mb-5 self-start translate-z-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-800 dark:text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg hover:bg-green-400/20 transition-colors";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDashboard, setActiveDashboard] = useState(null);
  const { t } = useLanguage();

  const closeDashboard = useCallback(() => setActiveDashboard(null), []);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id={'projects'} className="py-20 px-6 bg-surface-alt dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          {/* Sarlavha animatsiyasi: Chapdan o'ngga kirib keladi */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3"
          >
            <FolderGit2 className="text-green-500" />
            {t.projects.title}
          </motion.h2>

          {/* Kategoriya bo'yicha filter */}
          <div role="tablist" className="flex gap-1 p-1 bg-surface-card dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg w-fit">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-mono rounded-md transition-colors ${
                  activeCategory === category
                    ? 'bg-green-400/10 text-green-800 dark:text-green-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {t.projects.categories[category]}
              </button>
            ))}
          </div>
        </div>

        {/* Asosiy Grid Konteyner (key o'zgarganda kartalar qayta animatsiya bilan chiqadi) */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              wrapperClassName="h-full"
              variants={cardVariants}
              // Hover (sichqoncha borganda) va Tap (bosganda) animatsiyalari, 3D og'ish — TiltCard ichida.
              // Border va soya Tailwind hover orqali — mavzu almashganda eski rang qotib qolmasligi uchun
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="bg-surface-card dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-400/40 hover:shadow-[0_25px_40px_-15px_rgba(74,222,128,0.25)] transition-[border-color,box-shadow,background-color] duration-300 group cursor-pointer flex flex-col h-full"
            >
              {/* translate-z — 3D chuqurlik: ikonka va sarlavha kartochkadan oldinga chiqib turadi */}
              <div className="flex justify-between items-start mb-4 translate-z-10">
                {/* Ikonka orqa foni mikro-animatsiyasi */}
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  className="p-3 bg-surface-muted dark:bg-slate-900 rounded-lg"
                >
                  {project.icon}
                </motion.div>

                {/* Havola (Link) ikonkasi mikro-animatsiyasi: loyihani yangi oynada ochadi */}
                <motion.a
                  href={project.url ?? project.dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} — ${t.projects.openInNewTab}`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors" />
                </motion.a>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 translate-z-6 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                {t.projects.items[project.id]}
              </p>

              {/* Metabase dashboard bo'lsa, uni portfolio ichida ko'rish tugmasi */}
              {project.dashboardUrl && (
                <button
                  type="button"
                  onClick={() => setActiveDashboard(project)}
                  className={actionClass}
                >
                  <LayoutDashboard size={16} />
                  {t.projects.viewDashboard}
                </button>
              )}

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClass}
                >
                  <ExternalLink size={16} />
                  {t.projects.openApp}
                </a>
              )}

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs font-mono text-green-800 dark:text-green-400 bg-green-400/10 rounded-full border border-green-400/20 hover:bg-green-400/20 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          ))}
        </motion.div>

      </div>

      <DashboardModal project={activeDashboard} onClose={closeDashboard} />
    </section>
  );
};

export default Projects;
