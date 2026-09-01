import React from 'react';
import { motion } from 'framer-motion';
// Agar siz 'lucide-react' ishlatayotgan bo'lsangiz, importlar shunday bo'ladi:
import { Smartphone, Server, Database, FolderGit2, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Medicy",
    description: "Shifokor qabullariga yozilish va to'lovlarni amalga oshirishga mo'ljallangan mobil ilova va uning ishonchli backend qismi (medicy-backend).",
    tech: ["Flask", "React Native", "PostgreSQL", "Payment API"],
    icon: <Smartphone className="text-blue-400" size={24} />
  },
  {
    title: "Dorixonalar tarmog'i",
    description: "Dorixonalar tarmog'ida ma'lumotlar tahlili va zaxiralarni optimallashtirish: ABC/XYZ va Market Basket Analysis metodologiyasi, Safety Stock, Inventory Turnover zahiralarni boshqarish hamda FEFO tizimi va Time Series",
    tech: ["Python", "SQL", "Power BI", "ML"],
    icon: <Server className="text-green-400" size={24} />
  },
  {
    title: "Real Estate",
    description: "Dynamic Pricing uchun (Linear regression) yordamida tahlilar. Marketing samaradorligi ROI tahlilari, Customer Segmentation va sotuvni Forecasting qilish",
    tech: ["Power BI", "Python", "SQL", "Math"],
    icon: <Database className="text-yellow-400" size={24} />
  },
  {
    title: "Myteam Mobile",
    description: "Jamoaviy ishlarni boshqarish va muvofiqlashtirish uchun mo'ljallangan zamonaviy mobil ilova.",
    tech: ["React Native", "Mobile UI", "API Integration"],
    icon: <Smartphone className="text-purple-400" size={24} />
  }
];

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

const Projects = () => {
  return (
    <section id={'projects'} className="py-20 px-6 bg-slate-900 border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Sarlavha animatsiyasi: Chapdan o'ngga kirib keladi */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-3"
        >
          <FolderGit2 className="text-green-500" />
          Amaliy Loyihalar
        </motion.h2>

        {/* Asosiy Grid Konteyner */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              // Hover (sichqoncha borganda) va Tap (bosganda) animatsiyalari
              whileHover={{
                y: -8,
                borderColor: "rgba(74, 222, 128, 0.4)", // Yashil border
                boxShadow: "0 10px 30px -10px rgba(74, 222, 128, 0.15)" // Yengil yashil soya
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-950 p-6 rounded-xl border border-slate-800 transition-colors group cursor-pointer flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                {/* Ikonka orqa foni mikro-animatsiyasi */}
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  className="p-3 bg-slate-900 rounded-lg"
                >
                  {project.icon}
                </motion.div>

                {/* Havola (Link) ikonkasi mikro-animatsiyasi */}
                <motion.div whileHover={{ scale: 1.2, rotate: 15 }} whileTap={{ scale: 0.9 }}>
                  <ExternalLink size={20} className="text-slate-500 group-hover:text-green-400 transition-colors" />
                </motion.div>
              </div>

              <h3 className="text-xl font-semibold text-slate-200 mb-3 group-hover:text-green-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs font-mono text-green-400 bg-green-400/10 rounded-full border border-green-400/20 hover:bg-green-400/20 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
