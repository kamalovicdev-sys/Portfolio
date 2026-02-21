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
    <section className="py-20 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto"> {/* Konteyner ham biroz kengaytirildi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Chap ustun: Ish tajribasi */}
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-3 tracking-wide">
              <Briefcase className="text-blue-500" size={32} />
              Ish Tajribasi
            </h2>

            {/* Chapga moslangan taymlayn */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
              {experienceData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start"
                >
                  {/* Ikonka */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 ${item.bgColor} ${item.color} absolute left-0 shrink-0 z-10 mt-1.5`}>
                    <Briefcase size={16} />
                  </div>

                  {/* Kartochka (kengaytirilgan va matnlar ochiqroq qilingan) */}
                  <div className="w-[calc(100%-3.5rem)] ml-14 bg-slate-900 p-7 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors shadow-lg">
                    <div className="flex flex-col mb-4">
                      <span className={`font-mono text-sm tracking-wider ${item.color} mb-2 flex items-center gap-2`}>
                        <Calendar size={14} />
                        {item.date}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-200 tracking-wide mb-1">{item.role}</h3>
                      <span className="text-slate-400 font-medium tracking-wide">{item.company}</span>
                    </div>
                    {/* Matnlar qatori (leading-loose) va harflar orasi (tracking-wide) ochildi */}
                    <ul className="space-y-3 text-slate-300 text-[15px] leading-loose tracking-wide list-disc list-inside marker:text-slate-600">
                      {item.details.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* O'ng ustun: Ta'lim */}
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-3 tracking-wide">
              <GraduationCap className="text-green-500" size={32} />
              Ta'lim
            </h2>
            <div className="space-y-6">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-900 p-7 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors flex items-start gap-5 shadow-lg"
                >
                  <div className="p-3 bg-slate-950 rounded-lg shrink-0 border border-slate-800 mt-1">
                    <GraduationCap size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-200 tracking-wide mb-1">{item.degree}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
                      <span className="text-slate-400 font-medium tracking-wide">{item.institution}</span>
                      <span className="hidden sm:inline text-slate-600">•</span>
                      <span className="font-mono text-sm text-slate-500 flex items-center gap-2 tracking-wider">
                        <Calendar size={13} />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;