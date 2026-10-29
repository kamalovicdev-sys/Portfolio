import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Code2, BarChart3 } from 'lucide-react';
import { useLanguage, useTheme } from '../context/contexts';
import TiltCard from './TiltCard';

const leetcodeData = [
  { name: 'Easy', value: 145, color: '#22c55e' },
  { name: 'Medium', value: 85, color: '#eab308' },
  { name: 'Hard', value: 20, color: '#ef4444' },
];

// Grafik tooltipi uchun ranglar (kunduzgi / tungi mavzu)
const tooltipColors = {
  light: { backgroundColor: '#f1f4f7', borderColor: '#e2e8f0', color: '#0f172a' },
  dark: { backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' },
};

const Stats = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const tooltipStyle = isDark ? tooltipColors.dark : tooltipColors.light;

  return (
    <section id={'stats'} className="py-20 px-6 bg-surface dark:bg-slate-950">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LeetCode statistikasi (3D kartochka: grafik va sarlavha oldinga chiqib turadi) */}
        <TiltCard
          maxTilt={7}
          wrapperClassName="h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-card dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 h-full hover:border-green-400/40 hover:shadow-[0_25px_40px_-15px_rgba(74,222,128,0.25)] transition-[border-color,box-shadow] duration-300"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 translate-z-8">
            <Code2 className="text-yellow-500" />
            {t.stats.leetcodeTitle}
          </h2>
          <div className="h-64 relative translate-z-12">
            {/* initialDimension — prerender (server) paytida o'lchab bo'lmaydi, shu o'lchamda chiziladi */}
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 256 }}>
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
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: tooltipStyle.color }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">250+</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">{t.stats.problems}</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm font-mono translate-z-6">
            {leetcodeData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* Data Analysis ko'nikmalari (3D kartochka) */}
        <TiltCard
          maxTilt={7}
          wrapperClassName="h-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-card dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 h-full hover:border-green-400/40 hover:shadow-[0_25px_40px_-15px_rgba(74,222,128,0.25)] transition-[border-color,box-shadow] duration-300"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 translate-z-8">
            <BarChart3 className="text-blue-500" />
            {t.stats.analysisTitle}
          </h2>
          {/* Formulalar oddiy HTML (sub/sup) bilan ko'rsatiladi — og'ir KaTeX kutubxonasisiz */}
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed translate-z-4">
            {t.stats.analysisIntro}<span className="font-serif italic text-slate-800 dark:text-slate-200 tracking-wider">y = &beta;<sub>0</sub> + &beta;<sub>1</sub>x + &epsilon;</span>{t.stats.analysisMiddle}<span className="font-serif italic text-slate-800 dark:text-slate-200 tracking-wider">&sigma; = &radic;(&Sigma;(x<sub>i</sub> - &mu;)<sup>2</sup> / N)</span>{t.stats.analysisOutro}
          </p>
          <div className="space-y-4 translate-z-10">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700 dark:text-slate-300">Python (Pandas, NumPy)</span>
                <span className="text-green-800 dark:text-green-400">95%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700 dark:text-slate-300">SQL / PostgreSQL</span>
                <span className="text-blue-700 dark:text-blue-400">85%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </TiltCard>

      </div>
    </section>
  );
};

export default Stats;
