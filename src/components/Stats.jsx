import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Code2, BarChart3 } from 'lucide-react';
import 'katex/dist/katex.min.css'; // Formulalar chiroyli chiqishi uchun CSS
import { InlineMath } from 'react-katex'; // Formulani o'qiydigan komponent

const leetcodeData = [
  { name: 'Easy', value: 145, color: '#22c55e' },
  { name: 'Medium', value: 85, color: '#eab308' },
  { name: 'Hard', value: 20, color: '#ef4444' },
];

const Stats = () => {
  return (
    <section id={'stats'} className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LeetCode statistikasi */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-8 rounded-xl border border-slate-800"
        >
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <Code2 className="text-yellow-500" />
            Algoritmik qobiliyat (LeetCode)
          </h2>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leetcodeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leetcodeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-slate-200">250+</span>
              <span className="text-xs text-slate-500">Masalalar</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm font-mono">
            {leetcodeData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Analysis ko'nikmalari */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-8 rounded-xl border border-slate-800"
        >
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <BarChart3 className="text-blue-500" />
            Data Analysis
          </h2>
          {/* Formulalar shu yerda InlineMath orqali chiroyli ko'rsatiladi */}
          <p className="text-slate-400 mb-6 leading-relaxed">
            Katta hajmdagi ma'lumotlar ustida amallar bajarish va ular asosida bashoratli modellarni qurish. Tahlillarda chiziqli regressiya <span className="font-serif italic text-slate-200 tracking-wider">y = &beta;<sub>0</sub> + &beta;<sub>1</sub>x + &epsilon;</span> va o'rtacha kvadratik og'ish <span className="font-serif italic text-slate-200 tracking-wider">&sigma; = &radic;(&Sigma;(x<sub>i</sub> - &mu;)<sup>2</sup> / N)</span> kabi matematik modellarni keng qo'llayman.
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Python (Pandas, NumPy)</span>
                <span className="text-green-400">90%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">SQL / PostgreSQL</span>
                <span className="text-blue-400">85%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Stats;
