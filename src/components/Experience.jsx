import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experienceData = [
  {
    role: "Software Engineer",
    company: "Mehrzod LLC",
    date: "2025 - Hozirgacha",
    details: [
      "Medicy: Shifoxonalar uchun onlayn booking (qabul) va to'lov tizimi.",
      "Myteam: Xodimlar boshqaruvi va jamoaviy ishlarni muvofiqlashtirish ilovasi."
    ],
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  },
  {
    role: "Backend Developer",
    company: "Solar Nature",
    date: "2024",
    details: [
      "Savdo bo'limini 0 dan qurish jarayonida ishtirok etish va maxsus CRM tizimini ishlab chiqish.",
      "WMS (Ombor boshqaruvi) tizimini raqamlashtirish va jarayonlarni avtomatlashtirish."
    ],
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20"
  },
  {
    role: "Data Analyst",
    company: "Freelance",
    date: "2023 - Hozirgacha",
    details: [
      "FMCG: WMS ma'lumotlar bazasida tovar aylanmasi tahlili.",
      "Real Estate: Sotuv ko'rsatkichlari va tizim ma'lumotlarini chuqur tahlil qilish.",
      "Dorixonalar tarmog'i: Sotuv va WMS ichki jarayonlari tahlili, hisobotlarni avtomatlashtirish."
    ],
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20"
  }
];

const educationData = [
  {
    degree: "Express Backend",
    institution: "42.uz",
    date: "2024"
  },
  {
    degree: "Data Analysis Bootcamp",
    institution: "Coursera",
    date: "2024"
  },
  {
    degree: "Backend Developer",
    institution: "PDP Academy",
    date: "2023"
  },
  {
    degree: "Full Stack Python Developer",
    institution: "Mohirdev",
    date: "2022"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-20 px-4 md:px-6 bg-slate-950 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Chap ustun: Ish tajribasi */}
          <div>
            {/* SEO: H2 ishlatildi */}
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8 md:mb-10 flex items-center gap-3 tracking-wide">
              <Briefcase className="text-blue-500" size={28} />
              Ish Tajribasi
            </h2>

            <div className="space-y-6 md:space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
              {experienceData.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start w-full"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 ${item.bgColor} ${item.color} absolute left-0 shrink-0 z-10 mt-1`}>
                    <Briefcase size={16} />
                  </div>

                  {/* Kartochka o'lchamlari mobil uchun moslashtirildi */}
                  <div className="w-[calc(100%-3rem)] md:w-[calc(100%-3.5rem)] ml-12 md:ml-14 bg-slate-900 p-5 md:p-7 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors shadow-lg">
                    <div className="flex flex-col mb-3 md:mb-4">
                      <span className={`font-mono text-xs md:text-sm tracking-wider ${item.color} mb-1.5 flex items-center gap-2`}>
                        <Calendar size={13} />
                        {item.date}
                      </span>
                      {/* SEO: H3 ishlatildi va matn kichraytirildi */}
                      <h3 className="text-lg md:text-xl font-bold text-slate-200 tracking-wide mb-1">{item.role}</h3>
                      <span className="text-slate-400 text-sm md:text-base font-medium tracking-wide">{item.company}</span>
                    </div>
                    <ul className="space-y-2.5 text-slate-300 text-sm md:text-[15px] leading-relaxed tracking-wide list-disc list-inside marker:text-slate-600">
                      {item.details.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* O'ng ustun: Ta'lim */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8 md:mb-10 flex items-center gap-3 tracking-wide">
              <GraduationCap className="text-green-500" size={28} />
              Ta'lim
            </h2>
            <div className="space-y-4 md:space-y-6">
              {educationData.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-900 p-5 md:p-7 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors flex items-start gap-4 shadow-lg w-full"
                >
                  <div className="p-2.5 md:p-3 bg-slate-950 rounded-lg shrink-0 border border-slate-800 mt-0.5">
                    <GraduationCap size={20} className="text-green-400 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-slate-200 tracking-wide mb-1">{item.degree}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1.5">
                      <span className="text-slate-400 text-sm md:text-base font-medium tracking-wide">{item.institution}</span>
                      <span className="hidden sm:inline text-slate-600">•</span>
                      <span className="font-mono text-xs md:text-sm text-slate-500 flex items-center gap-1.5 tracking-wider">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
