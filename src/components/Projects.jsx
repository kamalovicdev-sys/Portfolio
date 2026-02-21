import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Smartphone, Server } from 'lucide-react';

const projects = [
  {
    title: "Medicy",
    description: "Shifokor qabullariga yozilish va to'lovlarni amalga oshirishga mo'ljallangan mobil ilova va uning ishonchli backend qismi (medicy-backend).",
    tech: ["Flask", "React Native", "PostgreSQL", "Payment API"],
    icon: <Smartphone className="text-blue-400" size={24} />
  },
  {
    title: "Bunjang Clone",
    description: "Mashhur elektron tijorat platformasining klon versiyasi. Mahsulotlar katalogi va foydalanuvchilar o'rtasidagi tranzaksiyalar uchun ishonchli API.",
    tech: ["Django", "Python", "REST API", "SQL"],
    icon: <Server className="text-green-400" size={24} />
  },
  {
    title: "Promo Bot",
    description: "Telegram foydalanuvchilari uchun maxsus promo-kodlar tarqatuvchi va ma'lumotlarni yig'uvchi avtomatlashtirilgan bot tizimi.",
    tech: ["Flask", "Python", "Telegram API", "Data Processing"],
    icon: <Server className="text-yellow-400" size={24} />
  },
  {
    title: "Myteam Mobile",
    description: "Jamoaviy ishlarni boshqarish va muvofiqlashtirish uchun mo'ljallangan zamonaviy mobil ilova.",
    tech: ["React Native", "Mobile UI", "API Integration"],
    icon: <Smartphone className="text-purple-400" size={24} />
  }
];

const Projects = () => {
  return (
    <section id={'projects'} className="py-20 px-6 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-3">
          <FolderGit2 className="text-green-500" />
          Amaliy Loyihalar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-900 rounded-lg">
                  {project.icon}
                </div>
                <ExternalLink size={20} className="text-slate-500 group-hover:text-green-400 cursor-pointer transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-3">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono text-green-400 bg-green-400/10 rounded-full border border-green-400/20">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;